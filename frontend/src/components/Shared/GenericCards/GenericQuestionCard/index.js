import React from "react";
import { rem } from "polished";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RoundGreyButton } from "../../../../style/GlobalButtons";
import { Styledh2 } from "../../../../style/GlobalTitles";
import { useDispatch } from "react-redux";
import { setTargetQuestion } from "../../../../store/actions/questionActions";
import { getTipsForQuestionAction } from "../../../../store/actions/tipActions";
import {resetError} from "../../../../store/actions/verificationAction";

//////////
// STYLES
//////////
const QuestionCard = styled.div`
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 16px;
  height: ${rem("140px")};
  margin-bottom: 8px;
  overflow: hidden;
  div:first-child {
    width: 90%;
  }
`;

const SmallText = styled.p`
  font-size: smaller;
`;

//////////
// REACT
//////////

const GenericQuestionCard = ({ question, setData }) => {
  const dispatch = useDispatch();

  const onClickHandler = async () => {
    dispatch(resetError())
    const response = await dispatch(getTipsForQuestionAction(question.id));
    if (response.status === 200) {
      dispatch(setTargetQuestion(question));
      setData({ ...question });
    }
  };

  return (
    <QuestionCard>
      <div>
        <SmallText>
          {question.difficulty === "I"
            ? "Intermediate"
            : question.difficulty === "H"
            ? "Hard"
            : "Easy"}
        </SmallText>
        <Styledh2>{question.name}</Styledh2>
        <p>
          {question.instructions.length > 130
            ? `${question.instructions.slice(0, 130)}...`
            : question.instructions}
        </p>
      </div>
      <RoundGreyButton onClick={onClickHandler}>
        <FontAwesomeIcon icon={["fas", "pencil-alt"]} />
      </RoundGreyButton>
    </QuestionCard>
  );
};

export default GenericQuestionCard;
