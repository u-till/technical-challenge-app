import React, { useState } from "react";
import { rem } from "polished";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BlueButton, RedButton } from "../../../../style/GlobalButtons";
import { Styledh2 } from "../../../../style/GlobalTitles";
import { useHistory } from "react-router";
import GenericDeleteModal from "../../Modals/GenericDeleteModal/GenericDeleteModal";
import ReactTooltip from "react-tooltip";

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
  p:first-child {
    width: 70%;
  }
  overflow: hidden;
`;

const StartChallengeButton = styled(BlueButton)`
  width: ${rem("120px")};
  p {
    padding-right: 12px;
    display: inline;
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
`;

//////////
// REACT
//////////

const GenericChallengeCardManage = ({}) => {
  const [isModalDeleteOpen, setModalDeleteOpen] = useState(false);

  const ModalDeleteOpenCloseHandler = () => {
    setModalDeleteOpen(!isModalDeleteOpen);
  };

  return (
    <ChallengeCard>
      <Challengeh2>Full Stack</Challengeh2>
      <p>Candidate: </p>
      {/*${challenge.status}*/}
      <p>Status: </p>
      {/*${challenge.status}*/}
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
          // typeId={challenge.id}
        >
          <p>{`Are you sure you want to delete the Challenge #?`}</p>
          {/*${challenge.id}*/}
        </GenericDeleteModal>
      ) : null}
      <SendButton data-tip="Resend Challenge Invitation Email">
        <FontAwesomeIcon icon={["fas", "envelope-open-text"]} />
        <ReactTooltip place="top" type="dark" effect="solid" />
      </SendButton>
      <SendButton data-tip="Resend Challenge Score Email">
        <FontAwesomeIcon icon={["fas", "trophy"]} />
        <ReactTooltip place="top" type="dark" effect="solid" />
      </SendButton>
    </ChallengeCard>
  );
};

export default GenericChallengeCardManage;
