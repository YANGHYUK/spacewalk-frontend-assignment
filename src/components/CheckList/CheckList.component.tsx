import styled from "@emotion/styled";
import React, { CSSProperties, useMemo } from "react";
import { colors } from "style/theme";
const CheckListContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 15px 0;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
const Content = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  height: 26px;
`;
const Arrow = styled.span`
  border: solid ${colors.blue4};
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;

  margin-left: 15px;
  transition: transform 0.3s;
  &.up {
    transform: rotate(-135deg);
  }

  &.down {
    transform: rotate(45deg);
  }
`;
const CheckList = ({
  value,
  active = false,
  containerStyle = {},
  onClick,
}: {
  value: any;

  active?: boolean;
  containerStyle?: CSSProperties;
  onClick?: any;
}) => {
  const containerStyleMemo = useMemo(() => containerStyle, [containerStyle]);

  return (
    <CheckListContainer style={containerStyleMemo} onClick={onClick}>
      <Content>{value}</Content>
      {active && <Arrow className="down" />}
    </CheckListContainer>
  );
};

export default CheckList;
