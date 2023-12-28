/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { useModalStore } from "store/client";

const ContentModal = () => {
  const onClose = useModalStore.getState().closeModal;
  const { isOpen, content } = useModalStore((state) => state.modalState);

  const modalContainerStyles = css`
    display: ${isOpen ? "block" : "none"};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    justify-content: center;
    align-items: center;
  `;

  const modalContentStyles = css`
    overflow: auto;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 16px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    max-width: 80%;
    max-height: 80%;
    padding: 24px 20px 20px;
  `;

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div css={modalContainerStyles} onClick={handleClickOutside}>
      <div css={modalContentStyles}>{content}</div>
    </div>
  );
};

export default ContentModal;
