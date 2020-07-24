import React from "react";
import styled from "styled-components";
import Error from "../../../Shared/Error";
import {BlueButton, RedButton, RoundGreyButton} from "../../../../style/GlobalButtons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import TipAddModal from "../../../Shared/Modals/TipAddModal/TipAddModal";
import {GenericSpinner} from "../../../Shared/GenericSpinner";
import GenericTipCard from "../../../Shared/GenericCards/GenericTipCard";
import GenericDeleteModal from "../../../Shared/Modals/GenericDeleteModal/GenericDeleteModal";
import {rem} from "polished";
import {BaseInput, BaseTextArea} from "../../../../style/GlobalInputs";

//////////
// STYLE
//////////

const EditTop = styled.div`
  display: inline-flex;
  padding-bottom: 16px;
  width: 100%;
  height: 15%;
  justify-content: space-between;
  > div:first-child {
    width: 56%;
    margin-right: 12px;
  }
  > div:last-child {
    width: 30%;
    margin-left: 12px;
  }
  > div {
    width: ${rem("120px")};
  }
`;

const InputLabelDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
`;

const StyledLabel = styled.label`
  font-weight: bold;
  margin-bottom: 8px;
`;

const NameInput = styled(BaseInput)`
  width: 100%;
  height: ${rem("6px")};
`;

const NumberInput = styled(BaseInput)`
  width: 100%;
  height: ${rem("6px")};
`;

const DifficultyDropdown = styled.select`
  background: #ffffff;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 5px;
  height: ${rem("38px")};
  width: 100%;

  &:focus {
    outline: none;
  }
`;

const EditMiddle = styled.div`
  display: inline-flex;
  padding-bottom: 16px;

  width: 100%;
  height: 35%;
  justify-content: space-between;
  > div:first-child {
    width: 70%;
    margin-right: 12px;
  }
  > div:last-child {
    width: 30%;
  }
`;

const DescriptionInput = styled(BaseTextArea)`
  width: 100%;
  resize: none;
  height: 100%;
  font-size: ${rem("16px")};
`;

const CategorySelect = styled.select`
  background: #ffffff;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 5px;
  height: 100%;
  &:focus {
    outline: none;
  }
  option {
    padding: 8px;
  }
`;

const EditBottom = styled.div`
  display: inline-flex;
  padding-bottom: 16px;

  width: 100%;
  height: 40%;
  justify-content: space-between;
  > div:first-child {
    width: 30%;
    margin-right: 12px;
  }
  > div:last-child {
    width: 70%;
  }
`;

const TestInputContainer = styled.div`
  height: 80%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const TestInput = styled(BaseInput)`
  font-size: ${rem("16px")};
  width: 100%;
  height: ${rem("6px")};
`;

const LabelAndBtn = styled.div`
  display: flex;
  justify-content: space-between;
  > div:nth-child(2) {
    margin-top: -12px;
  }
`;

const TipsList = styled.div`
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 5px;
  overflow-y: scroll;
  padding: 8px;
  height: 100%;
`;

const DeleteSave = styled.div`
  display: flex;
  justify-content: space-between;
  > div:last-child {
    display: flex;
    justify-content: space-between;
    width: ${rem("180px")};
  }
`;

//////////
// REACT
//////////

