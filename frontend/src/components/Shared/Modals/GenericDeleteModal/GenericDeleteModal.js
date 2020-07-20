import React, { useState } from "react";
import { rem } from "polished";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GenericTipCard from "../../GenericCards/GenericTipCard";
import { Styledh1, Styledh2 } from "../../../../style/GlobalTitles";
import { BaseContainer } from "../../../../style/GlobalWrappers";
import {
  BlueButton,
  RedButton,
  RoundGreyButton,
} from "../../../../style/GlobalButtons";

const DeleteModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;

const DeleteModalContainer = styled(BaseContainer)`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 16px;
  position: fixed;
  background: white;
  width: 40%;
  height: 180px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  div {
    display: flex;
    justify-content: space-between;
    button {
      margin-left: 0px !important;
    }
  }
`;

const GenericDeleteModal = ({ ModalDeleteOpenCloseHandler, children }) => {
  return (
    <DeleteModalOverlay>
      <DeleteModalContainer>
        <Styledh2>
          <FontAwesomeIcon icon={["fas", "exclamation-triangle"]} /> Warning
        </Styledh2>
        {children}
        <div>
          <BlueButton onClick={ModalDeleteOpenCloseHandler}>Cancel</BlueButton>
          <RedButton>Delete</RedButton>
        </div>
      </DeleteModalContainer>
    </DeleteModalOverlay>
  );
};

export default GenericDeleteModal;
