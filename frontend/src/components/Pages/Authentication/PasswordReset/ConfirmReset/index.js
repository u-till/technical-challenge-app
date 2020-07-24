import React, { useState } from "react";
import styled from "styled-components";
import { rem } from "polished";

import { connect, useDispatch } from "react-redux";
import {
  resetError,
  verificationAction,
} from "../../../../../store/actions/verificationAction";
import { getUserInformationAction } from "../../../../../store/actions/userActions";
import { useRouteMatch } from "react-router-dom";
import queryString from "query-string";
import Error from "../../../../Shared/Error";
import { BaseButton, BigRedButton } from "../../../../../style/GlobalButtons";
import { BaseInput } from "../../../../../style/GlobalInputs";
import { Styledh1 } from "../../../../../style/GlobalTitles";
import {
  BaseContainer,
  PageContainer,
} from "../../../../../style/GlobalWrappers";

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

const ResetSplitContainer = styled.div`
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
  margin-bottom: 56px;
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

const StyledLabel = styled.label`
  font-weight: bold;
  margin-bottom: 8px;
`;

//////////
// REACT
//////////

const ConfirmPasswordReset = ({
  verificationAction,
  history,
  location,
  fieldErrors,
  non_field_error,
}) => {
  const dispatch = useDispatch();

  const match = useRouteMatch();

  const queryStringObject = queryString.parse(location.search);

  const [data, setData] = useState({
    email: queryStringObject.email,
    phone: queryStringObject.phone,
    password: "",
    password_repeat: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    dispatch(resetError());
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
    if (response.status === 202) {
      history.push("/");
    }
  };

  const hiddenFileInput = React.useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  return (
    <PageContainer>
      <ConfirmResetContainer>
        <Styledh1>Confirm Password Reset</Styledh1>
        <ResetSplitContainer>
          <div>
            <InputLabelDiv>
              <StyledLabel>Email:</StyledLabel>
              <ConfirmInput
                name="email"
                value={data.email}
                type="email"
                placeholder="Email"
                disabled
              />
              <Error errorMessage={fieldErrors["email"]} />
            </InputLabelDiv>

            <InputLabelDiv>
              <StyledLabel>Code:</StyledLabel>
              <ConfirmInput
                name="first_name"
                value={data.first_name}
                type="text"
                placeholder="Confirmation Code"
                required
                onChange={handleInput}
              />{" "}
              <Error errorMessage={fieldErrors["first_name"]} />
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
                required
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
                required
                onChange={handleInput}
              />
              <Error errorMessage={fieldErrors["password_repeat"]} />
            </InputLabelDiv>
          </div>

          <InputLabelDiv>
            <ConfirmBtnWrapper>
              <ConfirmButton onClick={onSubmitForm}>Confirm</ConfirmButton>
            </ConfirmBtnWrapper>
            <Error errorMessage={non_field_error} />
          </InputLabelDiv>
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

export default connect(mapStateToProps, {
  getUserInformationAction,
  verificationAction,
})(ConfirmPasswordReset);
