import React, { useEffect } from "react";
import styled from "styled-components";
import { rem } from "polished";
import Header from "../../Shared/Navigation";
import { StyledPageTitles, Styledh3 } from "../../../style/GlobalTitles/index";
import { PageContainer } from "../../../style/GlobalWrappers/index";
import { BigRedButton } from "../../../style/GlobalButtons/index";
import GenericChallengeCard from "../../Shared/GenericCards/GenericChallengeCard";
import { connect } from "react-redux";
import { getAllUserChallengesAction } from "../../../store/actions/challengeActions";
import GenericSpinner from "../../Shared/GenericSpinner";

//////////
// STYLE
//////////

const ChallengesContainer = styled.div`
  height: 710px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: flex-start;
`;

const ChallengesListContainer = styled.div`
  height: 640px;
  width: 100%;
  border-radius: 5px;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 16px;
`;

//////////
// REACT
//////////
const MyChallenges = ({
  getAllUserChallengesAction,
  userChallenges,
  notEmpty,
}) => {
  useEffect(() => {
    getAllUserChallengesAction();
  }, [getAllUserChallengesAction]);

  return (
    <PageContainer>
      <ChallengesContainer>
        <StyledPageTitles>My Challenges</StyledPageTitles>
        <ChallengesListContainer>
          {userChallenges === null ? (
            <GenericSpinner />
          ) : userChallenges && notEmpty ? (
            userChallenges.map((challenge) => (
              <GenericChallengeCard
                key={`Challenge ${challenge.id}`}
                challenge={challenge}
              />
            ))
          ) : (
            <div>No Challenges to Display</div>
          )}
        </ChallengesListContainer>
      </ChallengesContainer>
    </PageContainer>
  );
};

const mapStateToProps = (state) => {
  const notEmpty = state.challengeReducer.userChallenges.length;
  return {
    userChallenges: state.challengeReducer.userChallenges,
    notEmpty: notEmpty,
  };
};

export default connect(mapStateToProps, { getAllUserChallengesAction })(
  MyChallenges
);
