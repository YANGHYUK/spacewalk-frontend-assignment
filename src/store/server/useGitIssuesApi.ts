import { fetcher } from "api";
import { AxiosError } from "axios";
import { useModalStore } from "store/client";
import useSWR from "swr";
export type TgitIssues = {
  comments: number; //코멘트 수
  created_at: string; //작성일
  id: number; // id
  number: number; // 번호
  title: string; // 제목
  updated_at: string; // 수정일
  user: { login: string }; //작성자
};
const useGitIssuesApi = (
  params: any
): {
  data: TgitIssues[];
  loading?: boolean;
  error?: Error | undefined;
} => {
  const { openModal } = useModalStore();
  const {
    data,
    // error
  } = useSWR(
    {
      url: `https://api.github.com/repos/facebook/react/issues`,
      method: "get",
      params,
    },
    fetcher,
    {
      onError: (e: AxiosError & { response: any }) => {
        openModal(e.response?.data?.message || e.message);
      },
      suspense: true,
    }
  );

  return {
    data,
    // loading: !error && !data,
    // error,
  };
};

export default useGitIssuesApi;
