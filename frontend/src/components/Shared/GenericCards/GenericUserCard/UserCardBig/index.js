import Error from "../../../Error";
import {
  BaseButton,
  BlueButton,
  RedButton,
} from "../../../../../style/GlobalButtons";
import GenericChallengeCardSmall from "../../GenericChallengeCardSmall";
import GenericDeleteModal from "../../../Modals/GenericDeleteModal/GenericDeleteModal";
import React from "react";
import styled from "styled-components";
import { rem } from "polished";
import { BaseInput } from "../../../../../style/GlobalInputs";

//////////
// STYLES
//////////

const UserCardBig = styled.div`
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 16px;
  height: ${rem("360px")};
  margin-bottom: 8px;
  overflow: hidden;

  > div:first-child {
    display: flex;
    width: 100%;
    height: 80%;
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
  > div:first-child {
    div:last-child {
      margin-bottom: -10px;
    }
  }
`;

const InputLabelDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const StyledInput = styled(BaseInput)`
  width: 100%;
  font-size: ${rem("14px")};
  height: ${rem("6px")};
`;

const StyledLabel = styled.label`
  font-weight: bold;
  margin-bottom: 8px;
`;

const RoleDropdown = styled.select`
  background: #ffffff;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 5px;
  height: ${rem("38px")};
  width: 100%;
  &:focus {
    outline: none;
  }
`;

const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const UploadButton = styled(BaseButton)`
  height: ${rem("38px")};
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

const EditUserChallenge = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
  height: 100%;
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

const ChallengeCategoryDropdown = styled.select`
  background: #ffffff;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 5px;
  height: ${rem("38px")};
  width: 100%;
  &:focus {
    outline: none;
  }
  option {
    padding: 16px;
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
  div {
    button {
      margin-left: 12px;
    }
  }
`;

//////////
// REACT
//////////

const BigCard = ({
  data,
  handleInput,
  fieldErrors,
  user,
  handleClick,
  hiddenFileInput,
  imageSelectHandler,
  handleChallengeCreate,
  isCreating,
  ModalDeleteOpenCloseHandler,
  isModalDeleteOpen,
  non_field_error,
  editUserHandler,
  userSaveHandler,
}) => {
  return (
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
                value={data.first_name}
                onChange={handleInput}
                name="first_name"
              />
              <Error errorMessage={fieldErrors["first_name"]} />
            </InputLabelDiv>
            <InputLabelDiv>
              <StyledLabel>Last Name:</StyledLabel>
              <StyledInput
                type="text"
                placeholder="Last Name"
                required
                value={data.last_name}
                onChange={handleInput}
                name="last_name"
              />
              <Error errorMessage={fieldErrors["last_name"]} />
            </InputLabelDiv>
            <InputLabelDiv>
              <StyledLabel>Email:</StyledLabel>
              <StyledInput
                type="email"
                placeholder="Email"
                required
                value={data.email}
                onChange={handleInput}
                name="email"
              />
              <Error errorMessage={fieldErrors["email"]} />
            </InputLabelDiv>
          </div>
          <div>
            <InputLabelDiv>
              <StyledLabel>Phone:</StyledLabel>
              <StyledInput
                type="¨tel"
                placeholder="Phone Nr."
                required
                value={data.phone}
                onChange={handleInput}
                name="phone"
              />
              <Error errorMessage={fieldErrors["phone"]} />
            </InputLabelDiv>
            <InputLabelDiv>
              <StyledLabel>Role:</StyledLabel>
              <RoleDropdown
                id="role"
                name="Role"
                defaultValue={user.is_staff ? true : false}
                disabled
              >
                <option value={true}>Staff</option>
                <option value={false}>Candidate</option>
              </RoleDropdown>
              <Error />
            </InputLabelDiv>
            <InputLabelDiv>
              <StyledLabel>Avatar:</StyledLabel>
              <BtnWrapper>
                <UploadButton onClick={handleClick}>
                  {data.avatar ? "File Uploaded" : "Upload Avatar"}
                </UploadButton>
                <input
                  type="file"
                  name="avatar"
                  ref={hiddenFileInput}
                  onChange={imageSelectHandler}
                  style={{ display: "none" }}
                />
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
                <option value="dockerdeployment">Docker & Deployment</option>
                <option value="aiforleaders">AI for Leaders</option>
                <option value="pythonprogramming">Python programming</option>
              </ChallengeCategoryDropdown>
            </InputLabelDiv>
            <BlueButton onClick={handleChallengeCreate}>
              {isCreating ? "Creating..." : "Create Challenge"}
            </BlueButton>
            <InputLabelDiv>
              <StyledLabel>User Created:</StyledLabel>
              <p>{`on ${user.date_joined.slice(0, 10)}`}</p>
            </InputLabelDiv>
          </AddChallenge>
          <ChallengeList>
            {user.fk_challenges_assigned
              ? user.fk_challenges_assigned.map((challenge) => (
                  <GenericChallengeCardSmall
                    key={`challenge ${challenge.id}`}
                    challenge={challenge}
                  />
                ))
              : null}
          </ChallengeList>
        </EditUserChallenge>
      </div>
      <DeleteSave>
        <RedButton onClick={ModalDeleteOpenCloseHandler}>Delete</RedButton>
        {isModalDeleteOpen ? (
          <GenericDeleteModal
            ModalDeleteOpenCloseHandler={ModalDeleteOpenCloseHandler}
            type="users"
            typeId={user.id}
            from="manageusers"
          >
            <p>
              Are you sure you want to delete the User{" "}
              {user.first_name + " " + user.last_name}?
            </p>
          </GenericDeleteModal>
        ) : null}
        <Error errorMessage={non_field_error} />
        <div>
          <BlueButton onClick={editUserHandler}>Cancel</BlueButton>
          <BlueButton onClick={userSaveHandler}>Save</BlueButton>
        </div>
      </DeleteSave>
    </UserCardBig>
  );
};

export default BigCard;
