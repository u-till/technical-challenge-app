import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import avatar from "../../../../assets/images/user.png";
import { BaseInput } from "../../../../style/GlobalInputs";
import { BlueButton } from "../../../../style/GlobalButtons";

//////////
// STYLE
//////////

const UserModalContainer = styled.div`
  position: absolute;
  top: 100px;
  z-index: 999;
  float: left;
  overflow: hidden;
  height: 420px;
  width: 320px;
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
  padding: 20px;
`;

const ModalAvatar = styled.div`
  width: 120px;
  height: 120px;
  border: solid 1px rgba(221, 221, 221, 0.67);
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  img {
    width: 120px;
    height: 120px;
  }
`;

const ImgOverlay = styled.div`
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  width: 120px;
  height: 120px;
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
  width: 240px;
  height: 40px;
  padding-bottom: 20px;
  font-size: 16px;
  padding-left: 8px;
`;

//////////
// REACT
//////////

const UserModal = (props) => {
  console.log("feed props", props);

  return (
    <>
      <UserModalContainer>
        <ModalAvatar>
          <img src={avatar}></img>
          <ImgOverlay>
            <FontAwesomeIcon icon={["fas", "pencil-alt"]} />
          </ImgOverlay>
        </ModalAvatar>
        <p>test@domain.com</p>
        <ModalInput type="text" placeholder="First Name" required></ModalInput>
        <ModalInput type="text" placeholder="Last Name" required></ModalInput>
        <ModalInput type="text" placeholder="Phone Nr." required></ModalInput>
        <BlueButton>Save</BlueButton>
      </UserModalContainer>
    </>
  );
};

export default UserModal;
