import React from "react";
import SelectBar from "../../components/SelectBar/SelectBar.component";
import Pagination from "../../components/Pagination/Pagination.component";
import Table from "../../components/tables/Table/Table.component";
import Thead from "../../components/tables/Thead/Thead.component";
import Tr from "../../components/tables/Tr/Tr.component";
import Tbody from "../../components/tables/Tbody/Tbody.component";
import Td from "../../components/tables/Td/Td.component";
import Th from "../../components/tables/Th/Th.component";

const ComponentTestPage = () => {
  const tableHeaders = [
    "번호",
    "제목",
    "작성자",
    "작성일",
    "수정일",
    "코멘트 수",
  ];
  const tableRows = [
    ["번호", "제목", "작성자", "작성일", "수정일", "코멘트 수"],
    ["번호", "제목", "작성자", "작성일", "수정일", "코멘트 수"],
    ["번호", "제목", "작성자", "작성일", "수정일", "코멘트 수"],
  ];
  return (
    <div style={{ padding: "30px" }}>
      ComponentTestPage
      <Pagination
        currentPage={1}
        totalPages={10}
        itemsPerPage={5}
        onPageChange={() => {}}
      />
      <SelectBar
        value="1"
        options={[{ label: "1", value: "1" }]}
        onSelect={() => {}}
      />
      <Table>
        <>
          <Thead>
            <Tr>
              {tableHeaders.map((ele) => (
                <Th>{ele}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {tableRows.map((rows) => (
              <Tr>
                {rows.map((data) => (
                  <Td>{data}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </>
      </Table>
    </div>
  );
};

export default ComponentTestPage;
