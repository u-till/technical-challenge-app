import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { rem } from "polished";
import { BaseContainer, PageContainer } from "../../../style/GlobalWrappers";
import { Styledh1, Styledh2 } from "../../../style/GlobalTitles";
import { BlueButton, RedButton } from "../../../style/GlobalButtons";
import {
  Container as ResizeContainer,
  Section,
  Bar,
} from "react-simple-resizer";
import { connect, useDispatch } from "react-redux";
import { getChallenge } from "../../../store/actions/challengeAction";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript.js";
import { getUserChallengeAction } from "../../../store/actions/challengeActions";
import { useRouteMatch } from "react-router-dom";

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
  width: 8px;
  background: #888888;
  cursor: col-resize;
`;

const DescriptionColumn = styled(Section)`
  background-color: #f2f2f2;
  overflow-y: auto !important;
  padding: 8px;
`;

const DescriptionContainer = styled(BaseContainer)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const DescriptionHeader = styled.div`
  height: 72px;
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

const InputColumn = styled(Section)`
  background-color: #fff;
`;

const OutputColumn = styled(Section)`
  background-color: #fff;
`;

/// Footer

const Footer = styled.div`
  width: 100%;
  height: 70px;
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
  margin: 0 30px 0 30px;
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
  width: 28px;
  height: 28px;
  border-radius: 100%;
  background-color: #fff;
  border: 3px solid #000;
  curson: pointer;
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
`;

const Timer = styled.div`
  margin: 0 16px 0 16px;
  p {
    font-size: 20px;
    font-weight: bold;
  }
`;

const DoneButton = styled(RedButton)``;

//////////
// REACT
//////////

