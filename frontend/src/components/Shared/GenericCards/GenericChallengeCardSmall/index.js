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

const GenericChallengeCardSmall = ({challenge}) => {
  return (
    <ChallengeCard>
      <Challengeh2>{`Challenge ${challenge.id}`}</Challengeh2>
      <p>{`Status: ${challenge.status}`}</p>
      <DeleteButton>
        <FontAwesomeIcon icon={["far", "trash-alt"]} />
      </DeleteButton>
      <SendButton>
        <FontAwesomeIcon icon={["far", "paper-plane"]} />
      </SendButton>
    </ChallengeCard>
  );
};

export default GenericChallengeCardSmall;
