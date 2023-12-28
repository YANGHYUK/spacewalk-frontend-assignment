import styled from "@emotion/styled";
import React from "react";
const StyledTbody = styled.tbody`
  padding-top: 8px;
`;
const Tbody = ({ children }: { children?: React.ReactNode }) => {
  return <StyledTbody>{children}</StyledTbody>;
};

export default Tbody;
