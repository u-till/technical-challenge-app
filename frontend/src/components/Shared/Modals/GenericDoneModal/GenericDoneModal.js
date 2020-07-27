import React from "react";
import { rem } from "polished";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Styledh2 } from "../../../../style/GlobalTitles";
import { BaseContainer } from "../../../../style/GlobalWrappers";
import { BlueButton, RedButton } from "../../../../style/GlobalButtons";

const DoneModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const DoneModalContainer = styled(BaseContainer)`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 16px;
  position: fixed;
  background: white;
  width: 40%;
  height: ${rem("180px")};
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
  p {
    font-size: 16px !important;
  }
`;

const GenericDoneModal = ({
  ModalDoneOpenCloseHandler,
  doneHandler,
  sendStatus,
}) => {
  return (
    <DoneModalOverlay>
      <DoneModalContainer>
        <Styledh2>
          <FontAwesomeIcon icon={["fas", "exclamation-triangle"]} /> Warning
        </Styledh2>
        <p>
          Are you sure you want to submit all your code and finish the
          challenge?
        </p>
        <div>
          <BlueButton onClick={ModalDoneOpenCloseHandler}>Cancel</BlueButton>
          <RedButton onClick={doneHandler}>
            {sendStatus ? "Sending..." : "Submit & Finish"}
          </RedButton>
        </div>
      </DoneModalContainer>
    </DoneModalOverlay>
  );
};

export default GenericDoneModal;
