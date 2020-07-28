import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ChallengeTimer from "../Timer";
import GenericDoneModal from "../../../Shared/Modals/GenericDoneModal/GenericDoneModal";
import React from "react";
import styled from "styled-components";
import {BlueButton, RedButton} from "../../../../style/GlobalButtons";
import {rem} from "polished";

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

const DoneButton = styled(RedButton)``;

const ChallengeFooter = ({progressValue, setProgressValue, setHintOpen, timerValue, doneHandler, isModalDoneOpen, ModalDoneOpenCloseHandler, sendStatus}) => {

    const renderControlPanelV2 = (progressValue) => {
        return (
            <>
                {progressValue === 0 ? (
                    <PrevNextButtonDisabled>Previous</PrevNextButtonDisabled>
                ) : (
                    <PrevNextButton onClick={previousButtonHandler}>
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
                    <PrevNextButton onClick={nextButtonHandler}>Next</PrevNextButton>
                )}
            </>
        );
    };

    function renderCenter(progressValue) {
        let result = [];
        for (let i = 0; i < 6; i++) {
            if (i <= progressValue) {
                result.push(<StepSelectorBtnActive key={`button ${i}`}/>);
            } else {
                result.push(<StepSelectorBtn key={`button ${i}`}/>);
            }
        }
        return result;
    }

    const previousButtonHandler = (e) => {
        e.preventDefault();
        setProgressValue(progressValue - 1);
        setHintOpen(false);
    };

    const nextButtonHandler = (e) => {
        e.preventDefault();
        setProgressValue(progressValue + 1);
        setHintOpen(false);
    };

    return (
        <Footer>
            <FooterSectionLeft>
                {renderControlPanelV2(progressValue)}
            </FooterSectionLeft>
            <FooterSectionRight>
                <div>
                    <p>
                        <FontAwesomeIcon icon={["fas", "hourglass-half"]}/>
                    </p>
                    {timerValue ? (
                        <ChallengeTimer timerValue={timerValue} doneHandler={doneHandler}/>) : null}
                </div>
                <DoneButton onClick={ModalDoneOpenCloseHandler}>Finish!</DoneButton>
                {isModalDoneOpen ? (
                    <GenericDoneModal
                        ModalDoneOpenCloseHandler={ModalDoneOpenCloseHandler}
                        doneHandler={doneHandler}
                        sendStatus={sendStatus}
                    />
                ) : null}
            </FooterSectionRight>
        </Footer>)
};

export default ChallengeFooter