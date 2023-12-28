import styled from "@emotion/styled";
import React, { CSSProperties, useMemo } from "react";
import { colors } from "../../../style/theme";
const StyledTh = styled.th`
  word-break: keep-all;
  flex-shrink: 0;

  color: ${colors.gray5};
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  padding: 6px 12px;
  :first-of-type {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  :last-of-type {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;
const Th = ({
  children,
  style = {},
}: {
  children: React.ReactNode;
  style?: CSSProperties;
}) => {
  const thStyleMemo = useMemo(() => style, [style]);
  return <StyledTh style={thStyleMemo}>{children}</StyledTh>;
};

export default Th;
