import React from "react";
import styled from "styled-components";
import { rem } from "polished";
import Header from "../../Shared/Navigation";
import { StyledPageTitles, Styledh3 } from "../../../style/GlobalTitles/index";
import { PageContainer } from "../../../style/GlobalWrappers/index";
import { BigRedButton } from "../../../style/GlobalButtons/index";
import { useHistory } from "react-router";
import { useRouteMatch } from "react-router-dom";

//////////
// STYLE
//////////
const TechChallengeCont = styled.div`
  width: 1807px;
  height: 711px;
  background: #ffffff;
`;

const InformationContainer = styled.div`
  height: 720px;
  width: 99%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: flex-start;
`;

const ExampleImage = styled.img`
  height: 535px;
  width: 710px;
  background-image: url("http://via.placeholder.com/710x535");
`;

const ChallengeInstructionsContainer = styled.div`
  height: 640px;
  width: 100%;
  border-radius: 5px;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChallengeInstructions = styled.div`
  height: 82.5%;
  width: 100%;
  text-justify: auto;
  padding-top: 50px;
`;

const LeftSideContainer = styled.div`
  padding-left: 50px;
  height: 100%;
  width: 40%;
`;

const RightSideContainer = styled.div`
  padding-right: 50px;
  height: 100%;
  display: flex;
  align-items: center;
`;

const P = styled.p`
  font-weight: normal;
  font-size: 14px;
  text-align: justify;
`;

const ReadyButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

//////////
// REACT
//////////
const StartChallenge = () => {
  const history = useHistory();
  const match = useRouteMatch();

  const onStartHandler = (e) => {
    e.preventDefault();
    history.push(`/challenge/${match.params.challengeId}/`);
  };

  return (
    <PageContainer>
      <InformationContainer>
        <StyledPageTitles>Technical Challenge</StyledPageTitles>
        <ChallengeInstructionsContainer>
          <LeftSideContainer>
            <ChallengeInstructions>
              <P>
                Welcome to your Technical Coding Challenge. You will have 30
                minutes to pass 6 coding questions. The questions will have
                varying levels of difficulty. You may move freely between each
                question with the Next and Previous buttons. When you are
                finished, click the Done button to submit your final results.
              </P>
              <br></br>
              <P>
                On the the Left Panel is your Coding Challenge Instructions. Pay
                close attention to the naming of functions, functions with the
                wrong name will not pass the tests.
              </P>
              <br></br>
              <P>
                On the Middle Panel is your coding input window. You will enter
                your code here, paying close attention to naming and syntax.
                When you think your code is correct, click the Submit button to
                submit and evaluate your answer to the question.
              </P>
              <br></br>
              <P>
                On the Right Panel is the tests your code will be evaluated
                against. The results of the tests run on your code after
                clicking Submit will be displayed in the lower portion of the
                right panel.
              </P>
              <br></br>
              <P>Best of Luck with your Technical Coding Challenge!!</P>
            </ChallengeInstructions>
            <ReadyButtonContainer>
              <Styledh3>Ready?</Styledh3>
              <BigRedButton onClick={onStartHandler}>Start</BigRedButton>
            </ReadyButtonContainer>
          </LeftSideContainer>
          <RightSideContainer>
            <ExampleImage></ExampleImage>
          </RightSideContainer>
        </ChallengeInstructionsContainer>
      </InformationContainer>
    </PageContainer>
  );
};

export default StartChallenge;
