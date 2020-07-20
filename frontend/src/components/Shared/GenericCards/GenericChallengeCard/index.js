import React, {useState} from "react";
import Fade from "react-reveal/Fade";
import {rem} from "polished";
import styled from "styled-components";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {
    AddButton,
    BlueButton,
    RedButton,
    RoundGreyButton,
} from "../../../../style/GlobalButtons";
import UserModal from "../../Navigation/UserModal";
import {BaseInput, BaseTextArea} from "../../../../style/GlobalInputs";
import Challenge from "../../../Pages/Challenge";
import {Styledh2} from "../../../../style/GlobalTitles";
import {useHistory} from "react-router";

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

const GenericChallengeCard = ({challenge}) => {
    const history = useHistory();

    const onStartHandler = (e) => {
        e.preventDefault();
        history.push(`/challenge/${challenge.id}`)
    };

    return (
        <ChallengeCard>
            <Challengeh2>{`Technical Challenge ${challenge.id}`}</Challengeh2>
            <p>{`Status: ${challenge.status}`}</p>
            <StartChallengeButton onClick={onStartHandler}>
                <p>Start</p>
                <FontAwesomeIcon icon={["fas", "play"]}/>
            </StartChallengeButton>
        </ChallengeCard>
    );
};

export default GenericChallengeCard;
