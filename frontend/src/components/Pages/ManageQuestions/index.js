import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {rem} from "polished";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {
    BaseContainer,
    InputAndLabelContainer,
    PageContainer,
} from "../../../style/GlobalWrappers";
import {BaseInput, BaseTextArea} from "../../../style/GlobalInputs";
import {
    AddButton,
    EditButton,
    RedButton,
    RoundGreyButton,
} from "../../../style/GlobalButtons";
import {BlueButton} from "../../../style/GlobalButtons";
import {Styledh1, Styledh2} from "../../../style/GlobalTitles";
import GenericTipCard from "../../Shared/GenericCards/GenericTipCard";
import GenericQuestionCard from "../../Shared/GenericCards/GenericQuestionCard";
import {connect, useDispatch} from "react-redux";
import {getAllQuestionsAction, setTargetQuestion, updateQuestionAction} from "../../../store/actions/questionActions";
import GenericSpinner from "../../Shared/GenericSpinner";

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
  width: 100%;
  margin: -12px;
`;

const EditContainer = styled(BaseContainer)`
  margin: 12px;
  flex-grow: 1;
  flex-basis: 0;
  min-width: 680px;
  height: 640px;
  padding: 24px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
`;

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
    width: 120px;
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
  margin: 12px;
  flex-grow: 1;
  flex-basis: 0;
  min-width: 680px;
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
    margin-right: 12px;
  }
  div:last-child {
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const SearchQInput = styled(BaseInput)`
  margin-left: 12px;
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

