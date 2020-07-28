import React, { useState } from "react";
import styled from "styled-components";
import { rem } from "polished";
import { connect, useDispatch } from "react-redux";
import { resetError } from "../../../../../store/actions/verificationAction";
import Error from "../../../../Shared/Error";
import { BigRedButton } from "../../../../../style/GlobalButtons";
import { BaseInput } from "../../../../../style/GlobalInputs";
import { Styledh1 } from "../../../../../style/GlobalTitles";
import {
  BaseContainer,
  PageContainer,
} from "../../../../../style/GlobalWrappers";
import { confirmPasswordResetAction } from "../../../../../store/actions/passwordResetAction";

//////////
// STYLE
//////////

const ConfirmResetContainer = styled(BaseContainer)`
  width: ${rem("1044px")};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 24px 24px 48px 24px;
`;

const ResetSplitContainer = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
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

const ConfirmBtnWrapper = styled.div`
  height: ${rem("72px")};
  //margin-bottom: 56px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin-top: ${rem("27px")};
`;

const ConfirmInput = styled(BaseInput)`
  width: ${rem("414px")};
  height: ${rem("72px")};
`;

const ConfirmButton = styled(BigRedButton)`
  width: ${rem("414px")};
  height: ${rem("72px")};
`;

const InputLabelDiv = styled.div`
  margin-top: ${rem("26px")};
  height: ${rem("100px")};
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const InputLabelDivBtn = styled.div`
  margin-top: ${rem("26px")};
  height: ${rem("120px")};
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
`;

const StyledLabel = styled.label`
  font-weight: bold;
  margin-bottom: 8px;
`;

//////////
// REACT
//////////

const ConfirmPasswordReset = ({
  history,
  fieldErrors,
  non_field_error,
  confirmPasswordResetAction,
}) => {
  const dispatch = useDispatch();
  // Used to toggle text of button during Password Reset request
  const [sendStatus, setSendStatus] = useState(false);
  // Used to manage local state of text input for Password Reset
  const [data, setData] = useState({
    email: "",
    code: "",
    password: "",
    password_repeat: "",
  });
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };
  // Used by Confirm button during password reset request
  const onSubmitForm = async (e) => {
    e.preventDefault();
    setSendStatus(true);
    dispatch(resetError());
    const userData = {
      email: data.email,
      code: data.code,
      password: data.password,
      password_repeat: data.password_repeat,
    };
    const response = await confirmPasswordResetAction(userData);
    setSendStatus(false);
    if (response.status === 202) {
      history.push("/login");
    }
  };

  return (
    <PageContainer>
      <ConfirmResetContainer>
        <Styledh1>Confirm Password Reset</Styledh1>
        <ResetSplitContainer onSubmit={onSubmitForm}>
          <div>
            <InputLabelDiv>
              <StyledLabel>Email:</StyledLabel>
              <ConfirmInput
                name="email"
                value={data.email}
                type="email"
                placeholder="Email"
                onChange={handleInput}
              />
              <Error errorMessage={fieldErrors["email"]} />
            </InputLabelDiv>

            <InputLabelDiv>
              <StyledLabel>Code:</StyledLabel>
              <ConfirmInput
                name="code"
                value={data.first_name}
                type="text"
                placeholder="Confirmation Code"
                onChange={handleInput}
              />{" "}
              <Error errorMessage={fieldErrors["code"]} />
            </InputLabelDiv>
          </div>
          <div>
            <InputLabelDiv>
              <StyledLabel>Password:</StyledLabel>
              <ConfirmInput
                name="password"
                value={data.password}
                type="password"
                placeholder="Password"
                onChange={handleInput}
              />
              <Error errorMessage={fieldErrors["password"]} />
            </InputLabelDiv>

            <InputLabelDiv>
              <StyledLabel>Repeat Password:</StyledLabel>
              <ConfirmInput
                name="password_repeat"
                value={data.password_repeat}
                type="password"
                placeholder="Repeat Password"
                onChange={handleInput}
              />
              <Error errorMessage={fieldErrors["password_repeat"]} />
            </InputLabelDiv>
          </div>
          <InputLabelDivBtn>
            <Error errorMessage={non_field_error} />
            <ConfirmBtnWrapper>
              <ConfirmButton type="submit">
                {sendStatus ? "Confirming..." : "Confirm"}
              </ConfirmButton>
            </ConfirmBtnWrapper>
          </InputLabelDivBtn>
        </ResetSplitContainer>
      </ConfirmResetContainer>
    </PageContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    fieldErrors: state.verificationReducer.verificationErrors,
    non_field_error: state.verificationReducer.non_field_error,
  };
};

export default connect(mapStateToProps, { confirmPasswordResetAction })(
  ConfirmPasswordReset
);
