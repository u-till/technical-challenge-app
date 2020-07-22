import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { rem } from "polished";
import { BaseContainer } from "../../../style/GlobalWrappers";
import { Styledh1, Styledh2 } from "../../../style/GlobalTitles";
import { BlueButton, RedButton } from "../../../style/GlobalButtons";
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
import {getUserChallengeAction, setUserChallengeScoreAction} from "../../../store/actions/challengeActions";
import { useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {runTestAction} from "../../../store/actions/testActions";

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
  width: ${rem('8px')};
  background: #888888;
  cursor: col-resize;
`;

const DescriptionColumn = styled(Section)`
  background-color: #f2f2f2;
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
  font-size: ${rem('40px')};
  font-weight: bold;
`;

const DescriptionContent = styled.div`
  overflow-y: auto;
`;

const InputColumn = styled(Section)`
  background-color: #fff;
`;

const TestsContainer = styled(BaseContainer)`
  height: ${rem('200px')};
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
`;

const RunButton = styled(BlueButton)`
  margin-top: 16px;
  margin-bottom: 16px;
`;

/// Footer

const Footer = styled.div`
  width: 100%;
  height: ${rem('70px')};
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
  margin: 0 ${rem('30px')} 0 ${rem('30px')};
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
  width: ${rem('28px')};
  height: ${rem('28px')};
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
`;

const Timer = styled.div`
  margin: 0 16px 0 16px;
  p {
    font-size: ${rem('20px')};
    font-weight: bold;
  }
`;

/// Codemirror

const StyledCodeMirror = styled(CodeMirror)`
  height: 100%;

  > div {
    height: 100%;
  }
`;

const StyledSmallCodeMirror = styled(CodeMirror)`
  height: ${rem('32px')};
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
  font-size: ${rem('22px')};
  color: #018601;
  border-radius: 50%;
  border: 1px solid white;
  background-color: white;
`;

const FontAwesomeIconFail = styled(FontAwesomeIcon)`
  font-size: ${rem('22px')};
  color: #ef485c;
  border-radius: 50%;
  border: 1px solid white;
  background-color: white;
`;

const DoneButton = styled(RedButton)``;

//////////
// REACT
//////////

const Challenge = ({targetChallenge, getUserChallengeAction, runTestAction, userObj, setUserChallengeScoreAction, history}) => {
    // const dispatch = useDispatch();
    const match = useRouteMatch();

    const [progressValue, setProgressValue] = useState(0);
    // const [initDate, getInitDate] = useState(0);
    const [codeData, setCodeData] = useState({
        0: {code: 'function addition(number) {\n' +
                ' return number + 1 \n' +
                '}', status: {0: null, 1: null, 2: null}},
        1: {code: 'function addUp(x) {\n' +
                '   let result = 0;\n' +
                '   for (let i = 1; i <= x; i++) {\n' +
                '      result += i\n' +
                '   }\n' +
                '   return result\n' +
                '}', status: {0: null, 1: null, 2: null}},
        2: {code: 'function countVowels(string) {\n' +
                '   let result = 0;\n' +
                '   let vowels = [\'a\', \'e\', \'i\', \'o\', \'u\']\n' +
                '   string.split(\'\').map(index => {\n' +
                '       if (vowels.includes(index)) {\n' +
                '            result++\n' +
                '       }\n' +
                '   })\n' +
                '   return result;\n' +
                '}', status: {0: null, 1: null, 2: null}},
        3: {code: 'function charCount(char, string) {\n' +
                '   return string.split(\'\').filter(index => index === char).length}\n', status: {0: null, 1: null, 2: null}},
        4: {code: 'function reverseString(string) { return string.split(\'\').reverse().join(\'\') }', status: {0: null, 1: null, 2: null}},
        5: {code: 'function firstElement(array) { return array[0] }', status: {0: null, 1: null, 2: null}}
    });


    const [score, setScore] = useState({
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
    });

    // const calculateTimeLeft = () => {
    //     const dateNow = new Date();
    //     const databaseDate = new Date(String(initDate));
    //     let difference = dateNow - databaseDate;
    //     difference = 1800000 - difference;
    //     if (difference > 0) {
    //         let timeLeft = `Time left: ${Math.floor(
    //         (difference / 1000 / 60) % 60
    //         )}:${Math.floor((difference / 1000) % 60)}`;
    //     return timeLeft;
    //     }
    // };

    // const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    //
    // useEffect(() => {
    //     const startChallenge = async () => {
    //         const initDate = await dispatch(getChallenge());
    //         getInitDate(initDate);
    //     };
    //
    //     startChallenge();
    //
    //     const settimeout = setTimeout(() => {
    //         setTimeLeft(calculateTimeLeft());
    //     }, 1000);
    //
    //     return () => clearInterval(settimeout);
    // });

    useEffect(() => {
        getUserChallengeAction(match.params.challengeId);
    }, [getUserChallengeAction, match.params.challengeId]);

    const options = {
        mode: "javascript",
        theme: "material",
        lineNumbers: true,
    };

    const runTestHandler = async (e) => {
        e.preventDefault();
        const testData = {
            "code": codeData[progressValue].code,
            "first_name": userObj.first_name,
            "last_name": userObj.last_name,
            "user_id": userObj.id
        };
        const response = await runTestAction(targetChallenge.questions[progressValue].id, testData);
        if (response.status === 200) {
            if (response.data.asserts.length) {
                let newStatus = {};
                response.data.asserts.forEach((test, index) => newStatus[index] = test.ok);
                setCodeData({...codeData, [progressValue]: {...codeData[progressValue], status: newStatus}});
                setScore({...score, [progressValue]: targetChallenge.questions[progressValue].difficulty === "E" ? 3 : targetChallenge.questions[progressValue].difficulty === "I" ? 5 : 8})
            } else {
                console.log('Tests Failed due to Syntax problems')

            }
        }
    };

    const getMaxScore = () => {
        let perfectScore = 0;
        targetChallenge.questions.forEach(question => perfectScore += question.difficulty === "E" ? 3 : question.difficulty === "I" ? 5 : 8)
        return perfectScore
    };

    const doneHandler = async (e) => {
        e.preventDefault();
        const candidateScore = {
            "score": (Object.values(score).reduce((a, b) => a + b) / getMaxScore()) * 100
        };
        const response = await setUserChallengeScoreAction(targetChallenge.id, candidateScore);
        if (response.status === 200) {
            history.push(`/finishedchallenge/${targetChallenge.id}`)
        }
    };

    const renderControlPanelV2 = (progressValue) => {
        return (
            <>
                {progressValue === 0 ? <PrevNextButtonDisabled>Previous</PrevNextButtonDisabled> : <PrevNextButton onClick={(e) => setProgressValue(progressValue - 1)}>Previous</PrevNextButton>}
                <StepSelectorLine>
                    <StepSelectorContainer>
                        {[...renderCenter(progressValue)]}
                    </StepSelectorContainer>
                </StepSelectorLine>
                {progressValue === 5 ? <PrevNextButtonDisabled>Next</PrevNextButtonDisabled> : <PrevNextButton onClick={(e) => setProgressValue(progressValue + 1)}>Next</PrevNextButton>}
            </>
        )
    };

    function renderCenter(progressValue) {
        let result = [];
        for (let i = 0; i < 6; i++) {
            if (i <= progressValue) {
                result.push(<StepSelectorBtnActive key={`button ${i}`}/>)
            } else {
                result.push(<StepSelectorBtn key={`button ${i}`}/>)
            }
        }
        return result
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
                                    </TestsHeader>
                                    <SmallCodeMirrorWrapper>
                                        {targetChallenge.questions[progressValue].tests_for_question.map((test, index) =>
                                            (<div key={`test ${index}`}>
                                                <StyledSmallCodeMirror
                                                    value={test}
                                                    options={{
                                                        mode: "javascript",
                                                        theme: "material",
                                                        lineNumbers: true,
                                                        firstLineNumber: index + 1,
                                                    }}
                                                    onChange={(editor, data, value) => {
                                                    }}
                                                />
                                                {codeData[progressValue].status[index] === null ? null : codeData[progressValue].status[index] ?
                                                    <FontAwesomeIconSuccess icon={["fas", "check-circle"]}/> :
                                                    <FontAwesomeIconFail icon={["fas", "times-circle"]}/>}
                                            </div>)
                                        )}
                                    </SmallCodeMirrorWrapper>
                                    <RunButton onClick={runTestHandler}>Run Code and Submit</RunButton>
                                </TestsContainer>
                            </>
                        ) : null}
                    </DescriptionColumn>
                    <StyledResizeBar/>
                    <InputColumn>
                        <StyledCodeMirror
                            value={codeData[progressValue].code}
                            options={options}
                            onBeforeChange={(editor, data, value) => {
                                setCodeData({...codeData, [progressValue]: {...codeData[progressValue], code: value}});
                            }}
                            onChange={(editor, data, value) => {
                            }}
                        />
                    </InputColumn>
                </StyledResizeContainer>
            </ChallengeContainer>
            <Footer>
                <FooterSectionLeft>
                    {renderControlPanelV2(progressValue)}
                </FooterSectionLeft>
                <FooterSectionRight>
                    <Timer>
                        <p>Time left: 24:05</p>
                    </Timer>
                    <DoneButton onClick={doneHandler}>Done!</DoneButton>
                </FooterSectionRight>
            </Footer>
        </>
    );
};  

const mapStateToProps = (state) => {
  return {
    targetChallenge: state.challengeReducer.targetChallenge,
    userObj: state.authReducer.userObj
  };
};

export default connect(mapStateToProps, { getUserChallengeAction, runTestAction, setUserChallengeScoreAction })(Challenge);
