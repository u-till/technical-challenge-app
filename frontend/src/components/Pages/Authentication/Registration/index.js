import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { rem } from "polished";

import Header from "../../../Shared/Navigation";
import {
  BaseContainer,
  InputAndLabelContainer,
  PageContainer,
} from "../../../../style/GlobalWrappers";
import { Styledh1 } from "../../../../style/GlobalTitles";
import { BaseButton, BigRedButton } from "../../../../style/GlobalButtons";
import { BaseInput } from "../../../../style/GlobalInputs";
import { connect } from "react-redux";
import { verificationAction } from "../../../../store/actions/verificationAction";
import { getUserInformationAction } from "../../../../store/actions/userActions";
import { useRouteMatch } from "react-router-dom";

//////////
// STYLE
//////////

const SignupContainer = styled(BaseContainer)`
  width: 1244px;
  height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const SignupSplitContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  > div {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    padding-left: 16px;
    padding-right: 16px;
  }
`;

const BtnWrapper = styled.div`
  height: 72px;
  margin-bottom: 56px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const SignupInput = styled(BaseInput)`
  margin-bottom: 56px;
  width: 414px;
  height: 72px;
`;

const UploadButton = styled(BaseButton)`
  width: 414px;
  height: 72px;
  border-radius: 5px;
  color: #767676;
  background-color: #fff;
  border: 1px solid #dbdbdb;
  font-size: ${rem("20px")};
  text-align: start;
  :hover {
    border: 1px solid #9a9a9a;
    color: #363636;
  }
`;

const RegistrationButton = styled(BigRedButton)`
  width: 414px;
  height: 72px;
`;

//////////
// REACT
//////////

const Registration = ({
  getUserInformationAction,
  verificationAction,
  history,
  targetUser,
}) => {
  const match = useRouteMatch();

  const [data, setData] = useState({
    email: "testpage@gmail.com",
    first_name: "test",
    last_name: "test",
    phone: "1234567890",
    password: "password01",
    password_repeat: "password01",
    avatar: null,
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const msgData = new FormData();
    msgData.append("email", data.email);
    msgData.append("first_name", data.first_name);
    msgData.append("last_name", data.last_name);
    msgData.append("password", data.password);
    msgData.append("password_repeat", data.password_repeat);
    msgData.append("phone", data.phone);
    if (data.avatar) {
      msgData.append("avatar", data.avatar);
    }
    const response = await verificationAction(match.params.userId, msgData);
    if (response.status === 200) {
      history.push("/");
    }
  };

  return (
    <PageContainer>
      <SignupContainer>
        <Styledh1>Registration</Styledh1>
        <SignupSplitContainer>
          <div>
            <SignupInput
              name="email"
              value={data.email}
              type="email"
              placeholder="Email"
              required
              onChange={handleInput}
            ></SignupInput>
            <SignupInput
              name="first_name"
              value={data.first_name}
              type="text"
              placeholder="First Name"
              required
              onChange={handleInput}
            ></SignupInput>
            <SignupInput
              name="last_name"
              value={data.last_name}
              type="text"
              placeholder="Last Name"
              required
              onChange={handleInput}
            ></SignupInput>
            <BtnWrapper>
              <UploadButton>Upload Avatar</UploadButton>
            </BtnWrapper>
          </div>
          <div>
            <SignupInput
              name="password"
              value={data.password}
              type="password"
              placeholder="Password"
              required
              onChange={handleInput}
            ></SignupInput>
            <SignupInput
              name="password_repeat"
              value={data.password_repeat}
              type="password"
              placeholder="Repeat Password"
              required
              onChange={handleInput}
            ></SignupInput>
            <SignupInput
              name="phone"
              value={data.phone}
              type="text"
              placeholder="Phone"
              required
              onChange={handleInput}
            ></SignupInput>
            <BtnWrapper>
              <RegistrationButton onClick={onSubmitForm}>
                Register
              </RegistrationButton>
            </BtnWrapper>
          </div>
        </SignupSplitContainer>
      </SignupContainer>
    </PageContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    targetUser: state.userReducer.targetUser,
  };
};

export default connect(mapStateToProps, {
  getUserInformationAction,
  verificationAction,
})(Registration);
