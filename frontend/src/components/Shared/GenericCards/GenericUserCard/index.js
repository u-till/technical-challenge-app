import React, { useState } from "react";
import { rem } from "polished";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RoundGreyButton } from "../../../../style/GlobalButtons";
import { Styledh2 } from "../../../../style/GlobalTitles";
import { connect, useDispatch } from "react-redux";
import { resetError } from "../../../../store/actions/verificationAction";
import {
  editSpecificUserAction,
  getAllUsersAction,
  resendUserValidationAction,
} from "../../../../store/actions/userActions";
import { setLoggedInUserAction } from "../../../../store/actions/loginActions";
import ReactTooltip from "react-tooltip";
import { createUserChallengeAction } from "../../../../store/actions/challengeActions";
import BigCard from "./UserCardBig";

//////////
// STYLES
//////////

const UserCard = styled.div`
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 16px;
  height: ${rem("140px")};
  margin-bottom: 8px;
  overflow: hidden;
  > div:first-child {
    width: 90%;
  }
`;

const UserInfo = styled.div`
  display: flex;
  div:last-child {
    margin-left: 16px;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
`;

const UserAvatar = styled.div`
  width: ${rem("100px")};
  height: ${rem("100px")};
  border: solid 1px rgba(221, 221, 221, 0.67);
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  img {
    width: ${rem("100px")};
    height: ${rem("100px")};
  }
`;

//////////
// REACT
//////////

const GenericUserCard = ({
  user,
  non_field_error,
  fieldErrors,
  editSpecificUserAction,
  createUserChallengeAction,
  resendUserValidationAction,
}) => {
  const dispatch = useDispatch();
  // Used to control the display of Modals, trigger change between small and large User card
  const [isUserEditing, setUserEditing] = useState(false);
  const [isModalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const ModalDeleteOpenCloseHandler = () => {
    setModalDeleteOpen(!isModalDeleteOpen);
  };
  // Used to manage displaying User Data for adding / editing
  const [data, setData] = useState({
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    phone: user.phone ? user.phone : "",
    avatar: null,
    is_staff: user.is_staff,
  });
  // Used to change all local state User data values
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };
  // Following used by Avatar button to handle File upload
  const hiddenFileInput = React.useRef(null);
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const imageSelectHandler = (e) => {
    if (e.target.files[0]) {
      setData({ ...data, avatar: e.target.files[0] });
    }
  };
  // Used by grey edit button to toggle change between small and large User cards
  const editUserHandler = () => {
    dispatch(resetError());
    setData({
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone ? user.phone : "",
      avatar: null,
      is_staff: user.is_staff,
    });
    setUserEditing(!isUserEditing);
  };
  // Used by save button during editing of User's information
  const userSaveHandler = async (e) => {
    e.preventDefault();
    dispatch(resetError());
    const userData = new FormData();
    userData.append("email", data.email);
    userData.append("first_name", data.first_name);
    userData.append("last_name", data.last_name);
    userData.append("phone", data.phone);
    if (data.avatar) {
      userData.append("avatar", data.avatar);
    }
    const response = await editSpecificUserAction(user.id, userData);
    if (response.status === 200) {
      setUserEditing(!isUserEditing);
      dispatch(setLoggedInUserAction());
      dispatch(getAllUsersAction());
    }
  };
  // Used by create challenge button during challenge creation
  const handleChallengeCreate = async (e) => {
    e.preventDefault();
    setIsCreating(true);
    const candidateId = {
      candidate: user.id,
    };
    const response = await createUserChallengeAction(candidateId);
    if (response.status === 200) {
      dispatch(getAllUsersAction());
      setIsCreating(false);
    }
  };
  // Used by resend user validation button
  const resendEmailHandler = async (e) => {
    e.preventDefault();
    //start animation
    const response = await resendUserValidationAction(user.id);
    if (response.status === 200) {
      //stop animation
    }
  };

  return (
    <>
      {isUserEditing ? (
        <BigCard
          data={data}
          handleInput={handleInput}
          fieldErrors={fieldErrors}
          user={user}
          handleClick={handleClick}
          hiddenFileInput={hiddenFileInput}
          imageSelectHandler={imageSelectHandler}
          handleChallengeCreate={handleChallengeCreate}
          isCreating={isCreating}
          ModalDeleteOpenCloseHandler={ModalDeleteOpenCloseHandler}
          isModalDeleteOpen={isModalDeleteOpen}
          non_field_error={non_field_error}
          editUserHandler={editUserHandler}
          userSaveHandler={userSaveHandler}
        />
      ) : (
        <UserCard>
          <UserInfo>
            <UserAvatar>
              <img
                src={
                  user.avatar
                    ? user.avatar
                    : `https://eu.ui-avatars.com/api/?name=${user.first_name}+${user.last_name}`
                }
                alt="avatar"
              />
            </UserAvatar>
            <div>
              <Styledh2>{`${user.first_name} ${user.last_name}`}</Styledh2>
              <p>{user.is_staff ? "Staff" : "Candidate"}</p>
            </div>
          </UserInfo>
          <RoundGreyButton
            onClick={resendEmailHandler}
            data-tip="Resend Verification Email"
          >
            <FontAwesomeIcon icon={["far", "paper-plane"]} />
            <ReactTooltip place="top" type="dark" effect="solid" />
          </RoundGreyButton>
          <RoundGreyButton onClick={editUserHandler}>
            <FontAwesomeIcon icon={["fas", "pencil-alt"]} />
          </RoundGreyButton>
        </UserCard>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    fieldErrors: state.verificationReducer.verificationErrors,
    non_field_error: state.verificationReducer.non_field_error,
    allUsers: state.userReducer.allUsers,
  };
};

export default connect(mapStateToProps, {
  editSpecificUserAction,
  getAllUsersAction,
  createUserChallengeAction,
  resendUserValidationAction,
})(GenericUserCard);
