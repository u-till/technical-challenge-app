import React, { useState } from "react";
import Fade from "react-reveal/Fade";
import { rem } from "polished";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  AddButton,
  BlueButton,
  RedButton,
  RoundGreyButton,
} from "../../../../style/GlobalButtons";
import UserModal from "../../Navigation/UserModal";
import { BaseInput, BaseTextArea } from "../../../../style/GlobalInputs";
import Challenge from "../../../Pages/Challenge";
import { Styledh2 } from "../../../../style/GlobalTitles";
import GenericDeleteModal from "../../Modals/GenericDeleteModal/GenericDeleteModal";

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
  height: 60px;
  margin-bottom: 8px;
  p:first-child {
    width: 70%;
  }
  overflow: hidden;
`;

const Challengeh2 = styled(Styledh2)`
  font-size: 18px;
`;

const DeleteButton = styled(RedButton)`
  padding: 8px;
  width: 34px;
  height: 34px;
`;

const SendButton = styled(BlueButton)`
  padding: 8px;
  width: 34px;
  height: 34px;
`;

//////////
// REACT
//////////

const GenericChallengeCardSmall = (props) => {
  const [isModalDeleteOpen, setModalDeleteOpen] = useState(false);

  const ModalDeleteOpenCloseHandler = () => {
    setModalDeleteOpen(!isModalDeleteOpen);
  };

  return (
    <ChallengeCard>
      <Challengeh2>Fullstack Challenge 1</Challengeh2>
      <p>Status: Pending</p>
      <DeleteButton onClick={ModalDeleteOpenCloseHandler}>
        <FontAwesomeIcon icon={["far", "trash-alt"]} />
      </DeleteButton>
      {isModalDeleteOpen ? (
        <GenericDeleteModal
          ModalDeleteOpenCloseHandler={ModalDeleteOpenCloseHandler}
        >
          <p>Are you sure you want to delete the Challenge xyz?</p>
        </GenericDeleteModal>
      ) : null}
      <SendButton>
        <FontAwesomeIcon icon={["far", "paper-plane"]} />
      </SendButton>
    </ChallengeCard>
  );
};

export default GenericChallengeCardSmall;
