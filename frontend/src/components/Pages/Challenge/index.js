import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { rem } from "polished";
import { BaseContainer } from "../../../style/GlobalWrappers";
import { Styledh1, Styledh2 } from "../../../style/GlobalTitles";
import {
  Container as ResizeContainer,
  Section,
  Bar,
} from "react-simple-resizer";
import { connect } from "react-redux";
import {
  getUserChallengeAction,
  setUserChallengeScoreAction,
} from "../../../store/actions/challengeActions";
import { useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { runTestAction } from "../../../store/actions/testActions";
import Error from "../../Shared/Error";
import { GenericSpinnerSmall } from "../../Shared/GenericSpinner";
import Hint from "./Hint";
import SmallCodeMirror from "./SmallCodeMirror";
import LargeCodeMirror from "./LargeCodeMirror";
import ChallengeFooter from "./Footer";

//////////
// STYLE
//////////

const ChallengeContainer = styled.div`
  width: 100vw;
  height: 100%;
  padding-bottom: 70px;
`;

const StyledResizeContainer = styled(ResizeContainer)`
  height: 100%;
`;

const StyledResizeBar = styled(Bar)`
  width: ${rem("8px")};
  background: #888888;
  cursor: col-resize;
`;

const DescriptionColumn = styled(Section)`
  background-color: #adadad;

  overflow-y: auto !important;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const DescriptionContainer = styled(BaseContainer)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 64%;
`;

const DescriptionHeader = styled.div`
  min-height: 64px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 8px;
  margin-bottom: 8px;
  border-bottom: 1px solid #dddddd;
  h1,
  h2 {
    display: inline-flex;
    padding-bottom: 0;
  }
  h2 {
    padding-bottom: 4px;
  }
`;

const ChallengeTitle = styled(Styledh1)`
  font-size: ${rem("40px")};
  font-weight: bold;
`;

const DescriptionContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  div:first-child {
    overflow-y: auto;
  }
`;

const InputColumn = styled(Section)`
  padding: 8px;
  background-color: #adadad;
`;

const TestsContainer = styled(BaseContainer)`
  height: ${rem("200px")};
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 35%;
`;

const TestsHeader = styled.div`
  min-height: 44px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 8px;
  margin-bottom: 8px;
  border-bottom: 1px solid #dddddd;
  span {
    font-size: ${rem("16px")};
    margin-bottom: 12px;
    font-family: "Courier New", Courier, monospace !important;
  }
`;

const ErrorDiv = styled.div`
  display: ${(props) => (props.visibility ? "flex" : "none")};
  padding: 8px;
  background-color: #f2dede;
  border-color: #ebccd1;
  span {
    margin-left: 8px;
  }
  svg {
    color: red;
  }
`;

const RunButton = styled.button`
  background-color: #00bae5;
  margin-top: 16px;
  min-height: 44px;
  padding: 8px 20px 8px 20px;
  border-radius: 40px;
  border: none;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    background-color: #05d0ff;
  }
  &:disabled {
    cursor: not-allowed;
  }
  p {
    display: inline;
  }
  span {
    white-space: nowrap;
  }
