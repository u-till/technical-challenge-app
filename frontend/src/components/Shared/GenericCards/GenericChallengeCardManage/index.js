import React, {useState} from "react";
import {rem} from "polished";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {BlueButton, RedButton} from "../../../../style/GlobalButtons";
import {Styledh2} from "../../../../style/GlobalTitles";
import GenericDeleteModal from "../../Modals/GenericDeleteModal/GenericDeleteModal";
import ReactTooltip from "react-tooltip";
import {
    resendChallengeInvitationAction,
    resendChallengeResultAction,
} from "../../../../store/actions/challengeActions";
import {useDispatch} from "react-redux";

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
  > div:first-child {
    min-width: 20px;
  }
  > div:last-child {
    display: flex;
    justify-content: space-between;
  }
`;

const ChallengeInfo = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  min-width: 200px;
  height: 100%;
  p:last-child {
    font-size: 14px;
  }
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
  margin-left: 32px;
`;

//////////
// REACT
//////////

const GenericChallengeCardManage = ({challenge}) => {
    const dispatch = useDispatch();
    // Used to toggle the delete Challenge Card modal
    const [isModalDeleteOpen, setModalDeleteOpen] = useState(false);
    const ModalDeleteOpenCloseHandler = () => {
        setModalDeleteOpen(!isModalDeleteOpen);
    };
    // Used to manage icon displayed on resend buttons during request
    const [resultStatus, setResultStatus] = useState(false);
    const [inviteStatus, setInviteStatus] = useState(false);
    // Used by Resend Invitation Email button
    const resendInvitationEmail = async (e) => {
        e.preventDefault();
        setInviteStatus(true);
        await dispatch(resendChallengeInvitationAction(challenge.id));
        setInviteStatus(false);
    };
    // Used by Resend Results Email button
    const resendResultEmail = async (e) => {
        e.preventDefault();
        setResultStatus(true);
        await dispatch(resendChallengeResultAction(challenge.id));
        setResultStatus(false);
    };

    return (
        <ChallengeCard>
            <div>
                <Challengeh2>{`Full Stack - Challenge #${challenge.id}`}</Challengeh2>
            </div>
            <div>
                <ChallengeInfo>
                    <p>
                        Candidate:{" "}
                        {`${challenge.candidate.first_name} ${challenge.candidate.last_name}`}
                    </p>
                    <p>Status: {challenge.status}</p>
                </ChallengeInfo>
                <ChallengeInfo>
                    <p>Created: {challenge.created.slice(0, 10)}</p>
                    <p>
                        Created by:{" "}
                        {`${challenge.creator.first_name} ${challenge.creator.last_name}`}
                    </p>
                </ChallengeInfo>
                <DeleteButton
                    onClick={ModalDeleteOpenCloseHandler}
                    data-tip="Delete Challenge"
                >
                    <FontAwesomeIcon icon={["far", "trash-alt"]}/>
                    <ReactTooltip place="top" type="dark" effect="solid"/>
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
                {challenge.status === "PASSED" ||
                challenge.status === "FAILED" ||
                challenge.status === "NEEDS REVIEW" ? (
                    <SendButton
                        data-tip="Resend Challenge Score Email"
                        onClick={resendResultEmail}
                    >
                        {resultStatus ? (<FontAwesomeIcon icon={["fas", "spinner"]}/>) : (
                            <FontAwesomeIcon icon={["fas", "trophy"]}/>)}
                        <ReactTooltip place="top" type="dark" effect="solid"/>
                    </SendButton>
                ) : (
                    <SendButton
                        data-tip="Resend Challenge Invitation Email"
                        onClick={resendInvitationEmail}
                    >
                        {inviteStatus ? (<FontAwesomeIcon icon={["fas", "spinner"]}/>) : (
                            <FontAwesomeIcon icon={["fas", "envelope-open-text"]}/>)}
                        <ReactTooltip place="top" type="dark" effect="solid"/>
                    </SendButton>
                )}
            </div>
        </ChallengeCard>
    );
};

export default GenericChallengeCardManage;
