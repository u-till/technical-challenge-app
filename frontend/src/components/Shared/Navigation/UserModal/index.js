import React, { useState } from "react";
import { rem } from "polished";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { BaseInput } from "../../../../style/GlobalInputs";
import { BlueButton, RedButton } from "../../../../style/GlobalButtons";
import { resetError } from "../../../../store/actions/verificationAction";
import { useDispatch } from "react-redux";
import {
  editSpecificUserAction,
  getAllUsersAction,
} from "../../../../store/actions/userActions";
import { setLoggedInUserAction } from "../../../../store/actions/loginActions";

//////////
// STYLE
//////////

const UserModalContainer = styled.div`
  //position: absolute;
  //top: 60px;
  //right: 0px;
  //z-index: 999;
  //float: left;
  overflow: hidden;
  height: ${rem("420px")};
  width: ${rem("320px")};
  background-color: #ffffff;
  min-width: 160px;
  background: #ffffff;
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.15), 0px 0px 1px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  z-index: 0;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  padding: 20px 40px 20px 40px;
`;

const ModalAvatar = styled.div`
  width: ${rem("120px")};
  height: ${rem("120px")};
  border: solid 1px rgba(221, 221, 221, 0.67);
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  img {
    width: ${rem("120px")};
    height: ${rem("120px")};
  }
`;

const ImgOverlay = styled.div`
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  width: ${rem("120px")};
  height: ${rem("120px")};
  border-radius: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 48px;
  color: #fff;
  :hover {
    opacity: 1;
  }
`;

const ModalInput = styled(BaseInput)`
  width: ${rem("240px")};
  height: ${rem("40px")};
  padding-bottom: 20px;
  font-size: ${rem("16px")};
  padding-left: 8px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

//////////
// REACT
//////////

const UserModal = ({ userObj, showProfileContextHandler }) => {
  const dispatch = useDispatch();
  // Used to manage the text display of the Save button during edit User request
  const [sendStatus, setSendStatus] = useState(false);
  // Used to manage the local state of all inputs of the component
  const [data, setData] = useState({
    first_name: userObj.first_name ? userObj.first_name : "",
    last_name: userObj.last_name ? userObj.last_name : "",
    phone: userObj.phone ? userObj.phone : "",
    avatar: null,
  });
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };
  // Used by the save button during edit User request
  const onSubmitForm = async (e) => {
    e.preventDefault();
    setSendStatus(true);
    dispatch(resetError());
    const userData = new FormData();
    userData.append("email", userObj.email);
    userData.append("first_name", data.first_name);
    userData.append("last_name", data.last_name);
    userData.append("phone", data.phone);
    if (data.avatar) {
      userData.append("avatar", data.avatar);
    }
    const response = await dispatch(
      editSpecificUserAction(userObj.id, userData)
    );
    setSendStatus(false);
    if (response.status === 200) {
      dispatch(setLoggedInUserAction());
      dispatch(getAllUsersAction());
      showProfileContextHandler();
    }
  };
  // Used to manage the Avatar upload button display
  const hiddenFileInput = React.useRef(null);
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const imageSelectHandler = (e) => {
    if (e.target.files[0]) {
      setData({ ...data, avatar: e.target.files[0] });
    }
  };

  return (
    <>
      <UserModalContainer>
        <ModalAvatar>
          <img
            src={
              data.avatar
                ? URL.createObjectURL(data.avatar)
                : userObj.avatar
                ? userObj.avatar
                : `https://eu.ui-avatars.com/api/?name=${userObj.first_name}+${userObj.last_name}`
            }
            alt="avatar"
          />
          <ImgOverlay onClick={handleClick}>
            <FontAwesomeIcon icon={["fas", "pencil-alt"]} />
            <input
              type="file"
              name="avatar"
              ref={hiddenFileInput}
              onChange={imageSelectHandler}
              style={{ display: "none" }}
            />
          </ImgOverlay>
        </ModalAvatar>
        <p>{userObj.email}</p>
        <ModalInput
          type="text"
          placeholder="First Name"
          value={data.first_name}
          required
          onChange={handleInput}
          name="first_name"
        />
        <ModalInput
          type="text"
          placeholder="Last Name"
          value={data.last_name}
          required
          onChange={handleInput}
          name="last_name"
        />
        <ModalInput
          type="text"
          placeholder="Phone Nr."
          value={data.phone}
          required
          onChange={handleInput}
          name="phone"
        />
        <ButtonWrapper>
          <RedButton onClick={showProfileContextHandler}>Cancel</RedButton>
          <BlueButton onClick={onSubmitForm}>
            {sendStatus ? "Saving..." : "Save"}
          </BlueButton>
        </ButtonWrapper>
      </UserModalContainer>
    </>
  );
};

export default UserModal;
