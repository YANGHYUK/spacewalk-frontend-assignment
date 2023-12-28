import styled from "@emotion/styled";
import React from "react";
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;
const Table = ({ children }: { children?: React.ReactNode }) => {
  return <StyledTable>{children}</StyledTable>;
};

export default Table;
