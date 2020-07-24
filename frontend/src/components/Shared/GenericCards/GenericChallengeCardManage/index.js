import React, { useState } from "react";
import { rem } from "polished";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BlueButton, RedButton } from "../../../../style/GlobalButtons";
import { Styledh2 } from "../../../../style/GlobalTitles";
import { useHistory } from "react-router";
import GenericDeleteModal from "../../Modals/GenericDeleteModal/GenericDeleteModal";
import ReactTooltip from "react-tooltip";
import {
  resendChallengeInvitationAction,
  resendChallengeResultAction,
} from "../../../../store/actions/challengeActions";
import { useDispatch } from "react-redux";

//////////
// STYLES
//////////
const ChallengeCard = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 16px;
  height: ${rem("100px")};
  margin-bottom: 8px;

  overflow: hidden;
  > div:last-child {
    min-width: 200px;
    width: 14%;
    display: flex;
    justify-content: space-between;
  }
`;

const ChallengeInfo = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  min-width: 200px;
  height: 100%;
`;

const Challengeh2 = styled(Styledh2)`
  font-size: ${rem("18px")};
`;

const DeleteButton = styled(RedButton)`
  padding: 8px;
  width: ${rem("34px")};
  height: ${rem("34px")};
`;

const SendButton = styled(BlueButton)`
  padding: 8px;
  width: ${rem("34px")};
  height: ${rem("34px")};
`;

//////////
// REACT
//////////

const GenericChallengeCardManage = ({ challenge }) => {
  const dispatch = useDispatch();

  const [isModalDeleteOpen, setModalDeleteOpen] = useState(false);

  const ModalDeleteOpenCloseHandler = () => {
    setModalDeleteOpen(!isModalDeleteOpen);
  };

  const resendInvitationEmail = async (e) => {
    e.preventDefault();
    //start animation
    const response = await dispatch(
      resendChallengeInvitationAction(challenge.id)
    );
    if (response.status === 200) {
      //stop animation
    }
  };

  const resendResultEmail = async (e) => {
    e.preventDefault();
    //start animation
    const response = await dispatch(resendChallengeResultAction(challenge.id));
    if (response.status === 200) {
      //stop animation
    }
  };

  return (
    <ChallengeCard>
      <Challengeh2>{`Full Stack - Challenge #${challenge.id}`}</Challengeh2>
      <ChallengeInfo>
        <p>
          Candidate:{" "}
          {`${challenge.candidate.first_name} ${challenge.candidate.last_name}`}
        </p>
        <p>Created: {challenge.created.slice(0, 10)}</p>
        <p>Status: {challenge.status}</p>
        <p>
          Created by:{" "}
          {`${challenge.creator.first_name} ${challenge.creator.last_name}`}
        </p>
      </ChallengeInfo>
      <div>
        <DeleteButton
          onClick={ModalDeleteOpenCloseHandler}
          data-tip="Delete Challenge"
        >
          <FontAwesomeIcon icon={["far", "trash-alt"]} />
          <ReactTooltip place="top" type="dark" effect="solid" />
        </DeleteButton>
        {isModalDeleteOpen ? (
          <GenericDeleteModal
            ModalDeleteOpenCloseHandler={ModalDeleteOpenCloseHandler}
            type="challenges"
            typeId={challenge.id}
            from="managechallenges"
          >
            <p>{`Are you sure you want to delete the Challenge #${challenge.id}`}</p>
          </GenericDeleteModal>
        ) : null}
        {challenge.status === "PASSED" || challenge.status === "FAILED" || challenge.status === "NEEDS REVIEW" ? (
          <SendButton
            data-tip="Resend Challenge Score Email"
            onClick={resendResultEmail}
          >
            <FontAwesomeIcon icon={["fas", "trophy"]} />
            <ReactTooltip place="top" type="dark" effect="solid" />
          </SendButton>
        ) : (
          <SendButton
            data-tip="Resend Challenge Invitation Email"
            onClick={resendInvitationEmail}
          >
            <FontAwesomeIcon icon={["fas", "envelope-open-text"]} />
            <ReactTooltip place="top" type="dark" effect="solid" />
          </SendButton>
        )}
      </div>
    </ChallengeCard>
  );
};

export default GenericChallengeCardManage;
