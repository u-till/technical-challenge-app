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
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 16px;
  height: 100px;
  margin-bottom: 8px;
  p:first-child {
    width: 70%;
  }
  overflow: hidden;
`;

const StartChallengeButton = styled(BlueButton)`
  width: 120px;
  p {
    padding-right: 12px;
    display: inline;
  }
`;

const Challengeh2 = styled(Styledh2)`
  font-size: 18px;
`;

//////////
// REACT
//////////

const GenericChallengeCard = (props) => {
  return (
    <ChallengeCard>
      <Challengeh2>Fullstack Challenge 1</Challengeh2>
      <p>Status: Open</p>
      <StartChallengeButton>
        <p>Start</p>
        <FontAwesomeIcon icon={["fas", "play"]} />
      </StartChallengeButton>
    </ChallengeCard>
  );
};

export default GenericChallengeCard;
