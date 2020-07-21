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
import { connect, useDispatch } from "react-redux";
import { deleteItemAction } from "../../../../store/actions/deleteAction";
import {
  createUserAction,
  getAllUsersAction,
} from "../../../../store/actions/userActions";
import { getAllQuestionsAction } from "../../../../store/actions/questionActions";
import { getTipsForQuestionAction } from "../../../../store/actions/tipActions";
import Error from "../../Error";
import { BaseInput } from "../../../../style/GlobalInputs";
import { resetError } from "../../../../store/actions/verificationAction";

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
  z-index: 999;
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
  > div:last-child {
    margin-top: 32px;
  }
`;

const EditUserInfo = styled.div`
  display: flex;
  justify-content: space-around;
  height: 100%;
  width: 100%;
  padding-top: 32px;
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

//////////
// REACT
//////////
const UserAddModal = ({
  ModalCreateOpenCloseHandler,
  createUserAction,
  non_field_error,
  fieldErrors,
}) => {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    avatar: null,
    is_staff: false,
  });

  const userSaveHandler = async (e) => {
    e.preventDefault();
    dispatch(resetError());
    const userData = {
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
      is_staff: data.is_staff,
    };
    if (userData["is_staff"] === "true" || userData["is_staff"] === "false") {
      userData["is_staff"] = JSON.parse(userData["is_staff"]);
    }
    const response = await createUserAction(userData);
    if (response.status === 201) {
      ModalCreateOpenCloseHandler();
      dispatch(getAllUsersAction());
    }
  };

  const userCancelHandler = (e) => {
    e.preventDefault();
    dispatch(resetError());
    ModalCreateOpenCloseHandler();
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  return (
    <CreateModalOverlay>
      <CreateModalContainer>
        <Styledh2>
          <FontAwesomeIcon icon={["fas", "user"]} /> Create New User
        </Styledh2>
        <EditUserInfo>
          <div>
            <InputLabelDiv>
              <StyledLabel>Email:</StyledLabel>
              <StyledInput
                type="email"
                placeholder="Email"
                required
                name="email"
                value={data.email}
                onChange={handleInput}
              />
              <Error errorMessage={fieldErrors["email"]} />
            </InputLabelDiv>
            <InputLabelDiv>
              <StyledLabel>First Name:</StyledLabel>
              <StyledInput
                type="text"
                placeholder="First Name"
                required
                name="first_name"
                value={data.first_name}
                onChange={handleInput}
              />
              <Error errorMessage={fieldErrors["first_name"]} />
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
                value={data.phone}
                onChange={handleInput}
              />
              <Error errorMessage={fieldErrors["phone"]} />
            </InputLabelDiv>
            <InputLabelDiv>
              <StyledLabel>Last Name:</StyledLabel>
              <StyledInput
                type="text"
                placeholder="Last Name"
                required
                name="last_name"
                value={data.last_name}
                onChange={handleInput}
              />
              <Error errorMessage={fieldErrors["last_name"]} />
            </InputLabelDiv>
          </div>
        </EditUserInfo>
        <InputLabelDiv>
          <StyledLabel>Role:</StyledLabel>
          <RoleDropdown
            id="role"
            name="is_staff"
            value={data.is_staff}
            onChange={handleInput}
          >
            <option value={true}>Staff</option>
            <option value={false}>Candidate</option>
          </RoleDropdown>
          <Error />
        </InputLabelDiv>
        <div>
          <RedButton onClick={userCancelHandler}>Cancel</RedButton>
          <Error errorMessage={non_field_error} />
          <BlueButton onClick={userSaveHandler}>Add</BlueButton>
        </div>
      </CreateModalContainer>
    </CreateModalOverlay>
  );
};

const mapStateToProps = (state) => {
  return {
    fieldErrors: state.verificationReducer.verificationErrors,
    non_field_error: state.verificationReducer.non_field_error,
  };
};

export default connect(mapStateToProps, { createUserAction })(UserAddModal);
