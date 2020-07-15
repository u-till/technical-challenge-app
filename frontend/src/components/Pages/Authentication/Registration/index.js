import React from "react";
import styled from "styled-components";
import { rem } from "polished";

import Header from "../../../Shared/Navigation";
import {
  BaseContainer,
  InputAndLabelContainer,
  PageContainer,
} from "../../../../style/GlobalWrappers";
import { Styledh1 } from "../../../../style/GlobalTitles";
import { BaseButton, RedButton } from "../../../../style/GlobalButtons";
import { BaseInput } from "../../../../style/GlobalInputs";

//////////
// STYLE
//////////

const SignupContainer = styled(BaseContainer)`
  width: 1244px;
  min-height: 644px;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
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

const SignupButton = styled(RedButton)`
  padding: 13px 40px 13px 40px;
  width: 160px;
`;

const UploadButton = styled(BaseButton)`
  padding: 13px 40px 13px 40px;
  width: 414px;
  height: 72px;
  border-radius: 5px;
  color: #767676;
  background-color: #fff;
  border: 1px solid #dbdbdb;
  font-size: ${rem("20px")};
  :hover {
    border: 1px solid #9a9a9a;
    color: #363636;
  }
`;

//////////
// REACT
//////////
const Registration = () => {
  return (
    <PageContainer>
      <SignupContainer>
        <Styledh1>Registration</Styledh1>
        <SignupSplitContainer>
          <div>
            <SignupInput
              type="email"
              placeholder="Email"
              required
            ></SignupInput>
            <SignupInput
              type="text"
              placeholder="First Name"
              required
            ></SignupInput>
            <SignupInput
              type="text"
              placeholder="Last Name"
              required
            ></SignupInput>
            <BtnWrapper>
              <UploadButton>Upload Avatar</UploadButton>
            </BtnWrapper>
          </div>
          <div>
            <SignupInput
              type="password"
              placeholder="Password"
              required
            ></SignupInput>
            <SignupInput
              type="password"
              placeholder="Password"
              required
            ></SignupInput>
            <SignupInput type="text" placeholder="Code" required></SignupInput>
            <BtnWrapper>
              <SignupButton>Register</SignupButton>
            </BtnWrapper>
          </div>
        </SignupSplitContainer>
      </SignupContainer>
    </PageContainer>
  );
};

export default Registration;
