import React, { useState } from "react";
import { rem } from "polished";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BlueButton, RedButton } from "../../../../style/GlobalButtons";
import { Styledh2 } from "../../../../style/GlobalTitles";
import GenericDeleteModal from "../../Modals/GenericDeleteModal/GenericDeleteModal";
import ReactTooltip from "react-tooltip";
import { useDispatch } from "react-redux";
import {
  resendChallengeInvitationAction,
  resendChallengeResultAction,
} from "../../../../store/actions/challengeActions";

//////////
// STYLES
//////////
const ChallengeCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 16px;
  height: ${rem("60px")};
  margin-bottom: 8px;
  p:first-child {
    width: 70%;
  }
  overflow: hidden;
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

const GenericChallengeCardSmall = ({ challenge }) => {
  const dispatch = useDispatch();
  // Used to control the display of Delete Modal
  const [isModalDeleteOpen, setModalDeleteOpen] = useState(false);
  const ModalDeleteOpenCloseHandler = () => {
    setModalDeleteOpen(!isModalDeleteOpen);
  };
  // Used by Resend Invitation button during the request
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
  // Used by the Resend Results button during the request
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
      <Challengeh2>{`Challenge ${challenge.id}`}</Challengeh2>
      <p>{`Status: ${challenge.status}`}</p>
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
          from="challenges"
        >
          <p>{`Are you sure you want to delete the Challenge #${challenge.id}?`}</p>
        </GenericDeleteModal>
      ) : null}
      {challenge.status === "PASSED" || challenge.status === "FAILED" ? (
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
    </ChallengeCard>
  );
};

export default GenericChallengeCardSmall;
