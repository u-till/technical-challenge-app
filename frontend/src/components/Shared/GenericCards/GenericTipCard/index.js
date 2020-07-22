import React, { useState } from "react";
import { rem } from "polished";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  BlueButton,
  RedButton,
  RoundGreyButton,
} from "../../../../style/GlobalButtons";
import { BaseInput, BaseTextArea } from "../../../../style/GlobalInputs";
import {
  getTipsForQuestionAction,
  updateTipForQuestionAction,
} from "../../../../store/actions/tipActions";
import { useDispatch } from "react-redux";
import GenericDeleteModal from "../../Modals/GenericDeleteModal/GenericDeleteModal";

//////////
// STYLES
//////////
const TipCard = styled.div`
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 16px;
  height: 100px;
  margin-bottom: 8px;
  p:first-child {
    width: 70%;
  }
  overflow: hidden;
`;

const TipCardEditing = styled.div`
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 16px;
  height: ${rem("142px")};
  margin-bottom: 8px;
  p:first-child {
    width: 70%;
  }
  overflow: hidden;
`;

const EditTipDiv = styled.div`
  display: inline-flex;

  width: 100%;

  > div:first-child {
    width: 90%;
  }

  > div:last-child {
    margin-left: 12px;

    display: inline-flex;
    flex-direction: column;
    input {
      margin-bottom: 8px;
    }
    > button:last-child {
      margin-top: 8px;
    }
  }
`;

const DescriptionInput = styled(BaseTextArea)`
  resize: none;
  font-size: ${rem("16px")};
  width: 100%;

  height: 100%;
`;

const NumberInput = styled(BaseInput)`
  height: ${rem("6px")};
  width: ${rem("80px")};
`;

//////////
// REACT
//////////

const GenericTipCard = ({ tip, questionId }) => {
  const dispatch = useDispatch();

  const [isModalDeleteOpen, setModalDeleteOpen] = useState(false);

  const ModalDeleteOpenCloseHandler = () => {
    setModalDeleteOpen(!isModalDeleteOpen);
  };

  const [isTipEditing, setTipEditing] = useState(false);
  const [tipData, setTipData] = useState({
    content: tip.content,
    discount_value: tip.discount_value,
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTipData({ ...tipData, [name]: value });
  };

  const editTipHandler = () => {
    setTipEditing(!isTipEditing);
  };

  const saveHandler = async (e) => {
    e.preventDefault();
    const tipForm = new FormData();
    tipForm.append("content", tipData.content);
    const response = await dispatch(
      updateTipForQuestionAction(tip.id, tipForm)
    );
    if (response.status === 200) {
      dispatch(getTipsForQuestionAction(tip.question));
      setTipEditing(!isTipEditing);
    }
  };

  return (
    <>
      {isTipEditing ? (
        <TipCardEditing>
          <EditTipDiv>
            <div>
              <DescriptionInput
                type="text"
                placeholder="Description"
                required
                name="content"
                value={tipData.content}
                onChange={handleInput}
              />
            </div>
            <div>
              <NumberInput
                type="text"
                placeholder="0"
                disabled
                name="discount_value"
                value={tipData.discount_value}
                onChange={handleInput}
              />
              <RedButton onClick={ModalDeleteOpenCloseHandler}>
                Delete
              </RedButton>
              {isModalDeleteOpen ? (
                <GenericDeleteModal
                  ModalDeleteOpenCloseHandler={ModalDeleteOpenCloseHandler}
                  type="tips"
                  typeId={tip.id}
                  questionId={questionId}
                >
                  <p>Are you sure you want to delete this Tip?</p>
                </GenericDeleteModal>
              ) : null}
              <BlueButton onClick={saveHandler}>Save</BlueButton>
            </div>
          </EditTipDiv>
        </TipCardEditing>
      ) : (
        <TipCard>
          <p>{`${tip.content.slice(0, 130)}...`}</p>
          <p>{`Minus: ${tip.discount_value}`}</p>
          <RoundGreyButton onClick={editTipHandler}>
            <FontAwesomeIcon icon={["fas", "pencil-alt"]} />
          </RoundGreyButton>
        </TipCard>
      )}
    </>
  );
};

export default GenericTipCard;
