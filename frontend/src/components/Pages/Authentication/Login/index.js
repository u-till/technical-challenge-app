import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { rem } from "polished";

import Header from "../../../Shared/Navigation";
import {
  BaseContainer,
  InputAndLabelContainer,
  PageContainer,
} from "../../../../style/GlobalWrappers";
import { Styledh1 } from "../../../../style/GlobalTitles";
import { BigRedButton } from "../../../../style/GlobalButtons";
import { BaseInput } from "../../../../style/GlobalInputs";
import logo from "../../../../assets/images/logo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { loginAction } from "../../../../store/actions/loginActions";

//////////
// STYLE
//////////

const LoginContainer = styled(BaseContainer)`
  padding-bottom: 40px;
  width: 700px;
  height: 700px;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
`;

const LoginInput = styled(BaseInput)`
  width: 414px;
  height: 72px;
  border: transparent;
`;

const InteriorContainer = styled.div`
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const EmailField = styled.div`
  padding-left: 15px;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
`;

const PasswordField = styled.div`
  padding-left: 15px;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 20px;
`;

//////////
// REACT
//////////

const Login = ({ loginAction, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailChange = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };

  const onPwdChange = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const msgData = { email, password };
    const response = await loginAction(msgData);
    if (response.status === 200) {
      history.push("/");
    }
  };

  return (
    <PageContainer>
      <LoginContainer>
        <Styledh1>Login</Styledh1>
        <InteriorContainer>
          <EmailField>
            <Icon icon={["fas", "user"]} />
            <LoginInput
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={onEmailChange}
            ></LoginInput>
          </EmailField>
          <PasswordField>
            <Icon icon={["fas", "lock"]} />
            <LoginInput
              type="password"
              name="password"
              placeholder="Password"
              onChange={onPwdChange}
              required
            ></LoginInput>
          </PasswordField>
          <BigRedButton onClick={onSubmitForm}>Login</BigRedButton>
        </InteriorContainer>
      </LoginContainer>
    </PageContainer>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { loginAction })(Login);
