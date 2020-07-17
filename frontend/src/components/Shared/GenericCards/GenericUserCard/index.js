import React, { useState } from "react";
import Fade from "react-reveal/Fade";
import { rem } from "polished";
import styled from "styled-components";
import avatar from "../../../../assets/images/user.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  AddButton,
  BaseButton,
  BlueButton,
  RedButton,
  RoundGreyButton,
} from "../../../../style/GlobalButtons";
import { Styledh2 } from "../../../../style/GlobalTitles";
import { BaseInput } from "../../../../style/GlobalInputs";
import GenericChallengeCardSmall from "../GenericChallengeCardSmall";

//////////
// STYLES
//////////
const UserCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 16px;
  height: 140px;
  margin-bottom: 8px;
  overflow: hidden;
  > div:first-child {
    width: 90%;
  }
`;

const UserInfo = styled.div`
  display: flex;
  div:last-child {
    margin-left: 16px;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
`;

const UserAvatar = styled.div`
  width: 100px;
  height: 100px;
  border: solid 1px rgba(221, 221, 221, 0.67);
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  img {
    width: 100px;
    height: 100px;
  }
`;

const UserCardBig = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 16px;
  height: 320px;
  margin-bottom: 8px;
  overflow: hidden;

  > div:first-child {
    display: flex;
    width: 100%;
    height: 85%;
    margin-bottom: 12px;
  }
`;

const EditUserInfo = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-between;
  height: 100%;
  border-right: 1px solid black;
  > div {
    margin-right: 12px;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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

const EditUserChallenge = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
  height: 100%;
`;

const ChallengeCategoryDropdown = styled.select`
  background: #ffffff;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 5px;
  height: 38px;
  width: 100%;
  &:focus {
    outline: none;
  }
  option {
    padding: 16px;
  }
`;

const AddChallenge = styled.div`
  width: 30%;
  margin-left: 12px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  button {
    margin-top: 16px;
  }
`;

const ChallengeList = styled.div`
  width: 70%;
  border: 1px solid #dbdbdb;
  margin-left: 12px;
  box-sizing: border-box;
  border-radius: 5px;
  overflow-y: scroll;
  padding: 8px;
  height: 100%;
`;

const DeleteSave = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const InputLabelDiv = styled.div`
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

const GenericUserCard = (props) => {
  const [isUserEditing, setUserEditing] = useState(false);

  const editUserHandler = () => {
    setUserEditing(!isUserEditing);
  };
  return (
    <>
      {isUserEditing ? (
        <UserCardBig>
          <div>
            <EditUserInfo>
              <div>
                <InputLabelDiv>
                  <StyledLabel>First Name:</StyledLabel>
                  <StyledInput
                    type="text"
                    placeholder="First Name"
                    required
                  ></StyledInput>
                </InputLabelDiv>
                <InputLabelDiv>
                  <StyledLabel>Last Name:</StyledLabel>
                  <StyledInput
                    type="text"
                    placeholder="Last Name"
                    required
                  ></StyledInput>
                </InputLabelDiv>
                <InputLabelDiv>
                  <StyledLabel>Email:</StyledLabel>
                  <StyledInput
                    type="email"
                    placeholder="Email"
                    required
                  ></StyledInput>
                </InputLabelDiv>
              </div>
              <div>
                <InputLabelDiv>
                  <StyledLabel>Phone:</StyledLabel>
                  <StyledInput
                    type="¨tel"
                    placeholder="Phone Nr."
                    required
                  ></StyledInput>
                </InputLabelDiv>
                <InputLabelDiv>
                  <StyledLabel>Role:</StyledLabel>
                  <RoleDropdown id="role" name="Role">
                    <option value="Staff">Staff</option>
                    <option value="Candidate">Candidate</option>
                  </RoleDropdown>
                </InputLabelDiv>
                <InputLabelDiv>
                  <StyledLabel>Avatar:</StyledLabel>
                  <BtnWrapper>
                    <UploadButton>Upload Avatar</UploadButton>
                  </BtnWrapper>
                </InputLabelDiv>
              </div>
            </EditUserInfo>
            <EditUserChallenge>
              <AddChallenge>
                <InputLabelDiv>
                  <StyledLabel>Add Challenge:</StyledLabel>
                  <ChallengeCategoryDropdown>
                    <option value="fullstack">Full Stack</option>
                    <option value="datascience">Data Science</option>
                    <option value="reactredux">React & Redux</option>
                    <option value="dockerdeployment">
                      Docker & Deployment
                    </option>
                    <option value="aiforleaders">AI for Leaders</option>
                    <option value="pythonprogramming">
                      Python programming
                    </option>
                  </ChallengeCategoryDropdown>
                </InputLabelDiv>
                <BlueButton>Create Challenge</BlueButton>
                <InputLabelDiv>
                  <StyledLabel>User Created by:</StyledLabel>
                  <p>Ruben Villalon</p>
                  <p>on the 29. Feb 2020</p>
                </InputLabelDiv>
              </AddChallenge>
              <ChallengeList>
                <GenericChallengeCardSmall />
                <GenericChallengeCardSmall />
                <GenericChallengeCardSmall />
                <GenericChallengeCardSmall />
              </ChallengeList>
            </EditUserChallenge>
          </div>
          <DeleteSave>
            <RedButton>Delete</RedButton>
            <BlueButton onClick={editUserHandler}>Save</BlueButton>
          </DeleteSave>
        </UserCardBig>
      ) : (
        <UserCard>
          <UserInfo>
            <UserAvatar>
              <img src={avatar}></img>
            </UserAvatar>
            <div>
              <Styledh2>First Name Last Name</Styledh2>
              <p>Staff</p>
            </div>
          </UserInfo>
          <RoundGreyButton onClick={editUserHandler}>
            <FontAwesomeIcon icon={["fas", "pencil-alt"]} />
          </RoundGreyButton>
        </UserCard>
      )}
    </>
  );
};

export default GenericUserCard;
