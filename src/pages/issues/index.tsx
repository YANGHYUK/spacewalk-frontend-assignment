import styled from "@emotion/styled";
import { colors } from "../../style/theme";

import Table from "../../components/tables/Table/Table.component";
import Thead from "../../components/tables/Thead/Thead.component";
import Tr from "../../components/tables/Tr/Tr.component";
import Tbody from "../../components/tables/Tbody/Tbody.component";
import Td from "../../components/tables/Td/Td.component";
import Th from "../../components/tables/Th/Th.component";
import Pagination from "../../components/Pagination/Pagination.component";
import { CSSProperties, Suspense, useMemo } from "react";
import IssueStatus from "components/IssueStatus/IssueStatus.component";
import DateStatus from "components/DateStatus/DateStatus.component";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  generateSearchQueryString,
  sortRowsByHeaders,
} from "utils/commonFunction";
import { useGitIssuesApi } from "store/server";
const tableHead: {
  value: string;
  key: string;
  style: CSSProperties;
}[] = [
  { value: "번호", key: "number", style: { textAlign: "left" } },
  { value: "제목", key: "title", style: { textAlign: "left" } },
  { value: "작성자", key: "user-login", style: { textAlign: "left" } },
  { value: "작성일", key: "created_at", style: { textAlign: "center" } },
  { value: "수정일", key: "updated_at", style: { textAlign: "center" } },
  { value: "코멘트 수", key: "comments", style: { textAlign: "right" } },
];

const GitIssueTable = () => {
  //state => open, closed, all
  //sort =>  created, updated, comments
  //per_page => The number of results per page (max 100).
  // page => Page number of the results to fetch.
  const per_page = 10;
  const [searchParams] = useSearchParams();

  const { data } = useGitIssuesApi({
    ...Object.fromEntries(searchParams),
    per_page,
  });

  const headerSortArr = useMemo(
    () => tableHead.map((header) => header.key),
    []
  );

  const sortedRows = sortRowsByHeaders(headerSortArr, data);
  console.log({ sortedRows });
  return (
    <Table>
      <>
        <Thead>
          <Tr>
            {tableHead.map((ele) => (
              <Th style={ele.style}>{ele.value}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {sortedRows.map((rows: any) => {
            const rowData = Object.keys(rows).map((key, index: number) => ({
              value: rows[key],
              style: tableHead[index].style,
            }));
            return (
              <Tr>
                {rowData.map((data) => {
                  const { value, style } = data;

                  return <Td style={style}>{value}</Td>;
                })}
              </Tr>
            );
          })}
        </Tbody>
      </>
    </Table>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 72px 60px 0;
  margin: 0 auto;
  width: 1200px;
  min-width: 1200px;
  height: 763px;
`;

const ContentBox = styled.div`
  flex: 1;
  padding: 0 20px;
`;

const TitleBox = styled.div`
  height: 63px;
  display: flex;
  align-items: flex-end;
  border-top: solid 1px #dfe5eb;
`;
const Title = styled.span`
  font-weight: 700;
  font-size: 20px;
  color: ${colors.gray7};
`;

const FilterBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  height: 72px;
  padding: 32px 0 0;
`;

const TableBox = styled.div`
  padding: 24px 0 0;
`;

const IssuesPage = () => {
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const onPageChange = (page: number) => {
    navigate({
      pathname: "/home",
      search: generateSearchQueryString(searchParams, {
        page: page.toString(),
      }),
    });
  };

  return (
    <Container>
      <ContentBox>
        <TitleBox>
          <Title>이슈정리</Title>
        </TitleBox>

        <FilterBox>
          <IssueStatus />
          <DateStatus />
        </FilterBox>

        <TableBox>
          <Suspense fallback={<div>...loading</div>}>
            <GitIssueTable />
            <Pagination
              currentPage={Number(searchParams.get("page") || 1)}
              totalPages={100000000}
              itemsPerPage={5}
              onPageChange={onPageChange}
            />
          </Suspense>
        </TableBox>
      </ContentBox>
    </Container>
  );
};

export default IssuesPage;
