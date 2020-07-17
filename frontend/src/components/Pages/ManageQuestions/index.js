import React from "react";
import styled from "styled-components";
import { rem } from "polished";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  BaseContainer,
  InputAndLabelContainer,
  PageContainer,
} from "../../../style/GlobalWrappers";
import { BaseInput, BaseTextArea } from "../../../style/GlobalInputs";
import {
  AddButton,
  EditButton,
  RedButton,
  RoundGreyButton,
} from "../../../style/GlobalButtons";
import { BlueButton } from "../../../style/GlobalButtons";
import { Styledh1, Styledh2 } from "../../../style/GlobalTitles";
import GenericTipCard from "../../Shared/GenericCards/GenericTipCard";
import GenericQuestionCard from "../../Shared/GenericCards/GenericQuestionCard";

//////////
// STYLE
//////////

const ManageQuestionsContainer = styled.div`
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ManageContainer = styled.div`
  display: inline-flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  width: 100%;
`;

const EditContainer = styled(BaseContainer)`
  flex-grow: 1;
  flex-basis: 0;
  min-width: 700px;
  height: 640px;
  padding: 24px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
`;

const EditTop = styled.div`
  display: inline-flex;
  gap: 12px;
  padding-bottom: 16px;
  width: 100%;
  height: 15%;
  justify-content: space-between;
  > div:first-child {
    width: 56%;
  }
  > div:last-child {
    width: 30%;
  }
  > div {
    width: 120px;
  }
`;

const EditMiddle = styled.div`
  display: inline-flex;
  gap: 12px;
  padding-bottom: 16px;

  width: 100%;
  height: 35%;
  justify-content: space-between;
  > div:first-child {
    width: 70%;
  }
  > div:last-child {
    width: 30%;
  }
`;

const EditBottom = styled.div`
  display: inline-flex;
  gap: 12px;
  padding-bottom: 16px;

  width: 100%;
  height: 40%;
  justify-content: space-between;
  > div:first-child {
    width: 30%;
  }
  > div:last-child {
    width: 70%;
  }
`;

const DeleteSave = styled.div`
  display: flex;
  justify-content: space-between;
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
  height: 6px;
`;

const NumberInput = styled(BaseInput)`
  width: 100%;

  height: 6px;
`;

const DescriptionInput = styled(BaseTextArea)`
  width: 100%;
  resize: none;
  height: 100%;
  font-size: 16px;
`;

const DifficultyDropdown = styled.select`
  background: #ffffff;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 5px;
  height: 38px;
  width: 100%;

  &:focus {
    outline: none;
  }
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

const FileSelect = styled.select`
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

const LabelAndBtn = styled.div`
  display: flex;
  justify-content: space-between;
  div {
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

const BrowseContainer = styled(BaseContainer)`
  flex-grow: 1;
  flex-basis: 0;
  min-width: 700px;
  height: 640px;
  padding: 24px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
`;

const BrowseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 16px;

  p {
    display: inline;
  }
  div:last-child {
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }
`;

const SearchQInput = styled(BaseInput)`
  height: 6px;
`;

const SortQDropdown = styled.select`
  background: #ffffff;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 5px;
  height: 38px;
  width: 120px;
  &:focus {
    outline: none;
  }
`;

const QuestionList = styled.div`
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 5px;
  overflow-y: scroll;
  padding: 8px;
  height: 100%;
`;

//////////
// REACT
//////////
const MAX_QUEST_LENGTH = 240;
const tip =
  "    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const Questions = () => {
  return (
    <PageContainer>
      <ManageQuestionsContainer>
        <Styledh1>Questions</Styledh1>
        <ManageContainer>
          <EditContainer>
            <EditTop>
              <InputLabelDiv>
                <StyledLabel>Name:</StyledLabel>
                <NameInput
                  type="text"
                  placeholder="Question Name"
                  required
                ></NameInput>
              </InputLabelDiv>
              <InputLabelDiv>
                <StyledLabel>Points:</StyledLabel>
                <NumberInput
                  type="number"
                  placeholder="n"
                  required
                ></NumberInput>
              </InputLabelDiv>
              <InputLabelDiv>
                <StyledLabel for="difficulty">Difficulty:</StyledLabel>
                <DifficultyDropdown id="difficulty" name="Difficulty">
                  <option value="Easy">Easy</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Hard">Hard</option>
                </DifficultyDropdown>
              </InputLabelDiv>
            </EditTop>
            <EditMiddle>
              <InputLabelDiv>
                <StyledLabel>Description:</StyledLabel>
                <DescriptionInput
                  type="text"
                  placeholder="Description"
                  required
                ></DescriptionInput>
              </InputLabelDiv>
              <InputLabelDiv>
                <StyledLabel>Catergories:</StyledLabel>
                <CategorySelect name="category" multiple>
                  <option value="fullstack">Full Stack</option>
                  <option value="datascience">Data Science</option>
                  <option value="reactredux">React & Redux</option>
                  <option value="dockerdeployment">Docker & Deployment</option>
                  <option value="aiforleaders">AI for Leaders</option>
                  <option value="pythonprogramming">Python programming</option>
                </CategorySelect>
              </InputLabelDiv>
            </EditMiddle>
            <EditBottom>
              <InputLabelDiv>
                <StyledLabel>File:</StyledLabel>
                <FileSelect name="file" size="4">
                  <option value="testfile1">Test_File_1</option>
                  <option value="testfile2">Test_File_2</option>
                  <option value="testfile3">Test_File_3</option>
                  <option value="testfile4">Test_File_4</option>
                  <option value="testfile5">Test_File_5</option>
                  <option value="testfile6">Test_File_6</option>
                  <option value="testfile7">Test_File_7</option>
                </FileSelect>
              </InputLabelDiv>
              <InputLabelDiv>
                <LabelAndBtn>
                  <StyledLabel>Tips:</StyledLabel>
                  <RoundGreyButton>
                    <FontAwesomeIcon icon={["fas", "plus"]} />
                  </RoundGreyButton>
                </LabelAndBtn>
                <TipsList>
                  <GenericTipCard />
                  <GenericTipCard />
                  <GenericTipCard />
                </TipsList>
              </InputLabelDiv>
            </EditBottom>
            <DeleteSave>
              <RedButton>Delete</RedButton>
              <BlueButton>Save</BlueButton>
            </DeleteSave>
          </EditContainer>
          <BrowseContainer>
            <BrowseHeader>
              <RoundGreyButton>
                <FontAwesomeIcon icon={["fas", "plus"]} />
              </RoundGreyButton>
              <div>
                <p>Sort by:</p>
                <SortQDropdown id="sort" name="Sort by">
                  <option value="Date">Date</option>
                  <option value="Difficulty">Difficulty</option>
                  <option value="Points">Points</option>
                </SortQDropdown>
                <SearchQInput
                  type="text"
                  placeholder="Search..."
                  required
                ></SearchQInput>
              </div>
            </BrowseHeader>
            <QuestionList>
              <GenericQuestionCard />
            </QuestionList>
          </BrowseContainer>
        </ManageContainer>
      </ManageQuestionsContainer>
    </PageContainer>
  );
};

export default Questions;
