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
import { GenericSpinnerSmallBtn } from "../../GenericSpinner";

//////////
// STYLES
//////////
const ChallengeCard = styled.div`
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
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
    width: 50%;
  }
  overflow: hidden;
`;

const Challengeh2 = styled(Styledh2)`
  font-size: ${rem("16px")};
`;

const StatusText = styled.p`
  font-size: ${rem("14px")};
`;

const RightContainer = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div:first-child {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 60%;
  }
  > div:last-child {
    display: flex;
    justify-content: space-between;
    width: 30%;
  }
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

const AmpleLight = styled.div`
  width: ${rem("8px")};
  height: ${rem("34px")};
  margin-right: 8px;
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
  // Used to manage icon displayed on resend buttons during request
  const [resultStatus, setResultStatus] = useState(false);
  const [inviteStatus, setInviteStatus] = useState(false);
  // Used by Resend Invitation button during the request
  const resendInvitationEmail = async (e) => {
    e.preventDefault();
    setInviteStatus(true);
    await dispatch(resendChallengeInvitationAction(challenge.id));
    setInviteStatus(false);
  };
  // Used by the Resend Results button during the request
  const resendResultEmail = async (e) => {
    e.preventDefault();
    setResultStatus(true);
    await dispatch(resendChallengeResultAction(challenge.id));
    setResultStatus(false);
  };
  // Conditionally change the background colors of the cards based on Status
  const renderBackground = () => {
    if (challenge.status === "PASSED") {
      return {
        backgroundColor: "green",
      };
    }
    if (challenge.status === "FAILED") {
      return {
        backgroundColor: "#ef485c",
      };
    }
    if (challenge.status === "NEEDS REVIEW") {
      return {
        background: "#E6D317",
      };
    }
    return {
      background: "#00bae5",
    };
  };

  return (
    <ChallengeCard>
      <Challengeh2>{`Challenge ${challenge.id}`}</Challengeh2>
      <RightContainer>
        <div>
          <AmpleLight style={renderBackground()}></AmpleLight>
          <StatusText>{`Status: ${challenge.status}`}</StatusText>
        </div>
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
              {resultStatus ? (
                <GenericSpinnerSmallBtn />
              ) : (
                <FontAwesomeIcon icon={["fas", "trophy"]} />
              )}
              <ReactTooltip place="top" type="dark" effect="solid" />
            </SendButton>
          ) : (
            <SendButton
              data-tip="Resend Challenge Invitation Email"
              onClick={resendInvitationEmail}
            >
              {inviteStatus ? (
                <GenericSpinnerSmallBtn />
              ) : (
                <FontAwesomeIcon icon={["fas", "envelope-open-text"]} />
              )}
              <ReactTooltip place="top" type="dark" effect="solid" />
            </SendButton>
          )}
        </div>
      </RightContainer>
    </ChallengeCard>
  );
};

export default GenericChallengeCardSmall;
