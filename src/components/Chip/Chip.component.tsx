import styled from "@emotion/styled";
import React, { CSSProperties, useMemo } from "react";
import { colors } from "style/theme";
const ChipContainer = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 14px;
  border-radius: 30px;
  border: ${(props) => !props.active && "solid 1px #dfe5eb"};
  background-color: ${(props) => props.active && colors.blue4};
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
const Content = styled.span<{ active: boolean }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.active && colors.white};
`;
const Arrow = styled.span`
  border: solid #333;
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
const Chip = ({
  value,
  active = false,
  isArrow = false,
  containerStyle = {},
  onClick,
}: {
  value: any;
  active?: boolean;
  isArrow?: boolean;
  containerStyle?: CSSProperties;
  onClick?: any;
}) => {
  const activeMemo = useMemo(() => active, [active]);
  const containerStyleMemo = useMemo(() => containerStyle, [containerStyle]);

  return (
    <ChipContainer
      active={activeMemo}
      style={containerStyleMemo}
      onClick={onClick}
    >
      <Content active={activeMemo}>{value}</Content>
      {isArrow && <Arrow className="down" />}
    </ChipContainer>
  );
};

export default Chip;
