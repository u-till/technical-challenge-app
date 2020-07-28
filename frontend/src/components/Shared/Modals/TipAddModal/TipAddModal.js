import React, { useState } from "react";
import { rem } from "polished";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Styledh2 } from "../../../../style/GlobalTitles";
import { BaseContainer } from "../../../../style/GlobalWrappers";
import { BlueButton, RedButton } from "../../../../style/GlobalButtons";
import { useDispatch } from "react-redux";
import {
  createTipForQuestionAction,
  getTipsForQuestionAction,
} from "../../../../store/actions/tipActions";
import Error from "../../Error";
import { BaseTextArea } from "../../../../style/GlobalInputs";

const CreateModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const CreateModalContainer = styled(BaseContainer)`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  padding: 32px;
  position: fixed;
  background: white;
  width: ${rem("640px")};
  height: ${rem("360px")};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  > div:last-child {
    margin-top: 16px;
  }
  > h2 {
    margin-bottom: 16px;
  }
`;

const DescriptionInput = styled(BaseTextArea)`
  resize: none;
  font-size: ${rem("16px")};
  width: 100%;
  height: ${rem("160px")};
`;

const InputLabelDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const StyledLabel = styled.label`
  font-weight: bold;
  margin-bottom: 8px;
`;

const TipAddModal = ({ ModalTipAddOpenCloseHandler, questionId }) => {
  const dispatch = useDispatch();
  // Used to manage the local state of the input of the component
  const [content, setContent] = useState("");
  const inputHandler = (e) => {
    setContent(e.target.value);
  };
  // Used by the Add button during create tip request
  const submitHandler = async (e) => {
    e.preventDefault();
    const tipData = {
      content: content,
    };
    const response = await dispatch(
      createTipForQuestionAction(questionId, tipData)
    );
    if (response.status === 200) {
      dispatch(getTipsForQuestionAction(questionId));
      ModalTipAddOpenCloseHandler();
    }
  };

  return (
    <CreateModalOverlay>
      <CreateModalContainer>
        <Styledh2>
          <FontAwesomeIcon icon={["fas", "lightbulb"]} /> Create New Tip
        </Styledh2>
        <div>
          <InputLabelDiv>
            <StyledLabel>Description:</StyledLabel>
            <DescriptionInput
              type="text"
              placeholder="Description"
              required
              name="content"
              value={content}
              onChange={inputHandler}
            />
            <Error />
          </InputLabelDiv>
        </div>
        <div>
          <RedButton onClick={ModalTipAddOpenCloseHandler}>Cancel</RedButton>
          <Error />
          <BlueButton onClick={submitHandler}>Add</BlueButton>
        </div>
      </CreateModalContainer>
    </CreateModalOverlay>
  );
};

export default TipAddModal;
