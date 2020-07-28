import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { rem } from "polished";

import { connect, useDispatch } from "react-redux";
import { passwordResetCodeAction } from "../../../../../store/actions/passwordResetAction";
import Error from "../../../../Shared/Error";
import { resetError } from "../../../../../store/actions/verificationAction";
import { BigRedButton } from "../../../../../style/GlobalButtons";
import { Styledh1 } from "../../../../../style/GlobalTitles";
import { BaseInput } from "../../../../../style/GlobalInputs";
import {
  BaseContainer,
  PageContainer,
} from "../../../../../style/GlobalWrappers";

//////////
// STYLE
//////////

const LoginContainer = styled(BaseContainer)`
  padding-bottom: 40px;
  width: ${rem("700px")};
  height: ${rem("700px")};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const LoginInput = styled(BaseInput)`
  width: ${rem("414px")};
  height: ${rem("72px")};
  border: transparent;
`;

const InteriorContainer = styled.form`
  height: ${rem("300px")};
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

const Icon = styled(FontAwesomeIcon)`
  font-size: ${rem("20px")};
`;

//////////
// REACT
//////////

const SendPasswordReset = ({
  passwordResetCodeAction,
  history,
  fieldErrors,
  non_field_error,
}) => {
  const dispatch = useDispatch();
  // Used to manage the text display of the Send Code button during the request action
  const [sendStatus, setSendStatus] = useState(false);
  // Used to manage the local state of inputs of the component
  const [email, setEmail] = useState("");
  const inputHandler = (e, func) => {
    func(e.currentTarget.value);
  };
  // Used by the Send Code button during password reset creation request
  const onSubmitForm = async (e) => {
    e.preventDefault();
    setSendStatus(true);
    dispatch(resetError());
    const passwordResetData = { email };
    const response = await passwordResetCodeAction(passwordResetData);
    setSendStatus(false);
    if (response.status === 202) {
      history.push("/confirmpasswordreset");
    }
  };

  return (
    <PageContainer>
      <LoginContainer>
        <Styledh1>Password Reset</Styledh1>
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
          <BigRedButton type="submit">
            {sendStatus ? "Sending..." : "Send code"}
          </BigRedButton>
          <Error errorMessage={non_field_error} />
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

export default connect(mapStateToProps, { passwordResetCodeAction })(
  SendPasswordReset
);
