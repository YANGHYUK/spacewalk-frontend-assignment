/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import { colors } from "../../style/theme";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  gap: 8px;
`;

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
}) => {
  const pageButton = css`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 18px;
    cursor: pointer;
    background-color: #fff;
    color: ${colors.gray4};
    font-weight: 700;
    transition: background-color 0.3s ease-in-out;
    font-size: 16px;
    &:hover {
      background-color: #f0f0f0;
    }

    &:focus {
      outline: none;
    }
  `;

  const activePageButton = css`
    background-color: ${colors.gray1_light};
    color: ${colors.gray7};
  `;

  const arrowButton = css`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #fff;
    color: ${colors.gray3};
    transition: background-color 0.3s ease-in-out;
    font-size: 20px;
    &:hover {
      background-color: #f0f0f0;
    }

    &:focus {
      outline: none;
    }
  `;

  const handlePageClick = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  const handlePrevClick = () => {
    const prevLastPage = currentPage - 1;
    const prevFirstPage = Math.max(1, prevLastPage - itemsPerPage + 1);
    handlePageClick(prevFirstPage);
  };

  const handleNextClick = () => {
    const nextFirstPage = currentPage + itemsPerPage;
    handlePageClick(nextFirstPage);
  };
  const start = Math.max(1, currentPage - Math.floor(itemsPerPage / 2));
  const end = Math.min(totalPages, start + itemsPerPage - 1);

  const renderPageButtons = () => {
    const pages: JSX.Element[] = [];

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          css={[pageButton, currentPage === i && activePageButton]}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <Container>
      <button css={arrowButton} onClick={handlePrevClick}>
        {"<"}
      </button>
      {renderPageButtons()}
      <button css={arrowButton} onClick={handleNextClick}>
        {">"}
      </button>
    </Container>
  );
};

export default Pagination;
