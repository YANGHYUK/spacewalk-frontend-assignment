import styled from "@emotion/styled";
import CheckList from "components/CheckList/CheckList.component";
import Chip from "components/Chip/Chip.component";
import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useModalStore } from "store/client";
import { colors } from "style/theme";
import { generateSearchQueryString } from "utils/commonFunction";
const ModalContentContainer = styled.div`
  min-width: 400px;
  min-height: 240px;
  .title {
    color: ${colors.gray7};
    font-size: 20px;
    font-weight: 700;
  }
  .content {
    width: 100%;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    height: 72px;
  }
  .submit {
    padding: 20px;
    background-color: ${colors.blue4};
    color: ${colors.white};
    border-radius: 10px;
    border: none;
    width: 350px;
    font-size: 16px;
    font-weight: 700;
  }
`;

type TdateState = "created" | "updated" | "comments";
const DateStatusModalContent = ({
  dateStatusFromParams,
}: {
  dateStatusFromParams: string | null;
}) => {
  // created”,“updated”,“comments
  let [searchParams] = useSearchParams();

  const { closeModal } = useModalStore();
  const navigate = useNavigate();
  const onClick = (value: TdateState) => {
    navigate({
      pathname: "/home",
      search: generateSearchQueryString(searchParams, {
        sort: value,
        page: 1,
      }),
    });
    closeModal();
  };

  return (
    <ModalContentContainer>
      <div className="title">정렬</div>
      <div className="content">
        <CheckList
          value="작성일 순"
          active={dateStatusFromParams === "created"}
          onClick={() => onClick("created")}
        />
        <CheckList
          value="수정일 순"
          active={dateStatusFromParams === "updated"}
          onClick={() => onClick("updated")}
        />
        <CheckList
          value="코멘트 순"
          active={dateStatusFromParams === "comments"}
          onClick={() => onClick("comments")}
        />
      </div>
    </ModalContentContainer>
  );
};

const DateStatusContainer = styled.div``;
const DateStatus = () => {
  let [searchParams] = useSearchParams();
  const dateStatusFromParams = searchParams.get("sort") || "created";
  const { openModal } = useModalStore();
  const dateStatusName = useMemo(() => {
    switch (dateStatusFromParams) {
      case "created":
        return "작성일 순";
      case "updated":
        return "수정일 순";
      case "comments":
        return "코멘트 순";
      default:
        return "";
    }
  }, [dateStatusFromParams]);

  return (
    <DateStatusContainer
      onClick={(e) => {
        openModal(
          <DateStatusModalContent dateStatusFromParams={dateStatusFromParams} />
        );
      }}
    >
      <Chip
        value={dateStatusName}
        isArrow
        containerStyle={{ border: "none" }}
      />
    </DateStatusContainer>
  );
};

export default DateStatus;
