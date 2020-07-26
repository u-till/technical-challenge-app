import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {rem} from "polished";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {BaseContainer, PageContainer} from "../../../style/GlobalWrappers";
import {BaseInput} from "../../../style/GlobalInputs";
import {RoundGreyButton} from "../../../style/GlobalButtons";
import {Styledh1} from "../../../style/GlobalTitles";
import GenericQuestionCard from "../../Shared/GenericCards/GenericQuestionCard";
import {connect, useDispatch} from "react-redux";
import {
    createNewQuestionAction,
    getAllQuestionsAction,
    resetTargetQuestion,
    updateQuestionAction,
} from "../../../store/actions/questionActions";
import {GenericSpinner} from "../../Shared/GenericSpinner";
import {resetError} from "../../../store/actions/verificationAction";
import EditQuestion from "./EditQuestion";
import AddQuestion from "./AddQuestion";
import {sortByCreated, sortByDifficulty, sortByPointValue} from "../../../Helpers";

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
  height: ${rem("640px")};
  min-width: 540px;
  padding: 24px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
`;

const BrowseContainer = styled(BaseContainer)`
  margin: 12px;
  flex-grow: 1;
  flex-basis: 0;
  min-width: 540px;
  height: ${rem("640px")};
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
  height: ${rem("6px")};
`;

const SortQDropdown = styled.select`
  background: #ffffff;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 5px;
  height: ${rem("38px")};
  width: ${rem("120px")};
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

