import React, {useState} from "react";
import styled from "styled-components";
import {rem} from "polished";

import {BaseContainer, PageContainer} from "../../../style/GlobalWrappers";
import {Styledh1, Styledh2} from "../../../style/GlobalTitles";
import {BlueButton, RedButton} from "../../../style/GlobalButtons";

import {
    Container as ResizeContainer,
    Section,
    Bar,
} from "react-simple-resizer";

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
const Challenge = () => {
        const [progressValue, setProgressValue] = useState(1);

        const renderControlPanel = (progressValue) => {
            if (progressValue === 1) {
                return (<>
                        <div/>
                        <StepSelectorLine>
                            <StepSelectorContainer>
                                <StepSelectorBtnActive/>
                                <StepSelectorBtn/>
                                <StepSelectorBtn/>
                                <StepSelectorBtn/>
                                <StepSelectorBtn/>
                            </StepSelectorContainer>
                        </StepSelectorLine>
                        <PrevNextButton onClick={e => setProgressValue(2)}>Next</PrevNextButton> </>
                );
            }
            if (progressValue === 2) {
                return (<>
                        <PrevNextButton onClick={e => setProgressValue(1)}>Previous</PrevNextButton>
                        <StepSelectorLine>
                            <StepSelectorContainer>
                                <StepSelectorBtnActive/>
                                <StepSelectorBtnActive/>
                                <StepSelectorBtn/>
                                <StepSelectorBtn/>
                                <StepSelectorBtn/>
                            </StepSelectorContainer>
                        </StepSelectorLine>
                        <PrevNextButton onClick={e => setProgressValue(3)}>Next</PrevNextButton> </>
                )
            }
            if (progressValue === 3) {
                return (<>
                        <PrevNextButton onClick={e => setProgressValue(2)}>Previous</PrevNextButton>
                        <StepSelectorLine>
                            <StepSelectorContainer>
                                <StepSelectorBtnActive/>
                                <StepSelectorBtnActive/>
                                <StepSelectorBtnActive/>
                                <StepSelectorBtn/>
                                <StepSelectorBtn/>
                            </StepSelectorContainer>
                        </StepSelectorLine>
                        <PrevNextButton onClick={e => setProgressValue(4)}>Next</PrevNextButton> </>
                )
            }
            if (progressValue === 4) {
                return (<>
                        <PrevNextButton onClick={e => setProgressValue(3)}>Previous</PrevNextButton>
                        <StepSelectorLine>
                            <StepSelectorContainer>
                                <StepSelectorBtnActive/>
                                <StepSelectorBtnActive/>
                                <StepSelectorBtnActive/>
                                <StepSelectorBtnActive/>
                                <StepSelectorBtn/>
                            </StepSelectorContainer>
                        </StepSelectorLine>
                        <PrevNextButton onClick={e => setProgressValue(5)}>Next</PrevNextButton> </>
                )
            }
            return (<>
                    <PrevNextButton onClick={e => setProgressValue(4)}>Previous</PrevNextButton>
                    <StepSelectorLine>
                        <StepSelectorContainer>
                            <StepSelectorBtnActive/>
                            <StepSelectorBtnActive/>
                            <StepSelectorBtnActive/>
                            <StepSelectorBtnActive/>
                            <StepSelectorBtnActive/>
                        </StepSelectorContainer>
                    </StepSelectorLine>
                    <div/>
                </>
            )
        };

        return (
            <>
                <ChallengeContainer>
                    <StyledResizeContainer>
                        <DescriptionColumn>
                            <DescriptionContainer>
                                <DescriptionHeader>
                                    <div>
                                        <Styledh1>Challenge Title</Styledh1>
                                    </div>
                                    <div>
                                        <Styledh2>Nr. 3</Styledh2>
                                    </div>
                                </DescriptionHeader>
                                <div>
                                    <p>
                                        Contrary to popular belief, Lorem Ipsum is not simply random
                                        text. It has roots in a piece of classical Latin literature
                                        from 45 BC, making it over 2000 years old. Richard McClintock,
                                        a Latin professor at Hampden-Sydney College in Virginia,
                                        looked up one of the more obscure Latin words, consectetur,
                                        from a Lorem Ipsum passage, and going through the cites of the
                                        word in classical literature, discovered the undoubtable
                                        source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of
                                        "de Finibus Bonorum et Malorum" (The Extremes of Good and
                                        Evil) by Cicero, written in 45 BC. This book is a treatise on
                                        the theory of ethics, very popular during the Renaissance. The
                                        first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
                                        comes from a line in section 1.10.32. The standard chunk of
                                        Lorem Ipsum used since the 1500s is reproduced below for those
                                        interested. Sections 1.10.32 and 1.10.33 from "de Finibus
                                        Bonorum et Malorum" by Cicero are also reproduced in their
                                        exact original form, accompanied by English versions from the
                                        1914 translation by H. Rackham.
                                    </p>
                                </div>
                            </DescriptionContainer>
                        </DescriptionColumn>
                        <StyledResizeBar/>
                        <InputColumn>
                            <p></p>
                        </InputColumn>
                        <StyledResizeBar/>
                        <OutputColumn>
                            <p></p>
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
    }
;

export default Challenge;