const Questions = ({getAllQuestionsAction, allQuestions, questionNotEmpty, targetQuestion, targetQuestionTips, tipsNotEmpty, updateQuestionAction}) => {
    const dispatch = useDispatch();

    const displayQuestionMessage = () => !questionNotEmpty ? <GenericSpinner/> : null;
    const displayTipMessage = () => !tipsNotEmpty ? <GenericSpinner/> : null;

    const [sort, setSort] = useState('date');
    const [search, setSearch] = useState('');
    // setQuestionData is called in GenericQuestionCard to set the state to the Question Object
    const [questionData, setQuestionData] = useState({
        name: '',
        instructions: '',
        points_value: '',
    });

    useEffect(() => {
        getAllQuestionsAction()
    }, [getAllQuestionsAction]);

    const inputHandler = (e, func) => {
        func(e.currentTarget.value)
    };

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setQuestionData({...questionData, [name]: value});
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const questionForm = new FormData();
        questionForm.append('name', questionData.name);
        questionForm.append('difficulty', questionData.difficulty);
        questionForm.append('instructions', questionData.instructions);
        const response = await updateQuestionAction(questionData.id, questionForm);
        if (response.status === 200) {
            getAllQuestionsAction();
        }
    };

    const searchedQuestions = allQuestions.filter(question => question.name.toLowerCase().indexOf(search.toLowerCase()) !== -1);

    const renderQuestions = (searchedQuestions) => {
        if (sort === 'date') {
            return searchedQuestions.sort((a, b) => (a.created > b.created) ? -1 : ((b.created > a.created) ? 1 : 0)).map(question =>
                <GenericQuestionCard key={`Question ${question.id}`} question={question} setData={setQuestionData}/>)
        }
        if (sort === 'difficulty') {
            return searchedQuestions.sort((a, b) => (a.difficulty > b.difficulty) ? -1 : ((b.difficulty > a.difficulty) ? 1 : 0)).map(question =>
                <GenericQuestionCard key={`Question ${question.id}`} question={question} setData={setQuestionData}/>)
        }
        return searchedQuestions.sort((a, b) => (a.points_value > b.points_value) ? 1 : ((b.points_value > a.points_value) ? -1 : 0)).map(question =>
            <GenericQuestionCard key={`Question ${question.id}`} question={question} setData={setQuestionData}/>)
    };

    return (
        <PageContainer>
            <ManageQuestionsContainer>
                <Styledh1>Questions</Styledh1>
                <ManageContainer>
                    <EditContainer>
                        {targetQuestion ?
                            <>
                                <EditTop>
                                    <InputLabelDiv>
                                        <StyledLabel>Name:</StyledLabel>
                                        <NameInput
                                            type="text"
                                            placeholder="Question Name"
                                            required
                                            name="name"
                                            value={questionData.name}
                                            onChange={handleInput}
                                        />
                                    </InputLabelDiv>
                                    <InputLabelDiv>
                                        <StyledLabel>Points:</StyledLabel>
                                        <NumberInput
                                            type="text"
                                            placeholder="0"
                                            required
                                            value={questionData.points_value}
                                            disabled
                                        />
                                    </InputLabelDiv>
                                    <InputLabelDiv>
                                        <StyledLabel>Difficulty:</StyledLabel>
                                        <DifficultyDropdown id="difficulty"
                                                            value={questionData.difficulty}
                                                            onChange={handleInput}
                                                            name='difficulty'>
                                            <option value="E">Easy</option>
                                            <option value="I">Intermediate</option>
                                            <option value="H">Hard</option>
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
                                            name="instructions"
                                            value={questionData.instructions}
                                            onChange={handleInput}
                                        />
                                    </InputLabelDiv>
                                    <InputLabelDiv>
                                        <StyledLabel>Catergories:</StyledLabel>
                                        <CategorySelect
                                            name="category"
                                            multiple value={questionData.program}
                                            onChange={handleInput
                                            }>
                                            <option value="Full Stack">Full Stack</option>
                                            <option value="Data Science">Data Science</option>
                                            <option value="React & Redux">React & Redux</option>
                                            <option value="Docker & Deployment">Docker & Deployment</option>
                                            <option value="AI for Leaders">AI for Leaders</option>
                                            <option value="Python Programming">Python programming</option>
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
                                                <FontAwesomeIcon icon={["fas", "plus"]}/>
                                            </RoundGreyButton>
                                        </LabelAndBtn>
                                        <TipsList>
                                            {targetQuestionTips && tipsNotEmpty ? targetQuestionTips.map(tip => {
                                                return <GenericTipCard key={`Tip ${tip.id}`} tip={tip}/>
                                            }) : displayTipMessage()}
                                        </TipsList>
                                    </InputLabelDiv>
                                </EditBottom>
                                <DeleteSave>
                                    <RedButton>Delete</RedButton>
                                    <BlueButton onClick={handleSave}>Save</BlueButton>
                                </DeleteSave>
                            </>
                            : <div>Select a Question</div>}
                    </EditContainer>
                    <BrowseContainer>
                        <BrowseHeader>
                            <RoundGreyButton>
                                <FontAwesomeIcon icon={["fas", "plus"]}/>
                            </RoundGreyButton>
                            <div>
                                <p>Sort by:</p>
                                <SortQDropdown id="sort" name="Sort by" value={sort}
                                               onChange={e => inputHandler(e, setSort)}>
                                    <option value="date">Date</option>
                                    <option value="difficulty">Difficulty</option>
                                    <option value="points">Points</option>
                                </SortQDropdown>
                                <SearchQInput
                                    type="text"
                                    placeholder="Search..."
                                    required
                                    value={search}
                                    onChange={e => inputHandler(e, setSearch)}
                                />
                            </div>
                        </BrowseHeader>
                        <QuestionList>
                            {allQuestions && questionNotEmpty ? renderQuestions(searchedQuestions) : displayQuestionMessage()}
                        </QuestionList>
                    </BrowseContainer>
                </ManageContainer>
            </ManageQuestionsContainer>
        </PageContainer>
    );
};

const mapStateToProps = state => {
    const questionNotEmpty = state.questionReducer.allQuestions.length;
    const tipsNotEmpty = state.tipReducer.targetQuestionTips.length;
    return {
        questionNotEmpty: questionNotEmpty,
        tipsNotEmpty: tipsNotEmpty,
        allQuestions: state.questionReducer.allQuestions,
        targetQuestion: state.questionReducer.targetQuestion,
        targetQuestionTips: state.tipReducer.targetQuestionTips,
    }
};

export default connect(mapStateToProps, {getAllQuestionsAction, updateQuestionAction})(Questions);
