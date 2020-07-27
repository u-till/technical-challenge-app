import React from "react";
import { rem } from "polished";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BlueButton } from "../../../../style/GlobalButtons";
import { Styledh2 } from "../../../../style/GlobalTitles";
import { useHistory } from "react-router";

//////////
// STYLES
//////////
const ChallengeCard = styled.div`
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 16px;
  min-height: ${rem("100px")};
  margin-bottom: 8px;
  p:first-child {
    width: 70%;
  }
  overflow: hidden;
`;

const StartChallengeButton = styled(BlueButton)`
  width: ${rem("120px")};
  p {
    padding-right: 12px;
    display: inline;
  }
`;

const Challengeh2 = styled(Styledh2)`
  font-size: ${rem("18px")};
`;

//////////
// REACT
//////////

const GenericChallengeCard = ({ challenge }) => {
  const history = useHistory();
  // Used fby start button to push Candidate to the start page of their Challenge
  const onStartHandler = (e) => {
    e.preventDefault();
    history.push(`/startchallenge/${challenge.id}/`);
  };

  return (
    <ChallengeCard>
      <Challengeh2>{`Technical Challenge ${challenge.id}`}</Challengeh2>
      {challenge.status === "PASSED" ||
      challenge.status === "NEEDS REVIEW" ||
      challenge.status === "FAILED" ? (
        <p>{`Score: ${challenge.score}%`}</p>
      ) : (
        <>
          <p>{`Status: ${challenge.status}`}</p>
          <StartChallengeButton onClick={onStartHandler}>
            <p>Start</p>
            <FontAwesomeIcon icon={["fas", "play"]} />
          </StartChallengeButton>
        </>
      )}
    </ChallengeCard>
  );
};

export default GenericChallengeCard;
