import React, { useState } from "react";
import Fade from "react-reveal/Fade";
import { rem } from "polished";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  AddButton,
  BlueButton,
  RedButton,
  RoundGreyButton,
} from "../../../../style/GlobalButtons";
import UserModal from "../../Navigation/UserModal";
import { BaseInput, BaseTextArea } from "../../../../style/GlobalInputs";

//////////
// STYLES
//////////
const TipCard = styled.div`
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 16px;
  height: 142px;
  margin-bottom: 8px;
  p:first-child {
    width: 70%;
  }
  overflow: hidden;
  button {
    width: 80px;
  }
`;

const EditTipDiv = styled.div`
  display: inline-flex;
  gap: 12px;
  width: 100%;

  > div:first-child {
    width: 90%;
  }

  > div:last-child {
    display: inline-flex;
    flex-direction: column;
    gap: 8px;
  }
`;

const DescriptionInput = styled(BaseTextArea)`
  resize: none;
  font-size: 16px;
  width: 100%;

  height: 100%;
`;

const NumberInput = styled(BaseInput)`
  height: 6px;
  width: 80px;
`;

//////////
// REACT
//////////
const MAX_TIP_LENGTH = 140;
const tip =
  "    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const GenericTipCard = (props) => {
  const [isTipEditing, setTipEditing] = useState(false);

  const editTipHandler = () => {
    setTipEditing(!isTipEditing);
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
              ></DescriptionInput>
            </div>
            <div>
              <NumberInput type="number" placeholder="n" required></NumberInput>
              <RedButton>Delete</RedButton>
              <BlueButton onClick={editTipHandler}>Save</BlueButton>
            </div>
          </EditTipDiv>
        </TipCardEditing>
      ) : (
        <TipCard>
          <p>{`${tip.substring(0, MAX_TIP_LENGTH)}...`}</p>
          <p>Minus: 10</p>
          <RoundGreyButton onClick={editTipHandler}>
            <FontAwesomeIcon icon={["fas", "pencil-alt"]} />
          </RoundGreyButton>
        </TipCard>
      )}
    </>
  );
};

export default GenericTipCard;
