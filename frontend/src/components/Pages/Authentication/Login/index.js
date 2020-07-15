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
import { RedButton } from "../../../../style/GlobalButtons";
import { BaseInput } from "../../../../style/GlobalInputs";

//////////
// STYLE
//////////

const LoginContainer = styled(BaseContainer)`
  width: 844px;
  height: 644px;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  div {
    display: flex;

    justify-content: space-around;
    flex-direction: column;
    align-items: center;
  }
`;

const LoginInput = styled(BaseInput)`
  margin-bottom: 56px;
  width: 414px;
  height: 72px;
`;

const LoginButton = styled(RedButton)`
  padding: 13px 40px 13px 40px;
`;

//////////
// REACT
//////////
const Login = () => {
  return (
    <PageContainer>
      <LoginContainer>
        <Styledh1>Login</Styledh1>
        <div>
          <LoginInput type="email" placeholder="Email" required></LoginInput>
          <LoginInput
            type="password"
            placeholder="Password"
            required
          ></LoginInput>
        </div>
        <LoginButton>Login</LoginButton>
      </LoginContainer>
    </PageContainer>
  );
};

export default Login;