`;

//////////
// REACT
//////////

const Challenge = ({
  targetChallenge,
  getUserChallengeAction,
  runTestAction,
  userObj,
  setUserChallengeScoreAction,
  history,
}) => {
  const match = useRouteMatch();
  // Used to toggle display of the red Naming/Syntax error message
  const [getRunError, setRunError] = useState("");
  // Used in GenericDoneModal to change button text during request
  const [sendStatus, setSendStatus] = useState(false);
  // Used to manage displaying of the Submit Modal
  const [isModalDoneOpen, setModalDoneOpen] = useState(false);
  const ModalDoneOpenCloseHandler = () => {
    setModalDoneOpen(!isModalDoneOpen);
  };
  // Used to manage displaying of the Hint Tab
  const [isHintOpen, setHintOpen] = useState(false);
  const HintDoneOpenCloseHandler = () => {
    setHintOpen(!isHintOpen);
  };
  // Used to manage displaying of the spinner during code evaluation request
  const [isRunningCode, setRunningCode] = useState(false);
  // Used to determine which Question in the Challenge's Question array is currently displayed
  const [progressValue, setProgressValue] = useState(0);
  // Used to manage the time to be displayed on the Timer
  const [timerValue, setTimerValue] = useState(null);
  // Used to manage the local state of what is displayed inside the coding interface, as well as the boolean
  // results used to display Pass/Fail icons after a code evaluation request
  const [codeData, setCodeData] = useState({
    0: { code: "", status: { 0: null, 1: null, 2: null } },
    1: { code: "", status: { 0: null, 1: null, 2: null } },
    2: { code: "", status: { 0: null, 1: null, 2: null } },
    3: { code: "", status: { 0: null, 1: null, 2: null } },
    4: { code: "", status: { 0: null, 1: null, 2: null } },
    5: { code: "", status: { 0: null, 1: null, 2: null } },
  });
  // Used to manage the local state of the candidates score for each question
  const [score, setScore] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });
  // On page load looks at localStorage to see if data for the matching Challenge is stored there and sets it
  // in the codeData state if it is found. Prevents a candidate from loosing data they have entered and having
  // to restart a challenge over from the beginning
  useEffect(() => {
    let prevText = localStorage.getItem("challenge");
    prevText = JSON.parse(prevText);
    if (prevText && prevText.challenge === match.params.challengeId) {
      setCodeData(prevText.content);
      setScore(prevText.score);
    }
    // Fetches a candidates Challenge based on the Challenge Id in the Url
    const challengeStart = async () => {
      const [response, started] = await getUserChallengeAction(
        match.params.challengeId
      );
      if (response.status === 200) {
        // Sets the duration of the timer based on the initial value created when they clicked Start on the
        // myChallenge page
        const endTime = 1800000 + parseInt(started);
        const now = new Date();
        const timeLeft = endTime - now.getTime();
        timeLeft > 0 ? setTimerValue(timeLeft) : setTimerValue(1);
      }
    };
    challengeStart();
  }, [getUserChallengeAction, match.params.challengeId]);
  // Used by the Submit Code button during code evaluation request
  const runTestHandler = async (e) => {
    setRunError(null);
    setRunningCode(true);
    e.preventDefault();
    const testData = {
      code: codeData[progressValue].code,
      first_name: userObj.first_name,
      last_name: userObj.last_name,
      user_id: userObj.id,
    };
    const response = await runTestAction(
      targetChallenge.questions[progressValue].id,
      testData
    );
    if (response.status === 200) {
      if (response.data.asserts.length) {
        let newStatus = {};
        response.data.asserts.forEach(
          (test, index) => (newStatus[index] = test.ok)
        );
        setCodeData({
          ...codeData,
          [progressValue]: { ...codeData[progressValue], status: newStatus },
        });
        setScore({
          ...score,
          [progressValue]:
            targetChallenge.questions[progressValue].difficulty === "E"
              ? 3
              : targetChallenge.questions[progressValue].difficulty === "I"
              ? 5
              : 8,
        });
      } else {
        setRunError("Failed due to Naming/Syntax -- Try Again");
      }
    }
    if (response.status > "399") {
      setRunError("Server Error, contact administrator");
    }
    setRunningCode(false);
    // Updates the information in localStorage after each evaluation so the candidate does not loose
    // test results on leaving the challenge or refreshing the page
    localStorage.setItem(
      "challenge",
      JSON.stringify({
        challenge: match.params.challengeId,
        content: codeData,
        score: score,
      })
    );
  };
  // Calculates the Max possible Score of the challenge based on questions assigned to the Candidate
  const getMaxScore = () => {
    let perfectScore = 0;
    targetChallenge.questions.forEach(
      (question) =>
        (perfectScore +=
          question.difficulty === "E" ? 3 : question.difficulty === "I" ? 5 : 8)
    );
    return perfectScore;
  };
  // Used by the Done button and the Timer when reaching 0 during the Score Challenge request
  const doneHandler = async (e) => {
    setSendStatus(true);
    if (e) {
      e.preventDefault();
    }
    const candidateScore = {
      score: Math.round(
        (Object.values(score).reduce((a, b) => a + b) / getMaxScore()) * 100
      ),
    };
    const response = await setUserChallengeScoreAction(
      targetChallenge.id,
      candidateScore
    );
    setSendStatus(false);
    if (response.status === 200) {
      localStorage.removeItem("challenge");
      history.push("/finishedchallenge");
    }
  };

  return (
    <>
      <ChallengeContainer>
        <StyledResizeContainer>
          <DescriptionColumn defaultSize={700} minSize={400}>
            {targetChallenge ? (
              <>
                <DescriptionContainer>
                  <DescriptionHeader>
                    <ChallengeTitle>
                      {targetChallenge.questions[progressValue].name}
                    </ChallengeTitle>
                  </DescriptionHeader>
                  <DescriptionContent>
                    <div>
                      <p>
                        {targetChallenge.questions[progressValue].instructions}
                      </p>
                    </div>
                    {targetChallenge.questions[progressValue].fk_tip_question
                      .length > 0 ? (
                      <Hint
                        isHintOpen={isHintOpen}
                        HintDoneOpenCloseHandler={HintDoneOpenCloseHandler}
                        targetChallenge={targetChallenge}
                        progressValue={progressValue}
                      />
                    ) : null}
                  </DescriptionContent>
                </DescriptionContainer>
                <TestsContainer>
                  <TestsHeader>
                    <Styledh2>Tests</Styledh2>
                    <ErrorDiv visibility={getRunError}>
                      <FontAwesomeIcon icon={["fas", "exclamation-triangle"]} />
                      <Error errorMessage={getRunError} />
                    </ErrorDiv>
                  </TestsHeader>
                  <SmallCodeMirror
                    targetChallenge={targetChallenge}
                    progressValue={progressValue}
                    codeData={codeData}
                  />
                  {isRunningCode ? (
                    <RunButton onClick={runTestHandler} disabled>
                      <span>
                        <p>Run Code and Submit</p>
                        <GenericSpinnerSmall />
                      </span>
                    </RunButton>
                  ) : (
                    <RunButton onClick={runTestHandler}>
                      <div>
                        <p>Run Code and Submit</p>
                      </div>
                    </RunButton>
                  )}
                </TestsContainer>
              </>
            ) : null}
          </DescriptionColumn>
          <StyledResizeBar />
          <InputColumn minSize={400}>
            <LargeCodeMirror
              codeData={codeData}
              progressValue={progressValue}
              challengeId={match.params.challengeId}
              score={score}
              setCodeData={setCodeData}
            />
          </InputColumn>
        </StyledResizeContainer>
      </ChallengeContainer>
      <ChallengeFooter
        progressValue={progressValue}
        setProgressValue={setProgressValue}
        setHintOpen={setHintOpen}
        timerValue={timerValue}
        doneHandler={doneHandler}
        isModalDoneOpen={isModalDoneOpen}
        ModalDoneOpenCloseHandler={ModalDoneOpenCloseHandler}
        sendStatus={sendStatus}
        codeData={codeData}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    targetChallenge: state.challengeReducer.targetChallenge,
    userObj: state.authReducer.userObj,
  };
};

export default connect(mapStateToProps, {
  getUserChallengeAction,
  runTestAction,
  setUserChallengeScoreAction,
})(Challenge);
