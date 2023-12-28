import styled from "@emotion/styled";
import React from "react";
const StyledTr = styled.tr`
  height: 36px;
`;
const Tr = ({ children }: { children?: React.ReactNode }) => {
  return <StyledTr>{children}</StyledTr>;
};

export default Tr;
