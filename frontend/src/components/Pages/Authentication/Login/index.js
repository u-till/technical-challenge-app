import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { rem } from "polished";
import { BaseContainer, PageContainer } from "../../../../style/GlobalWrappers";
import { Styledh1 } from "../../../../style/GlobalTitles";
import { BigRedButton } from "../../../../style/GlobalButtons";
import { BaseInput } from "../../../../style/GlobalInputs";
import { connect, useDispatch } from "react-redux";
import {
  loginAction,
  setLoggedInUserAction,
} from "../../../../store/actions/loginActions";
import Error from "../../../Shared/Error";
import { resetError } from "../../../../store/actions/verificationAction";
import { Link } from "react-router-dom";

//////////
// STYLE
//////////

const LoginContainer = styled(BaseContainer)`
  padding-bottom: 40px;
  width: ${rem("700px")};
  height: ${rem("700px")};
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
`;

const LoginInput = styled(BaseInput)`
  width: ${rem("414px")};
  height: ${rem("72px")};
  border: transparent;
`;

const InteriorContainer = styled.form`
  height: ${rem("350px")};
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
  font-size: ${rem("20px")};
`;

const StyledLink = styled(Link)`
  font-size: 14px;
  color: #00bae5;
  :hover {
    color: #05d0ff;
  }
`;

//////////
// REACT
//////////

const Login = ({
  loginAction,
  history,
  fieldErrors,
  non_field_error,
  setLoggedInUserAction,
}) => {
  const dispatch = useDispatch();
  const [loginStatus, setLoginStatus] = useState(false);
  // Used for managing the local state of inputs of the Component
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const inputHandler = (e, func) => {
    func(e.currentTarget.value);
  };
  // Used by Login button to process the login action
  const onSubmitForm = async (e) => {
    e.preventDefault();
    setLoginStatus(true);
    dispatch(resetError());
    const loginData = { email, password };
    const response = await loginAction(loginData);
    setLoginStatus(false);
    if (response.status === 200) {
      const [setUserResponse, isStaff] = await dispatch(setLoggedInUserAction);
      setUserResponse.status === 200 && isStaff
        ? history.push("/manageusers")
        : history.push("/mychallenges");
    }
  };

  return (
    <PageContainer>
      <LoginContainer>
        <Styledh1>Login</Styledh1>
        <InteriorContainer onSubmit={onSubmitForm}>
          <EmailField>
            <Icon icon={["fas", "user"]} />
            <LoginInput
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => inputHandler(e, setEmail)}
            />
          </EmailField>
          <Error errorMessage={fieldErrors["email"]} />
          <PasswordField>
            <Icon icon={["fas", "lock"]} />
            <LoginInput
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => inputHandler(e, setPassword)}
            />
          </PasswordField>
          <Error errorMessage={fieldErrors["password"]} />
          <BigRedButton type="submit">
            {loginStatus ? "Please Wait..." : "Login"}
          </BigRedButton>
          <Error errorMessage={non_field_error} />
          <StyledLink
            to="/sendpasswordreset"
            onClick={(e) => {
              dispatch(resetError());
            }}
          >
            Forgot Password?
          </StyledLink>
        </InteriorContainer>
      </LoginContainer>
    </PageContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    fieldErrors: state.verificationReducer.verificationErrors,
    non_field_error: state.verificationReducer.non_field_error,
  };
};

export default connect(mapStateToProps, { loginAction, setLoggedInUserAction })(
  Login
);
