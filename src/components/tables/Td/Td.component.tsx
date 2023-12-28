import styled from "@emotion/styled";
import React, { CSSProperties, useMemo } from "react";
import { colors } from "../../../style/theme";
const StyledTd = styled.td`
  color: ${colors.gray5};
  font-size: 14px;
  font-weight: 500;
  padding: 6px 12px;
`;
const Td = ({
  children,
  style = {},
}: {
  children: React.ReactNode;
  style?: CSSProperties;
}) => {
  const tdStyleMemo = useMemo(() => style, [style]);
  return <StyledTd style={tdStyleMemo}>{children}</StyledTd>;
};

export default Td;
