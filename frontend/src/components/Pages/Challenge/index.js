import React from "react";
import styled from "styled-components";
import { rem } from "polished";

import {
  BaseContainer,
  InputAndLabelContainer,
  PageContainer,
} from "../../../style/GlobalWrappers";
import { BaseInput } from "../../../style/GlobalInputs";
import { RedButton } from "../../../style/GlobalButtons";
import { BlueButton } from "../../../style/GlobalButtons";

//////////
// STYLE
//////////
const Questionstext = styled.p`
  padding-top: 70px;
  font-size: 48px;
  padding-left: 110px;
`;

const Questionscontainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const Questionscontainerone = styled(BaseContainer)`
  width: 644px;
  height: 700px;
  margin: 20px;
  display: flex;
  flex-wrap: wrap;
  background-color: #ffffff;
`;

const Containerinputs = styled.div`
  margin-top: 31px;
  display: flex;
  padding-left: 20px;
`;

const Namelabel = styled.label``;

const Nameinput = styled(BaseInput)`
  width: 213px;
  height: 6px;
`;

const Pointslabel = styled.label`
  margin-left: 100px;
`;

const Pointsinput = styled(BaseInput)`
  width: 108px;
  height: 6px;
`;

const Difficultylabel = styled.label``;

const Difficultyinput = styled(BaseInput)`
  width: 142px;
  height: 6px;
`;

const InsCatContainer = styled.div`
  display: flex;
  padding-left: 20px;
`;

const Intructiontext = styled.p``;

const Instruction = styled.div`
  width: 425px;
  height: 129px;
  background: #b8b8b8;
`;
const Categorytext = styled.p`
  padding-left: 20px;
`;

const Category = styled.section`
  width: 158px;
  height: 129px;
  margin-left: 20px;
  background: #b8b8b8;
  overflow: auto;
`;

const Testtipscontainer = styled.div`
  display: flex;
  margin-left: 20px;
`;

const Testfiletext = styled.p``;

const Testfile = styled.div`
  width: 213px;
  height: 330px;
  background: #b8b8b8;
`;

const Tipstext = styled.p`
  padding-left: 20px;
`;

const Tips = styled.div`
  width: 370px;
  height: 330px;
  background: #b8b8b8;
  margin-left: 20px;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  overflow-y: scroll;
`;

const Insidetipdiv = styled.div`
  width: 354px;
  height: 109px;
  background: #ededed;
  padding-top: 20px;
`;

const Buttoncontainer = styled.div`
  padding-left: 20px;
`;

const Deletebutton = styled(RedButton)`
  width: 74px;
  height: 30px;
`;

const Savebutton = styled(BlueButton)`
  width: 74px;
  height: 30px;
  margin-left: 455px;
`;

const Firstcontainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Plusicon = styled.image``;

const Sorttext = styled.p``;

const Dateinput = styled(BaseInput)`
  width: 96px;
  height: 30px;
`;

const Searchinput = styled(BaseInput)`
  width: 250px;
  height: 30px;
`;

const Questionswrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-left: 20px;
`;

const Question = styled.div`
  width: 605px;
  height: 197px;
  background: #b8b8b8;
`;

const QuestionsCont = styled.p``;

//////////
// REACT
//////////
const Questions = () => {
  return (
    <>
      <Questionstext>Questions</Questionstext>
      <Questionscontainer>
        <Questionscontainerone>
          <Containerinputs>
            <div>
              <Namelabel for="name">Name:</Namelabel>
              <Nameinput type="name" placeholder="Quest 1" required></Nameinput>
            </div>
            <div>
              <Pointslabel for="number">Points:</Pointslabel>
              <Pointsinput
                type="number"
                placeholder="number"
                required
              ></Pointsinput>
            </div>
            <div>
              <Difficultylabel for="difficulty">Difficulty:</Difficultylabel>
              <Difficultyinput
                type="difficulty"
                placeholder="Hard"
                required
              ></Difficultyinput>
            </div>
          </Containerinputs>
          <InsCatContainer>
            <div>
              <Intructiontext>Instructions:</Intructiontext>
              <Instruction></Instruction>
            </div>
            <div>
              <Categorytext>Catergories:</Categorytext>
              <Category></Category>
            </div>
          </InsCatContainer>
          <Testtipscontainer>
            <div>
              <Testfiletext>Testfile:</Testfiletext>
              <Testfile></Testfile>
            </div>
            <div>
              <Tipstext>Tips:</Tipstext>
              <Tips>
                <Insidetipdiv></Insidetipdiv>
                <Insidetipdiv></Insidetipdiv>
                <Insidetipdiv></Insidetipdiv>
              </Tips>
            </div>
          </Testtipscontainer>
          <Buttoncontainer>
            <Deletebutton>Delete</Deletebutton>
            <Savebutton>Save</Savebutton>
          </Buttoncontainer>
        </Questionscontainerone>
        <Questionscontainerone>
          <Questionswrapper>
            <Firstcontainer>
              <Sorttext>Sort by:</Sorttext>
              <Dateinput type="date" placeholder="Date" required></Dateinput>
              <Searchinput
                type="search"
                placeholder="Search"
                required
              ></Searchinput>
            </Firstcontainer>
            <Question>Question 1</Question>
            <Question>Question 2</Question>
            <Question>Question 3</Question>
          </Questionswrapper>
        </Questionscontainerone>
      </Questionscontainer>
    </>
  );
};

export default Questions;
