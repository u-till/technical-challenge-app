import React from "react";
import Fade from "react-reveal/Fade";
import {rem} from "polished";
import styled from "styled-components";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {AddButton, RoundGreyButton} from "../../../../style/GlobalButtons";
import {Styledh2} from "../../../../style/GlobalTitles";
import {useDispatch} from "react-redux";
import {setTargetQuestion} from "../../../../store/actions/questionActions";

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

const GenericQuestionCard = ({question, setData}) => {
    const dispatch = useDispatch();

    const onClickHandler = () => {
        dispatch(setTargetQuestion(question));
        setData({...question})
    };

    return (
        <QuestionCard>
            <div>
                <Styledh2>{question.name}</Styledh2>
                <p>{question.instructions}</p>
            </div>
            <RoundGreyButton onClick={onClickHandler}>
                <FontAwesomeIcon icon={["fas", "pencil-alt"]}/>
            </RoundGreyButton>
        </QuestionCard>
    );
};

export default GenericQuestionCard;
