import React from "react";
import Slide from "react-reveal/Slide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

//////////
// STYLE
//////////

const GetHintContainer = styled.div`
  display: flex;
  flex-direction: column;
  transition: all 0.5s ease;
  color: #767676;
  padding-top: 24px;
  p {
    padding-top: 8px;
  }
`;

const HintButton = styled.button`
  color: #767676;
  border: none;
  background: none;
  width: 100px;
  p {
    display: inline;
    padding-left: 8px;
  }
  :hover {
    color: #363636;
  }
`;

//////////
// REACT
//////////

const Hint = ({
  isHintOpen,
  HintDoneOpenCloseHandler,
  targetChallenge,
  progressValue,
}) => {
  return (
    <GetHintContainer>
      {isHintOpen ? (
        <Slide bottom>
          <div>
            <HintButton onClick={HintDoneOpenCloseHandler}>
              <FontAwesomeIcon icon={["far", "question-circle"]} />
              <p>Hide Hint</p>
            </HintButton>
            <p>
              {
                targetChallenge.questions[progressValue].fk_tip_question[
                  Math.floor(
                    Math.random() *
                      targetChallenge.questions[progressValue].fk_tip_question
                        .length
                  )
                ].content
              }
            </p>
          </div>
        </Slide>
      ) : (
        <div>
          <HintButton onClick={HintDoneOpenCloseHandler}>
            <FontAwesomeIcon icon={["far", "question-circle"]} />
            <p>{isHintOpen ? "Hide Hint" : "Show Hint"}</p>
          </HintButton>
        </div>
      )}
    </GetHintContainer>
  );
};

export default Hint;
