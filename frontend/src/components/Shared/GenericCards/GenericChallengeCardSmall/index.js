import React, { useState } from "react";
import { rem } from "polished";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BlueButton, RedButton } from "../../../../style/GlobalButtons";
import { Styledh2 } from "../../../../style/GlobalTitles";
import GenericDeleteModal from "../../Modals/GenericDeleteModal/GenericDeleteModal";

//////////
// STYLES
//////////
const ChallengeCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 16px;
  height: ${rem("60px")};
  margin-bottom: 8px;
  p:first-child {
    width: 70%;
  }
  overflow: hidden;
`;

const Challengeh2 = styled(Styledh2)`
  font-size: ${rem("18px")};
`;

const DeleteButton = styled(RedButton)`
  padding: 8px;
  width: ${rem("34px")};
  height: ${rem("34px")};
`;

const SendButton = styled(BlueButton)`
  padding: 8px;
  width: ${rem("34px")};
  height: ${rem("34px")};
`;

//////////
// REACT
//////////

const GenericChallengeCardSmall = ({ challenge }) => {
  const [isModalDeleteOpen, setModalDeleteOpen] = useState(false);

  const ModalDeleteOpenCloseHandler = () => {
    setModalDeleteOpen(!isModalDeleteOpen);
  };

  return (
    <ChallengeCard>
      <Challengeh2>{`Challenge ${challenge.id}`}</Challengeh2>
      <p>{`Status: ${challenge.status}`}</p>
      <DeleteButton onClick={ModalDeleteOpenCloseHandler}>
        <FontAwesomeIcon icon={["far", "trash-alt"]} />
      </DeleteButton>
      {isModalDeleteOpen ? (
        <GenericDeleteModal
          ModalDeleteOpenCloseHandler={ModalDeleteOpenCloseHandler}
        >
          <p>Are you sure you want to delete the Challenge xyz?</p>
        </GenericDeleteModal>
      ) : null}
      <SendButton>
        <FontAwesomeIcon icon={["far", "paper-plane"]} />
      </SendButton>
    </ChallengeCard>
  );
};

export default GenericChallengeCardSmall;
