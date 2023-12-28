/** @jsxImportSource @emotion/react */
import { Global, css } from "@emotion/react";
import "normalize.css";

const GlobalStyles = () => (
  <Global
    styles={css`
      /* 추가적인 전역 스타일을 여기에 추가할 수 있습니다 */
    `}
  />
);

export default GlobalStyles;
