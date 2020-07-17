import React from "react";
import Fade from "react-reveal/Fade";
import { rem } from "polished";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AddButton, RoundGreyButton } from "../../../../../style/GlobalButtons";
import { Styledh2 } from "../../../../../style/GlobalTitles";

//////////
// STYLES
//////////
const QuestionCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 16px;
  height: 140px;
  margin-bottom: 8px;
  overflow: hidden;
  div:first-child {
    width: 90%;
  }
`;
//////////
// REACT
//////////
const MAX_QUEST_LENGTH = 240;

const tip =
  "    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const GenericQuestionCard = (props) => {
  return (
    <QuestionCard>
      <div>
        <Styledh2>Question</Styledh2>
        <p>{`${tip.substring(0, MAX_QUEST_LENGTH)}...`}</p>
      </div>
      <RoundGreyButton>
        <FontAwesomeIcon icon={["fas", "pencil-alt"]} />
      </RoundGreyButton>
    </QuestionCard>
  );
};

export default GenericQuestionCard;