const Questions = ({
                       getAllQuestionsAction,
                       allQuestions,
                       targetQuestion,
                       targetQuestionTips,
                       updateQuestionAction,
                       resetTargetQuestion,
                       createNewQuestionAction,
                       fieldErrors,
                   }) => {
    const dispatch = useDispatch();
    // Used to sort by difficulty, points, and date created
    const [sort, setSort] = useState("date");
    const [search, setSearch] = useState("");
    const inputSortSearchHandler = (e, func) => {
        func(e.currentTarget.value);
    };
    // Used to manage displaying Question Data for adding / editing
    const [questionData, setQuestionData] = useState({
        name: "",
        instructions: "",
        program: [],
        difficulty: "E",
        tests_for_question: ["", "", ""],
    });
    const handleTextInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setQuestionData({...questionData, [name]: value});
    };
    // Used to change local state of Program Selector input
    const handleProgramSelectorChange = (e) => {
        let options = e.target.options;
        let value = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setQuestionData({...questionData, program: value});
    };
    // Used to change local state of Test Case Examples inputs
    const handleTestsChange = (e, index) => {
        let newArray = [...questionData.tests_for_question];
        newArray[index] = e.target.value;
        setQuestionData({...questionData, tests_for_question: newArray});
    };
    // Used to manage the Delete / Tip Modal display status
    const [isModalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [isModalTipAddOpen, setModalTipAddOpen] = useState(false);
    const ModalDeleteOpenCloseHandler = () => {
        setModalDeleteOpen(!isModalDeleteOpen);
    };
    const ModalTipAddOpenCloseHandler = () => {
        setModalTipAddOpen(!isModalTipAddOpen);
    };
    // Resets the displayed question data and Fetches all Questions on component load
    useEffect(() => {
        resetTargetQuestion();
        getAllQuestionsAction();
    }, [getAllQuestionsAction, resetTargetQuestion]);
    // Used by Save button during editing a Question
    const handleSave = async (e) => {
        e.preventDefault();
        const editQuestionPrograms = [];
        questionData.program.forEach((program) =>
            editQuestionPrograms.push(parseInt(program))
        );
        const questionForm = {
            name: questionData.name,
            difficulty: questionData.difficulty,
            instructions: questionData.instructions,
            program: editQuestionPrograms,
            tests_for_question: questionData.tests_for_question,
        };
        const response = await updateQuestionAction(questionData.id, questionForm);
        if (response.status === 200) {
            getAllQuestionsAction();
            resetTargetQuestion();
            setQuestionData({
                name: "",
                instructions: "",
                difficulty: "E",
                program: [],
                tests_for_question: ["", "", ""],
            });
        }
    };
    // Used by Cancel button, resets Question inputs to initial state
    const handleCancel = (e) => {
        e.preventDefault();
        resetTargetQuestion();
        setQuestionData({
            name: "",
            instructions: "",
            difficulty: "E",
            program: [],
            tests_for_question: ["", "", ""],
        });
    };
    // Used by Grey Plus Sign button to render Add Question input area
    const handleGreyAddButton = (e) => {
        e.preventDefault();
        dispatch(resetError);
        setQuestionData({
            name: "",
            instructions: "",
            difficulty: "E",
            program: [],
            tests_for_question: ["", "", ""],
        });
        resetTargetQuestion();
    };
    // Used by Add Button during adding a new Question
    const handleAddQuestion = async (e) => {
        dispatch(resetError());
        e.preventDefault();
        const newQuestionPrograms = [];
        questionData.program.forEach((program) =>
            newQuestionPrograms.push(parseInt(program))
        );
        const newQuestion = {
            name: questionData.name,
            difficulty: questionData.difficulty,
            instructions: questionData.instructions,
            program: newQuestionPrograms,
            tests_for_question: questionData.tests_for_question,
        };
        const response = await createNewQuestionAction(newQuestion);
        if (response.status === 201) {
            setQuestionData({
                name: "",
                instructions: "",
                difficulty: "E",
                program: [],
                tests_for_question: ["", "", ""],
            });
            getAllQuestionsAction();
        }
    };
    // Used by search input to filter Questions by name
    const searchedQuestions = allQuestions
        ? allQuestions.filter(
            (question) =>
                question.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
        )
        : null;
    // Renders Question Card based on returns from sort/filter/search functions
    const renderQuestions = (searchedQuestions) => {
        const mapQuestionCard = (arr) => {
            return arr.map((question) => (
                <GenericQuestionCard key={`Question ${question.id}`} question={question} setData={setQuestionData}/>));
        };
        if (sort === "date") {
            return mapQuestionCard(sortByCreated(searchedQuestions));
        }
        if (sort === "difficulty") {
            return mapQuestionCard(sortByDifficulty(searchedQuestions));
        }
        return mapQuestionCard(sortByPointValue(searchedQuestions));
    };

    return (
        <PageContainer>
            <ManageQuestionsContainer>
                <Styledh1>Questions</Styledh1>
                <ManageContainer>
                    <EditContainer>
                        {targetQuestion ? (
                            <EditQuestion
                                questionData={questionData}
                                handleTextInput={handleTextInput}
                                fieldErrors={fieldErrors}
                                handleProgramSelectorChange={handleProgramSelectorChange}
                                handleTestsChange={handleTestsChange}
                                ModalTipAddOpenCloseHandler={ModalTipAddOpenCloseHandler}
                                isModalTipAddOpen={isModalTipAddOpen}
                                targetQuestion={targetQuestion}
                                targetQuestionTips={targetQuestionTips}
                                ModalDeleteOpenCloseHandler={ModalDeleteOpenCloseHandler}
                                isModalDeleteOpen={isModalDeleteOpen}
                                setQuestionData={setQuestionData}
                                handleSave={handleSave}
                                handleCancel={handleCancel}
                            />
                        ) : (
                            <AddQuestion
                                questionData={questionData}
                                handleTextInput={handleTextInput}
                                fieldErrors={fieldErrors}
                                handleProgramSelectorChange={handleProgramSelectorChange}
                                handleTestsChange={handleTestsChange}
                                handleAddQuestion={handleAddQuestion}
                            />
                        )}
                    </EditContainer>
                    <BrowseContainer>
                        <BrowseHeader>
                            <RoundGreyButton onClick={handleGreyAddButton}>
                                <FontAwesomeIcon icon={["fas", "plus"]}/>
                            </RoundGreyButton>
                            <div>
                                <p>Sort by:</p>
                                <SortQDropdown
                                    id="sort"
                                    name="Sort by"
                                    value={sort}
                                    onChange={(e) => inputSortSearchHandler(e, setSort)}
                                >
                                    <option value="date">Date</option>
                                    <option value="difficulty">Difficulty</option>
                                    <option value="points">Points</option>
                                </SortQDropdown>
                                <SearchQInput
                                    type="text"
                                    placeholder="Search..."
                                    required
                                    value={search}
                                    onChange={(e) => inputSortSearchHandler(e, setSearch)}
                                />
                            </div>
                        </BrowseHeader>
                        <QuestionList>
                            {allQuestions === null ? (
                                <GenericSpinner/>
                            ) : allQuestions.length > 0 ? (
                                renderQuestions(searchedQuestions)
                            ) : (
                                <div>No Questions to Display</div>
                            )}
                        </QuestionList>
                    </BrowseContainer>
                </ManageContainer>
            </ManageQuestionsContainer>
        </PageContainer>
    );
};

const mapStateToProps = (state) => {
    return {
        allQuestions: state.questionReducer.allQuestions,
        targetQuestion: state.questionReducer.targetQuestion,
        targetQuestionTips: state.tipReducer.targetQuestionTips,
        fieldErrors: state.verificationReducer.verificationErrors,
    };
};

export default connect(mapStateToProps, {
    getAllQuestionsAction,
    updateQuestionAction,
    resetTargetQuestion,
    createNewQuestionAction,
})(Questions);
