import styled from "@emotion/styled";
import React from "react";
import { colors } from "../../../style/theme";
const StyledThead = styled.thead`
  background-color: ${colors.gray0};
  width: 100%;
  height: 32px;
`;

const Thead = ({ children }: { children?: React.ReactNode }) => {
  return <StyledThead>{children}</StyledThead>;
};

export default Thead;
