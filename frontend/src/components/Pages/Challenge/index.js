import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { rem } from "polished";
import { BaseContainer } from "../../../style/GlobalWrappers";
import { Styledh1, Styledh2 } from "../../../style/GlobalTitles";
import {
  BlueButton,
  RedButton,
  RoundGreyButton,
} from "../../../style/GlobalButtons";
import {
  Container as ResizeContainer,
  Section,
  Bar,
} from "react-simple-resizer";
import { connect } from "react-redux";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript.js";
import {
  getUserChallengeAction,
  setUserChallengeScoreAction,
} from "../../../store/actions/challengeActions";
import { useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { runTestAction } from "../../../store/actions/testActions";
import Error from "../../Shared/Error";
import { GenericSpinnerSmall } from "../../Shared/GenericSpinner";
import Timer from "react-compound-timer";
import GenericDeleteModal from "../../Shared/Modals/GenericDeleteModal/GenericDeleteModal";
import GenericDoneModal from "../../Shared/Modals/GenericDoneModal/GenericDoneModal";

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
  overflow-y: auto;
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

/// Footer

const Footer = styled.div`
  width: 100%;
  height: ${rem("70px")};
  padding: 0 ${rem("30px")} 0 ${rem("30px")};

  display: flex;
  position: fixed;
  bottom: 0;
  z-index: 1000;
  background-color: white;
  justify-content: space-between;
  flex-direction: row;
  border-top: solid 1px #dddddd;
`;

///Footer Left
const FooterSectionLeft = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 48%;
`;

const PrevNextButton = styled(BlueButton)``;
const PrevNextButtonDisabled = styled(BlueButton)`
  cursor: not-allowed;
`;

const StepSelectorContainer = styled.div`
  width: 100%;
  min-width: 400px;
  display: flex;
  justify-content: space-between;
  //
`;

const StepSelectorLine = styled.div`
  width: 100%;
  min-width: 400px;
  margin: 0 ${rem("30px")} 0 ${rem("30px")};
  position: relative;
  z-index: 1;

  &:before {
    border-top: 5px solid #000;
    content: "";

    margin: 0 auto; /* this centers the line to the full width specified */
    position: absolute; /* positioning must be absolute here, and relative positioning must be applied to the parent */
    top: 42%;
    left: 0;
    right: 0;
    bottom: 0;
    width: 95%;
    z-index: -1;
  }

  span {
    /* to hide the lines from behind the text, you have to set the background color the same as the container */
    background: #fff;
    padding: 0 15px;
  }
`;

const StepSelectorBtn = styled.button`
  width: ${rem("28px")};
  height: ${rem("28px")};
  border-radius: 100%;
  background-color: #fff;
  border: 3px solid #000;
  cursor: pointer;
  :hover {
    background-color: #05d0ff;
  }
`;

const StepSelectorBtnActive = styled(StepSelectorBtn)`
  background-color: #00bae5;
  :hover {
    background-color: #05d0ff;
  }
`;

///Footer Right
const FooterSectionRight = styled.div`
  min-width: 20%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    font-size: 24px;
    padding-left: 12px;
  }
  div {
    display: flex;
  }
`;

/// Codemirror

const StyledCodeMirror = styled(CodeMirror)`
  * {
    font-size: 18px;
    font-family: "Courier New", Courier, monospace !important;
  }
  height: 100%;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.4);
  > div {
    height: 100%;
  }
`;

const StyledSmallCodeMirror = styled(CodeMirror)`
  * {
    font-size: 18px;
    font-family: "Courier New", Courier, monospace !important;
  }
  height: ${rem("32px")};
  > div {
    height: 100%;
  }
`;

const SmallCodeMirrorWrapper = styled.div`
  background-color: #263238;
  height: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  padding-right: 16px;
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const FontAwesomeIconSuccess = styled(FontAwesomeIcon)`
  font-size: ${rem("22px")};
  color: #018601;
  border-radius: 50%;
  border: 1px solid white;
  background-color: white;
`;

