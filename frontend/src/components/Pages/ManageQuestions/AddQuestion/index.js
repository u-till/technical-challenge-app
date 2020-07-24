import React from "react";
import styled from "styled-components";
import Error from "../../../Shared/Error";
import {BlueButton} from "../../../../style/GlobalButtons";
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

const EditMiddleBig = styled.div`
  display: inline-flex;
  padding-bottom: 16px;

  width: 100%;
  height: 40%;
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

const TestInputContainerAdd = styled.div`
  height: 30%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const TestInput = styled(BaseInput)`
  font-size: ${rem("16px")};
  width: 100%;
  height: ${rem("6px")};
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

const AddQuestion = ({
                         questionData,
                         handleTextInput,
                         fieldErrors,
                         handleProgramSelectorChange,
                         handleTestsChange,
                         handleAddQuestion
                     }) => {
    return (<>
        <EditTop>
            <InputLabelDiv>
                <StyledLabel>Name:</StyledLabel>
                <NameInput
                    type="text"
                    placeholder="Question Name"
                    value={questionData.name}
                    required
                    name="name"
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
                    name="difficulty"
                    value={questionData.difficulty}
                    onChange={handleTextInput}
                >
                    <option value="E">Easy</option>
                    <option value="I">Intermediate</option>
                    <option value="H">Hard</option>
                </DifficultyDropdown>
                <Error/>
            </InputLabelDiv>
        </EditTop>
        <EditMiddleBig>
            <InputLabelDiv>
                <StyledLabel>Description:</StyledLabel>
                <DescriptionInput
                    type="text"
                    placeholder="Description"
                    value={questionData.instructions}
                    required
                    name="instructions"
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
        </EditMiddleBig>
        <TestInputContainerAdd>
            <InputLabelDiv>
                <StyledLabel>Test Case Examples:</StyledLabel>
                <TestInput
                    type="text"
                    value={questionData.tests_for_question[0]}
                    onChange={(e) => handleTestsChange(e, 0)}
                />
                <Error
                    errorMessage={fieldErrors["tests_for_question"][0]}
                />
                <TestInput
                    type="text"
                    value={questionData.tests_for_question[1]}
                    onChange={(e) => handleTestsChange(e, 1)}
                />
                <Error
                    errorMessage={fieldErrors["tests_for_question"][1]}
                />
                <TestInput
                    type="text"
                    value={questionData.tests_for_question[2]}
                    onChange={(e) => handleTestsChange(e, 2)}
                />
                <Error
                    errorMessage={fieldErrors["tests_for_question"][2]}
                />
            </InputLabelDiv>
        </TestInputContainerAdd>

        <DeleteSave>
            <BlueButton onClick={handleAddQuestion}>Add</BlueButton>
        </DeleteSave>
    </>)
};

export default AddQuestion