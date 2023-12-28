import styled from "@emotion/styled";
import Chip from "components/Chip/Chip.component";
import { useCallback, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useModalStore } from "store/client";
import { colors } from "style/theme";
import { generateSearchQueryString } from "utils/commonFunction";

const ModalContentContainer = styled.div`
  .title {
    color: ${colors.gray7};
    font-size: 18px;
    font-weight: 700;
  }
  .content {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    gap: 8px;
    height: 72px;
    align-items: flex-start;
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
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const IssueStatusModalContent = ({
  issueStatusFromParams,
}: {
  issueStatusFromParams: string | null;
}) => {
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [state, setState] = useState(issueStatusFromParams);
  const { closeModal } = useModalStore();
  const onClick = (value: string) => {
    setState(value);
  };
  const onSubmit = useCallback(() => {
    closeModal();
    navigate({
      pathname: "/home",
      search: generateSearchQueryString(searchParams, {
        state,
        page: 1,
      }),
    });
  }, [state, searchParams]);

  return (
    <ModalContentContainer>
      <div className="title">이슈 상태</div>
      <div className="content">
        <Chip
          value="전체"
          active={state === "all"}
          onClick={() => onClick("all")}
        />
        <Chip
          value="open"
          active={state === "open"}
          onClick={() => onClick("open")}
        />
        <Chip
          value="closed"
          active={state === "closed"}
          onClick={() => onClick("closed")}
        />
      </div>
      <button className="submit" onClick={onSubmit}>
        적용
      </button>
    </ModalContentContainer>
  );
};

const IssueStatusContainer = styled.div``;
const IssueStatus = () => {
  let [searchParams] = useSearchParams();
  const issueStatusFromParams = searchParams.get("state") || null;
  const { openModal } = useModalStore();

  const issueStateName = useMemo(() => {
    switch (issueStatusFromParams) {
      case "all":
        return "전체";
      case "open":
        return "open";
      case "closed":
        return "closed";
      default:
        return "이슈 상태";
    }
  }, [issueStatusFromParams]);
  return (
    <IssueStatusContainer
      onClick={(e) => {
        openModal(
          <IssueStatusModalContent
            issueStatusFromParams={issueStatusFromParams}
          />
        );
      }}
    >
      <Chip value={issueStateName} isArrow />
    </IssueStatusContainer>
  );
};

export default IssueStatus;
