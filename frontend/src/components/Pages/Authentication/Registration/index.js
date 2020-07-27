import React, { useState } from "react";
import styled from "styled-components";
import { rem } from "polished";
import { BaseContainer, PageContainer } from "../../../../style/GlobalWrappers";
import { Styledh1 } from "../../../../style/GlobalTitles";
import { BaseButton, BigRedButton } from "../../../../style/GlobalButtons";
import { BaseInput } from "../../../../style/GlobalInputs";
import { connect, useDispatch } from "react-redux";
import {
  resetError,
  verificationAction,
} from "../../../../store/actions/verificationAction";
import { getUserInformationAction } from "../../../../store/actions/userActions";
import { useRouteMatch } from "react-router-dom";
import queryString from "query-string";
import Error from "../../../Shared/Error";

//////////
// STYLE
//////////

const SignupContainer = styled(BaseContainer)`
  width: ${rem("1044px")};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 24px 24px 48px 24px;
`;

const SignupSplitContainer = styled.div`
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
    padding-bottom: 32px;
  }
`;

const BtnWrapper = styled.div`
  height: ${rem("72px")};
  margin-bottom: 56px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const RegisterBtnWrapper = styled.div`
  height: ${rem("72px")};
  margin-bottom: 56px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin-top: ${rem("27px")};
`;

const SignupInput = styled(BaseInput)`
  width: ${rem("414px")};
  height: ${rem("72px")};
`;

const UploadButton = styled(BaseButton)`
  width: ${rem("414px")};
  height: ${rem("72px")};
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

const Registration = ({
  verificationAction,
  history,
  location,
  fieldErrors,
  non_field_error,
}) => {
  const dispatch = useDispatch();
  const match = useRouteMatch();
  // Used to populate the verification fields from the querystring in the Url contained in the email the User receives
  const queryStringObject = queryString.parse(location.search);
  // Used to manage the text display of the Register button during request
  const [sendStatus, setSendStatus] = useState(false);
  // Used to manage the local state of all inputs on the component
  const [data, setData] = useState({
    email: queryStringObject.email,
    first_name: queryStringObject.first_name,
    last_name: queryStringObject.last_name,
    phone: queryStringObject.phone,
    password: "",
    password_repeat: "",
    avatar: null,
  });
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };
  // Used by the Register button during user verification request
  const onSubmitForm = async (e) => {
    e.preventDefault();
    setSendStatus(true);
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
    setSendStatus(false);
    if (response.status === 202) {
      history.push("/");
    }
  };
  // Used to manage the upload avatar button logic
  const hiddenFileInput = React.useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const imageSelectHandler = (e) => {
    if (e.target.files[0]) {
      setData({ ...data, avatar: e.target.files[0] });
    }
  };

  return (
    <PageContainer>
      <SignupContainer>
        <Styledh1>Verification</Styledh1>
        <SignupSplitContainer>
          <div>
            <InputLabelDiv>
              <StyledLabel>Email:</StyledLabel>
              <SignupInput
                name="email"
                value={data.email}
                type="email"
                placeholder="Email"
                required
                onChange={handleInput}
              />
              <Error errorMessage={fieldErrors["email"]} />
            </InputLabelDiv>

            <InputLabelDiv>
              <StyledLabel>First Name:</StyledLabel>
              <SignupInput
                name="first_name"
                value={data.first_name}
                type="text"
                placeholder="First Name"
                required
                onChange={handleInput}
              />{" "}
              <Error errorMessage={fieldErrors["first_name"]} />
            </InputLabelDiv>
            <InputLabelDiv>
              <StyledLabel>Last Name:</StyledLabel>
              <SignupInput
                name="last_name"
                value={data.last_name}
                type="text"
                placeholder="Last Name"
                required
                onChange={handleInput}
              />
              <Error errorMessage={fieldErrors["last_name"]} />
            </InputLabelDiv>
            <InputLabelDiv>
              <StyledLabel>Avatar:</StyledLabel>
              <BtnWrapper>
                <UploadButton onClick={handleClick}>
                  {data.avatar ? "File Uploaded" : "Upload an Avatar..."}
                </UploadButton>
                <input
                  type="file"
                  name="avatar"
                  ref={hiddenFileInput}
                  onChange={imageSelectHandler}
                  style={{ display: "none" }}
                />
              </BtnWrapper>{" "}
            </InputLabelDiv>
          </div>
          <div>
            <InputLabelDiv>
              <StyledLabel>Password:</StyledLabel>
              <SignupInput
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
              <SignupInput
                name="password_repeat"
                value={data.password_repeat}
                type="password"
                placeholder="Repeat Password"
                required
                onChange={handleInput}
              />
              <Error errorMessage={fieldErrors["password_repeat"]} />
            </InputLabelDiv>

            <InputLabelDiv>
              <StyledLabel>Phone Nr.:</StyledLabel>
              <SignupInput
                name="phone"
                value={data.phone}
                type="text"
                placeholder="Phone"
                required
                onChange={handleInput}
              />
              <Error errorMessage={fieldErrors["phone"]} />{" "}
            </InputLabelDiv>

            <InputLabelDiv>
              <RegisterBtnWrapper>
                <RegistrationButton onClick={onSubmitForm}>
                  {sendStatus ? "Registering..." : "Register"}
                </RegistrationButton>
              </RegisterBtnWrapper>
            </InputLabelDiv>
          </div>
          <Error errorMessage={non_field_error} />
        </SignupSplitContainer>
      </SignupContainer>
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
})(Registration);
