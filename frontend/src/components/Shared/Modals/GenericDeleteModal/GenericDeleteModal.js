import React from "react";
import {rem} from "polished";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Styledh2} from "../../../../style/GlobalTitles";
import {BaseContainer} from "../../../../style/GlobalWrappers";
import {BlueButton, RedButton} from "../../../../style/GlobalButtons";
import {useDispatch} from "react-redux";
import {deleteItemAction} from "../../../../store/actions/deleteAction";
import {getAllUsersAction} from "../../../../store/actions/userActions";
import {
    getAllQuestionsAction,
    resetTargetQuestion,
} from "../../../../store/actions/questionActions";
import {getTipsForQuestionAction} from "../../../../store/actions/tipActions";
import {getAllChallengesAction} from "../../../../store/actions/challengeActions";

const DeleteModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;

const DeleteModalContainer = styled(BaseContainer)`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 16px;
  position: fixed;
  background: white;
  width: 40%;
  height: ${rem("180px")};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  div {
    display: flex;
    justify-content: space-between;
    button {
      margin-left: 0px !important;
    }
  }
`;

const GenericDeleteModal = ({
                                ModalDeleteOpenCloseHandler,
                                children,
                                type,
                                typeId,
                                questionId,
                                setQuestionData,
                                from,
                            }) => {
    const dispatch = useDispatch();
    // Used by delete button during delete item request, each component provides it a "type" and "typeId" of item being
    // deleted, this is used to target the correct endpoint during deleteItemAction(). The type is then used in the
    // switch to dispatch the appropriate action to rerender that types display. In the case where type is "challenges",
    // and additional prop "from" is used to correctly rerender either the users or challenges, depending on which
    // component that request came from.
    const onDeleteHandler = async (e) => {
        e.preventDefault();
        const response = await dispatch(deleteItemAction(type, typeId));
        if (response.status === 204) {
            switch (type) {
                case "users": {
                    return await dispatch(getAllUsersAction());
                }
                case "questions": {
                    setQuestionData({
                        name: "",
                        instructions: "",
                        difficulty: "E",
                        program: [],
                        tests_for_question: ["", "", ""],
                    });
                    ModalDeleteOpenCloseHandler();
                    await dispatch(resetTargetQuestion());
                    return await dispatch(getAllQuestionsAction());
                }
                case "tips": {
                    return await dispatch(getTipsForQuestionAction(questionId));
                }
                default: {
                    ModalDeleteOpenCloseHandler();
                    if (from === "managechallenges") {
                        return await dispatch(getAllChallengesAction());
                    }
                    if (from === "challenges") {
                        return await dispatch(getAllUsersAction());
                    }
                }
            }
        }
    };

    return (
        <DeleteModalOverlay>
            <DeleteModalContainer>
                <Styledh2>
                    <FontAwesomeIcon icon={["fas", "exclamation-triangle"]}/> Warning
                </Styledh2>
                {children}
                <div>
                    <BlueButton onClick={ModalDeleteOpenCloseHandler}>Cancel</BlueButton>
                    <RedButton onClick={onDeleteHandler}>Delete</RedButton>
                </div>
            </DeleteModalContainer>
        </DeleteModalOverlay>
    );
};

export default GenericDeleteModal;
