/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import { colors } from "../../style/theme";
import { range } from "utils/commonFunction";

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

  const pageGroup = Math.ceil(Number(currentPage) / itemsPerPage);
  let last = totalPages ? Number(pageGroup * itemsPerPage) : 1;
  if (last > totalPages) last = totalPages;
  let first =
    last - (itemsPerPage - 1) > 0 ? Number(last - (itemsPerPage - 1)) : 1;
  const next = last + 1;
  const prev = first - 1;

  if (totalPages < 1) {
    first = last;
  }

  if (totalPages === 0) {
    return null;
  }

  const handlePageClick = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  const handlePrevClick = () => {
    first > 1 && first <= currentPage && handlePageClick(prev);
  };
  const handleNextClick = () => {
    next > currentPage && next <= totalPages && handlePageClick(next);
  };
  const renderPageButtons = () => {
    const pages: JSX.Element[] = [];
    range(first, last, 1).forEach((i: number) => {
      pages.push(
        <button
          key={i}
          css={[pageButton, currentPage === i && activePageButton]}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      );
    });

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