const FontAwesomeIconFail = styled(FontAwesomeIcon)`
  font-size: ${rem("22px")};
  color: #ef485c;
  border-radius: 50%;
  border: 1px solid white;
  background-color: white;
`;

const CodeMirrorWrapper = styled.div`
  height: 100%;
  border-radius: 5px;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
`;

const DoneButton = styled(RedButton)``;

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
  const [getRunError, setRunError] = useState(
    "Server Error, contact administrator"
  );

  const [isModalDoneOpen, setModalDoneOpen] = useState(false);

  const ModalDoneOpenCloseHandler = () => {
    setModalDoneOpen(!isModalDoneOpen);
  };

  const [isRunningCode, setRunningCode] = useState(false);
  const [timerValue, setTimerValue] = useState(null);
  const [progressValue, setProgressValue] = useState(0);
  const [codeData, setCodeData] = useState({
    0: { code: "", status: { 0: null, 1: null, 2: null } },
    1: { code: "", status: { 0: null, 1: null, 2: null } },
    2: { code: "", status: { 0: null, 1: null, 2: null } },
    3: { code: "", status: { 0: null, 1: null, 2: null } },
    4: { code: "", status: { 0: null, 1: null, 2: null } },
    5: { code: "", status: { 0: null, 1: null, 2: null } },
  });

  const [score, setScore] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });

  useEffect(() => {
    let prevText = localStorage.getItem("challenge");
    prevText = JSON.parse(prevText);
    if (prevText && prevText.challenge === match.params.challengeId) {
      setCodeData(prevText.content);
      setScore(prevText.score);
    }
    const challengeStart = async () => {
      const [response, started] = await getUserChallengeAction(
        match.params.challengeId
      );
      if (response.status === 200) {
        const endTime = 1800000 + parseInt(started);
        const now = new Date();
        const timeLeft = endTime - now.getTime();
        timeLeft > 0 ? setTimerValue(timeLeft) : setTimerValue(1);
      }
    };
    challengeStart();
  }, [getUserChallengeAction, match.params.challengeId]);

  const options = {
    mode: "javascript",
    theme: "material",
    lineNumbers: true,
  };

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
    localStorage.setItem(
      "challenge",
      JSON.stringify({
        challenge: match.params.challengeId,
        content: codeData,
        score: score,
      })
    );
  };

  const getMaxScore = () => {
    let perfectScore = 0;
    targetChallenge.questions.forEach(
      (question) =>
        (perfectScore +=
          question.difficulty === "E" ? 3 : question.difficulty === "I" ? 5 : 8)
    );
    return perfectScore;
  };

  const doneHandler = async (e) => {
    if (e) {
      e.preventDefault();
    }
    const candidateScore = {
      score:
        (Object.values(score).reduce((a, b) => a + b) / getMaxScore()) * 100,
    };
    const response = await setUserChallengeScoreAction(
      targetChallenge.id,
      candidateScore
    );
    if (response.status === 200) {
      localStorage.removeItem("challenge");
      history.push("/finishedchallenge");
    }
  };

  const renderControlPanelV2 = (progressValue) => {
    return (
      <>
        {progressValue === 0 ? (
          <PrevNextButtonDisabled>Previous</PrevNextButtonDisabled>
        ) : (
          <PrevNextButton onClick={(e) => setProgressValue(progressValue - 1)}>
            Previous
          </PrevNextButton>
        )}
        <StepSelectorLine>
          <StepSelectorContainer>
            {[...renderCenter(progressValue)]}
          </StepSelectorContainer>
        </StepSelectorLine>
        {progressValue === 5 ? (
          <PrevNextButtonDisabled>Next</PrevNextButtonDisabled>
        ) : (
          <PrevNextButton onClick={(e) => setProgressValue(progressValue + 1)}>
            Next
          </PrevNextButton>
        )}
      </>
    );
  };

  function renderCenter(progressValue) {
    let result = [];
    for (let i = 0; i < 6; i++) {
      if (i <= progressValue) {
        result.push(<StepSelectorBtnActive key={`button ${i}`} />);
      } else {
        result.push(<StepSelectorBtn key={`button ${i}`} />);
      }
    }
    return result;
  }

  return (
    <>
      <ChallengeContainer>
        <StyledResizeContainer>
          <DescriptionColumn defaultSize={600} minSize={400}>
            {targetChallenge ? (
              <>
                <DescriptionContainer>
                  <DescriptionHeader>
                    <ChallengeTitle>
                      {targetChallenge.questions[progressValue].name}
                    </ChallengeTitle>
                  </DescriptionHeader>
                  <DescriptionContent>
                    <p>
                      {targetChallenge.questions[progressValue].instructions}
                    </p>
                  </DescriptionContent>
                </DescriptionContainer>
                <TestsContainer>
                  <TestsHeader>
                    <Styledh2>Tests</Styledh2>
                    <ErrorDiv>
                      <FontAwesomeIcon icon={["fas", "exclamation-triangle"]} />
                      <Error errorMessage={getRunError} />
                    </ErrorDiv>
                  </TestsHeader>
                  <SmallCodeMirrorWrapper>
                    {targetChallenge.questions[
                      progressValue
                    ].tests_for_question.map((test, index) => (
                      <div key={`test ${index}`}>
                        <StyledSmallCodeMirror
                          value={test}
                          options={{
                            mode: "javascript",
                            theme: "material",
                            lineNumbers: true,
                            firstLineNumber: index + 1,
                          }}
                          onChange={(editor, data, value) => {}}
                        />
                        {codeData[progressValue].status[index] ===
                        null ? null : codeData[progressValue].status[index] ? (
                          <FontAwesomeIconSuccess
                            icon={["fas", "check-circle"]}
                          />
                        ) : (
                          <FontAwesomeIconFail icon={["fas", "times-circle"]} />
                        )}
                      </div>
                    ))}
                  </SmallCodeMirrorWrapper>
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
            <CodeMirrorWrapper>
              <StyledCodeMirror
                value={codeData[progressValue].code}
                options={options}
                onBeforeChange={(editor, data, value) => {
                  setCodeData({
                    ...codeData,
                    [progressValue]: {
                      ...codeData[progressValue],
                      code: value,
                    },
                  });
                }}
                onChange={(editor, data, value) => {
                  localStorage.setItem(
                    "challenge",
                    JSON.stringify({
                      challenge: match.params.challengeId,
                      content: codeData,
                      score: score,
                    })
                  );
                }}
              />
            </CodeMirrorWrapper>
          </InputColumn>
        </StyledResizeContainer>
      </ChallengeContainer>
      <Footer>
        <FooterSectionLeft>
          {renderControlPanelV2(progressValue)}
        </FooterSectionLeft>
        <FooterSectionRight>
          <div>
            <p>
              <FontAwesomeIcon icon={["fas", "hourglass-half"]} />
            </p>
            {timerValue ? (
              <Timer
                initialTime={timerValue}
                direction="backward"
                checkpoints={[
                  {
                    time: 0,
                    callback: () => doneHandler(),
                  },
                ]}
              >
                {() => (
                  <React.Fragment>
                    <p>
                      <Timer.Minutes />:
                      <Timer.Seconds
                        formatValue={(value) =>
                          `${value < 10 ? `0${value}` : value}`
                        }
                      />
                    </p>
                  </React.Fragment>
                )}
              </Timer>
            ) : null}
          </div>
          <DoneButton onClick={ModalDoneOpenCloseHandler}>Finish!</DoneButton>

          {isModalDoneOpen ? (
            <GenericDoneModal
              ModalDoneOpenCloseHandler={ModalDoneOpenCloseHandler}
              doneHandler={doneHandler}
            />
          ) : null}
        </FooterSectionRight>
      </Footer>
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