const Challenge = ({targetChallenge, getUserChallengeAction}) => {
    const dispatch = useDispatch();
    const match = useRouteMatch();

    const [progressValue, setProgressValue] = useState(0);
    const [initDate, getInitDate] = useState(0);
    const [middleCodeMirror, setMiddleCodeMirror] = useState('');
    const [rightCodeMirror, setRightCodeMirror] = useState('');

    const calculateTimeLeft = () => {
        const dateNow = new Date();
        const databaseDate = new Date(String(initDate))
        let difference = dateNow - databaseDate;
        difference = 1800000 - difference
        if (difference > 0) {
            let timeLeft = `Time left: ${Math.floor((difference / 1000 / 60) % 60)}:${Math.floor((difference / 1000) % 60)}`;
            return timeLeft;
        }
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const startChallenge = async () => {
      const initDate = await dispatch(getChallenge());
      getInitDate(initDate);
    };

    startChallenge();

    const settimeout = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(settimeout);
  });

  useEffect(() => {
    getUserChallengeAction(match.params.challengeId);
  }, [getUserChallengeAction]);

  const options = {
    mode: "javascript",
    theme: "material",
    lineNumbers: true,
  };

  const renderControlPanel = (progressValue) => {
    if (progressValue === 0) {
      return (
        <>
          <PrevNextButtonDisabled>Previous</PrevNextButtonDisabled>
          <StepSelectorLine>
            <StepSelectorContainer>
              <StepSelectorBtnActive />
              <StepSelectorBtn />
              <StepSelectorBtn />
              <StepSelectorBtn />
              <StepSelectorBtn />
            </StepSelectorContainer>
          </StepSelectorLine>
          <PrevNextButton onClick={(e) => setProgressValue(1)}>
            Next
          </PrevNextButton>{" "}
        </>
      );
    }
    if (progressValue === 1) {
      return (
        <>
            <ChallengeContainer>
                <StyledResizeContainer>
                    <DescriptionColumn>
                        {targetChallenge ? (
                            <DescriptionContainer>
                                <DescriptionHeader>
                                    <div>
                                        <Styledh1>{targetChallenge.questions[progressValue].name}</Styledh1>
                                    </div>
                                </DescriptionHeader>
                                <div>
                                    <p>{targetChallenge.questions[progressValue].instructions}</p>
                                </div>
                            </DescriptionContainer>) : null}
                    </DescriptionColumn>
                    <StyledResizeBar/>
                    <InputColumn>
                        <CodeMirror
                            value={middleCodeMirror}
                            options={options}
                            onBeforeChange={(editor, data, value) => {
                                setMiddleCodeMirror(value)
                            }}
                            onChange={(editor, data, value) => {
                            }}
                        />
                    </InputColumn>
                    <StyledResizeBar/>
                    <OutputColumn>
                        {targetChallenge ? targetChallenge.questions[progressValue].tests_for_question.map(test =>
                            <p>{test}</p>) : null}

                    </OutputColumn>
                </StyledResizeContainer>
            </ChallengeContainer>
            <Footer>
                <FooterSectionLeft>
                    {renderControlPanel(progressValue)}
                </FooterSectionLeft>
                <FooterSectionRight>
                    <div>
                        {true ? timeLeft : "Time's up!"}
                    </div>
                    <DoneButton>Done!</DoneButton>
                </FooterSectionRight>
            </Footer>
        </>
      );
    }
    if (progressValue === 2) {
      return (
        <>
          <PrevNextButton onClick={(e) => setProgressValue(1)}>
            Previous
          </PrevNextButton>
          <StepSelectorLine>
            <StepSelectorContainer>
              <StepSelectorBtnActive />
              <StepSelectorBtnActive />
              <StepSelectorBtnActive />
              <StepSelectorBtn />
              <StepSelectorBtn />
            </StepSelectorContainer>
          </StepSelectorLine>
          <PrevNextButton onClick={(e) => setProgressValue(3)}>
            Next
          </PrevNextButton>{" "}
        </>
      );
    }
    if (progressValue === 3) {
      return (
        <>
          <PrevNextButton onClick={(e) => setProgressValue(2)}>
            Previous
          </PrevNextButton>
          <StepSelectorLine>
            <StepSelectorContainer>
              <StepSelectorBtnActive />
              <StepSelectorBtnActive />
              <StepSelectorBtnActive />
              <StepSelectorBtnActive />
              <StepSelectorBtn />
            </StepSelectorContainer>
          </StepSelectorLine>
          <PrevNextButton onClick={(e) => setProgressValue(4)}>
            Next
          </PrevNextButton>{" "}
        </>
      );
    }
    return (
      <>
        <PrevNextButton onClick={(e) => setProgressValue(3)}>
          Previous
        </PrevNextButton>
        <StepSelectorLine>
          <StepSelectorContainer>
            <StepSelectorBtnActive />
            <StepSelectorBtnActive />
            <StepSelectorBtnActive />
            <StepSelectorBtnActive />
            <StepSelectorBtnActive />
          </StepSelectorContainer>
        </StepSelectorLine>
        <PrevNextButtonDisabled>Next</PrevNextButtonDisabled>
        <div />
      </>
    );
  };

  return (
    <>
      <ChallengeContainer>
        <StyledResizeContainer>
          <DescriptionColumn>
            {targetChallenge ? (
              <DescriptionContainer>
                <DescriptionHeader>
                  <div>
                    <Styledh1>
                      {targetChallenge.questions[progressValue].name}
                    </Styledh1>
                  </div>
                </DescriptionHeader>
                <div>
                  <p>{targetChallenge.questions[progressValue].instructions}</p>
                </div>
              </DescriptionContainer>
            ) : null}
          </DescriptionColumn>
          <StyledResizeBar />
          <InputColumn>
            <CodeMirror
              value={middleCodeMirror}
              options={options}
              onBeforeChange={(editor, data, value) => {
                setMiddleCodeMirror(value);
              }}
              onChange={(editor, data, value) => {}}
            />
          </InputColumn>
          <StyledResizeBar />
          <OutputColumn>
            {targetChallenge
              ? targetChallenge.questions[
                  progressValue
                ].tests_for_question.map((test) => <p>{test}</p>)
              : null}
          </OutputColumn>
        </StyledResizeContainer>
      </ChallengeContainer>
      <Footer>
        <FooterSectionLeft>
          {renderControlPanel(progressValue)}
        </FooterSectionLeft>
        <FooterSectionRight>
          <Timer>
            <p>Time left: 24:05</p>
          </Timer>
          <DoneButton>Done!</DoneButton>
        </FooterSectionRight>
      </Footer>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    targetChallenge: state.challengeReducer.targetChallenge,
  };
};

export default connect(mapStateToProps, { getUserChallengeAction })(Challenge);
