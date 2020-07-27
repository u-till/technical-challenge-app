import React from "react";
import styled from "styled-components";
import { rem } from "polished";
import { Styledh3, Styledh1 } from "../../../style/GlobalTitles/index";
import {
  BaseContainer,
  PageContainer,
} from "../../../style/GlobalWrappers/index";
import { BigRedButton } from "../../../style/GlobalButtons/index";
import { useHistory } from "react-router";
import { useRouteMatch } from "react-router-dom";
import example from "../../../assets/images/example-screenshot.png";
import { useDispatch } from "react-redux";
import { setChallengeStartTimeAction } from "../../../store/actions/challengeActions";

//////////
// STYLE
//////////

const InformationContainer = styled.div`
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  min-width: 870px;
`;

const ExampleImage = styled.div`
  min-height: ${rem("535px")};
  min-width: ${rem("820px")};
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url(${example});
  background-position: center;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

const ChallengeInstructionsContainer = styled(BaseContainer)`
  display: inline-flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  padding: 24px 24px 0 24px;
`;

const LeftSideContainer = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  height: ${rem("535px")};
  min-width: 820px;
  height: 100%;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  margin-right: 24px;
  margin-bottom: 24px;
`;

const ChallengeInstructions = styled.div`
  width: 100%;
  text-justify: auto;
`;

const RightSideContainer = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  min-width: 320px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;

const P = styled.p`
  font-weight: normal;
  font-size: ${rem("14px")};
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
  const dispatch = useDispatch();
  // Used by Start button to start candidate challenge
  const onStartHandler = async (e) => {
    e.preventDefault();
    const time = new Date();
    const startTime = {
      started: time.getTime(),
    };
    const response = await dispatch(
      setChallengeStartTimeAction(match.params.challengeId, startTime)
    );
    if (response.status === 200) {
      history.push(`/challenge/${match.params.challengeId}/`);
    }
  };

  return (
    <PageContainer>
      <InformationContainer>
        <Styledh1>Technical Challenge</Styledh1>
        <ChallengeInstructionsContainer>
          <LeftSideContainer>
            <ExampleImage></ExampleImage>
          </LeftSideContainer>
          <RightSideContainer>
            <ChallengeInstructions>
              <div>
                <P>
                  Welcome to your Technical Coding Challenge. You will have 30
                  minutes to pass 6 coding questions. The questions will have
                  varying levels of difficulty. You may move freely between each
                  question with the Next and Previous buttons. When you are
                  finished, click the Done button to submit your final results.
                </P>
                <br></br>
                <P>
                  On the the Upper Left Panel is your Coding Challenge Instructions.
                  Pay close attention to the naming of functions, functions with
                  the wrong name will not be tested. If you need some assistance
                  feel free to click the " Get Hint " button for some suggestions.
                </P>
                <br></br>
                <P>
                  On the Lower Right Panel is the tests your code will be evaluated
                  against. The result of each test will be displayed to the right
                  of the test as a green checkmark or red X. A green checkmark means
                  a test passed, a red X means the test failed. If tests fail, feel
                  free to change your code and submit again.
                </P>
                 <br></br>
                <P>
                  On the Right Panel is your coding input window. You will
                  enter your code here, paying close attention to naming and
                  syntax. When you think your code is correct, click the Submit
                  button to submit and evaluate your answer to the question against
                  the listed tests. If the tests Fail, you are welcome to adjust your
                  code and try again.
                </P>
                <br></br>
                <P>Best of Luck with your Technical Coding Challenge!!</P>
              </div>
            </ChallengeInstructions>
            <ReadyButtonContainer>
              <Styledh3>Ready?</Styledh3>
              <BigRedButton onClick={onStartHandler}>Start</BigRedButton>
            </ReadyButtonContainer>
          </RightSideContainer>
        </ChallengeInstructionsContainer>
      </InformationContainer>
    </PageContainer>
  );
};

export default StartChallenge;
