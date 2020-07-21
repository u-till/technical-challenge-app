import React, { useState } from "react";
import { rem } from "polished";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GenericTipCard from "../../GenericCards/GenericTipCard";
import { Styledh1, Styledh2 } from "../../../../style/GlobalTitles";
import { BaseContainer } from "../../../../style/GlobalWrappers";
import {
  BaseButton,
  BlueButton,
  RedButton,
  RoundGreyButton,
} from "../../../../style/GlobalButtons";
import { useDispatch } from "react-redux";
import { deleteItemAction } from "../../../../store/actions/deleteAction";
import { getAllUsersAction } from "../../../../store/actions/userActions";
import { getAllQuestionsAction } from "../../../../store/actions/questionActions";
import { getTipsForQuestionAction } from "../../../../store/actions/tipActions";
import Error from "../../Error";
import { BaseInput } from "../../../../style/GlobalInputs";

//////////
// Styles
//////////
const CreateModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;

const CreateModalContainer = styled(BaseContainer)`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  padding: 32px;
  position: fixed;
  background: white;
  width: 640px;
  height: 480px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

const EditUserInfo = styled.div`
  display: flex;
  justify-content: space-around;
  height: 100%;
  width: 100%;
  padding: 32px 0 16px 0;
  div {
    align-items: flex-start !important;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  > div:first-child {
    margin-right: 8px;
  }
  > div:last-child {
    margin-left: 8px;
  }
`;

const RoleDropdown = styled.select`
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

const InputLabelDiv = styled.div`
  height: 98px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const StyledInput = styled(BaseInput)`
  width: 100%;
  font-size: 14px;
  height: 6px;
`;

const StyledLabel = styled.label`
  font-weight: bold;
  margin-bottom: 8px;
`;

const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const UploadButton = styled(BaseButton)`
  height: 38px;
  width: 100%;
  margin-top: 13px;
  border-radius: 5px;
  color: #767676;
  background-color: #fff;
  border: 1px solid #dbdbdb;
  font-size: ${rem("14px")};
  :hover {
    border: 1px solid #9a9a9a;
    color: #363636;
  }
`;

//////////
// REACT
//////////
const UserAddModal = ({ ModalCreateOpenCloseHandler }) => {
  const dispatch = useDispatch();

  return (
    <CreateModalOverlay>
      <CreateModalContainer>
        <Styledh2>
          <FontAwesomeIcon icon={["fas", "user"]} /> Create New User
        </Styledh2>
        <EditUserInfo>
          <div>
            <InputLabelDiv>
              <StyledLabel>First Name:</StyledLabel>
              <StyledInput
                type="text"
                placeholder="First Name"
                required
                name="first_name"
              />
              <Error />
            </InputLabelDiv>
            <InputLabelDiv>
              <StyledLabel>Last Name:</StyledLabel>
              <StyledInput
                type="text"
                placeholder="Last Name"
                required
                name="last_name"
              />
              <Error />
            </InputLabelDiv>
            <InputLabelDiv>
              <StyledLabel>Email:</StyledLabel>
              <StyledInput
                type="email"
                placeholder="Email"
                required
                name="email"
              />
              <Error />
            </InputLabelDiv>
          </div>
          <div>
            <InputLabelDiv>
              <StyledLabel>Phone:</StyledLabel>
              <StyledInput
                type="¨tel"
                placeholder="Phone Nr."
                required
                name="phone"
              />
              <Error />
            </InputLabelDiv>
            <InputLabelDiv>
              <StyledLabel>Role:</StyledLabel>
              <RoleDropdown id="role" name="Role">
                <option>Staff</option>
                <option>Candidate</option>
              </RoleDropdown>
              <Error />
            </InputLabelDiv>
            <InputLabelDiv>
              <StyledLabel>Avatar:</StyledLabel>
              <BtnWrapper>
                <UploadButton>Upload Avatar</UploadButton>
                <input type="file" name="avatar" style={{ display: "none" }} />
              </BtnWrapper>
            </InputLabelDiv>
          </div>
        </EditUserInfo>
        <div>
          <RedButton onClick={ModalCreateOpenCloseHandler}>Cancel</RedButton>
          <BlueButton>Add</BlueButton>
        </div>
      </CreateModalContainer>
    </CreateModalOverlay>
  );
};

export default UserAddModal;
