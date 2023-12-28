/**
 *
 * @param originSearchInfo  readOnly 기존 searchParams Iterable<readonly any[]>
 * @param newSearchInfo 새롭게 추가할 searchParams {[key:string]:any}
 * @returns searchParams string; (ex: size=10&page=1&name=kim)
 */

export const generateSearchQueryString = (
  originSearchInfo: Iterable<readonly any[]>,
  newSearchInfo: { [key: string]: any } = {}
) => {
  const updatedSearchParamsObj = {
    ...Object.fromEntries(originSearchInfo),
    ...newSearchInfo,
  };
  const newSearchParams = new URLSearchParams(updatedSearchParamsObj);
  return newSearchParams.toString();
};

/**
 *
 * @param state 찾아야할 data가 있는 최상위 data
 * @param keys 찾는 data의 path
 * @returns
 */
export const getFindData = (state: any, ...keys: any): any => {
  if (!state || Object.keys(state)?.length === 0) {
    return undefined;
  }

  if (keys.length === 0) throw new Error("Wrong usage");
  const curKey = keys.shift(); // key for current level

  if (Array.isArray(state)) {
    // current state is an array
    const copy = state.slice();

    let foundElementIndex = curKey; // use it as an index if it's a number
    if (isNaN(curKey)) {
      // it's a function
      foundElementIndex = copy?.findIndex(curKey);
    }
    if (keys.length === 0) {
      // recursion finished
      return copy[foundElementIndex];
    } else {
      // recurse one level deeper
      return getFindData(state[foundElementIndex], ...keys);
    }
  } else {
    // current state is an object
    let obj: any = {};
    if (keys.length === 0) {
      // recursion finished
      obj = state;
      return obj[curKey];
    } else {
      // recurse one level deeper
      return getFindData(state[curKey], ...keys);
    }
  }
};

/**
 *
 * @param headers 헤더 컬럼 데이터
 * @param rows 테이블 row 데이터 모음
 * @returns 헤더 키값에 맞는 데이터로 sorting됨.
 */
export const sortRowsByHeaders = (
  headers: string[],
  rows: { [key: string]: any }[]
) => {
  return (
    rows &&
    rows.map((info: { [key: string]: any }) => {
      return headers.reduce((acc, columnName: string) => {
        return Object.assign(acc, {
          [columnName]: getFindData(info, ...columnName.split("-")),
        });
      }, {});
    })
  );
};

/**
 *
 * @param start 시작 숫자
 * @param stop 종료 숫자
 * @param step 숫자간의 간격
 * @returns
 */
export const range = (start: number, stop: number, step: number) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