const EditQuestion = ({
                          questionData,
                          handleTextInput,
                          fieldErrors,
                          handleProgramSelectorChange,
                          handleTestsChange,
                          ModalTipAddOpenCloseHandler,
                          isModalTipAddOpen,
                          targetQuestion,
                          targetQuestionTips,
                          ModalDeleteOpenCloseHandler,
                          isModalDeleteOpen,
                          setQuestionData,
                          handleSave,
                          handleCancel
                      }) => {
    return (<>
            <EditTop>
                <InputLabelDiv>
                    <StyledLabel>Name:</StyledLabel>
                    <NameInput
                        type="text"
                        placeholder="Question Name"
                        required
                        name="name"
                        value={questionData.name}
                        onChange={handleTextInput}
                    />
                    <Error errorMessage={fieldErrors["name"]}/>
                </InputLabelDiv>
                <InputLabelDiv>
                    <StyledLabel>Points:</StyledLabel>
                    <NumberInput
                        type="text"
                        placeholder="0"
                        required
                        value={
                            questionData.difficulty === "H"
                                ? "8"
                                : questionData.difficulty === "I"
                                ? "5"
                                : "3"
                        }
                        disabled
                    />
                    <Error/>
                </InputLabelDiv>
                <InputLabelDiv>
                    <StyledLabel>Difficulty:</StyledLabel>
                    <DifficultyDropdown
                        id="difficulty"
                        value={questionData.difficulty}
                        onChange={handleTextInput}
                        name="difficulty"
                    >
                        <option value="E">Easy</option>
                        <option value="I">Intermediate</option>
                        <option value="H">Hard</option>
                    </DifficultyDropdown>
                    <Error/>
                </InputLabelDiv>
            </EditTop>
            <EditMiddle>
                <InputLabelDiv>
                    <StyledLabel>Description:</StyledLabel>
                    <DescriptionInput
                        type="text"
                        placeholder="Description"
                        required
                        name="instructions"
                        value={questionData.instructions}
                        onChange={handleTextInput}
                    />
                    <Error errorMessage={fieldErrors["instructions"]}/>
                </InputLabelDiv>
                <InputLabelDiv>
                    <StyledLabel>Catergories:</StyledLabel>
                    <CategorySelect
                        name="program"
                        multiple
                        value={questionData.program}
                        onChange={handleProgramSelectorChange}
                    >
                        <option value="1">Full Stack</option>
                        <option value="2">Data Science</option>
                        <option value="3">React & Redux</option>
                        <option value="4">Docker & Deployment</option>
                        <option value="5">AI for Leaders</option>
                        <option value="6">Python programming</option>
                    </CategorySelect>
                    <Error errorMessage={fieldErrors["program"]}/>
                </InputLabelDiv>
            </EditMiddle>
            <EditBottom>
                <InputLabelDiv>
                    <StyledLabel>Test Case Examples:</StyledLabel>
                    <TestInputContainer>
                        {questionData.tests_for_question
                            ? questionData.tests_for_question.map((test, index) => {
                                return (
                                    <TestInput
                                        type="text"
                                        index={index}
                                        value={questionData.tests_for_question[index]}
                                        key={`test_for_question ${index}`}
                                        onChange={(e) => handleTestsChange(e, index)}
                                    />
                                );
                            })
                            : null}
                    </TestInputContainer>
                </InputLabelDiv>
                <InputLabelDiv>
                    <LabelAndBtn>
                        <StyledLabel>Tips:</StyledLabel>
                        <RoundGreyButton onClick={ModalTipAddOpenCloseHandler}>
                            <FontAwesomeIcon icon={["fas", "plus"]}/>
                        </RoundGreyButton>
                        {isModalTipAddOpen ? (
                            <TipAddModal
                                ModalTipAddOpenCloseHandler={
                                    ModalTipAddOpenCloseHandler
                                }
                                questionId={targetQuestion.id}
                            />
                        ) : null}
                    </LabelAndBtn>
                    <TipsList>
                        {targetQuestionTips === null ? (
                            <GenericSpinner/>
                        ) : targetQuestionTips.length > 0 ? (
                            targetQuestionTips.map((tip) => {
                                return (
                                    <GenericTipCard
                                        key={`Tip ${tip.id}`}
                                        tip={tip}
                                        questionId={targetQuestion.id}
                                    />
                                );
                            })
                        ) : (
                            <div>No Tips to Display</div>
                        )}
                    </TipsList>
                </InputLabelDiv>
            </EditBottom>
            <DeleteSave>
                <RedButton onClick={ModalDeleteOpenCloseHandler}>
                    Delete
                </RedButton>
                {isModalDeleteOpen ? (
                    <GenericDeleteModal
                        ModalDeleteOpenCloseHandler={ModalDeleteOpenCloseHandler}
                        type="questions"
                        typeId={questionData.id}
                        setQuestionData={setQuestionData}
                    >
                        <p>
                            Are you sure you want to delete the Question "
                            {questionData.name}"?
                        </p>
                    </GenericDeleteModal>
                ) : null}
                <div>
                    <BlueButton onClick={handleCancel}>Cancel</BlueButton>
                    <BlueButton onClick={handleSave}>Save</BlueButton>
                </div>
            </DeleteSave>
        </>
    )
};

export default EditQuestion