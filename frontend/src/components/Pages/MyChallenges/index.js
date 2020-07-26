import React, {useEffect} from "react";
import styled from "styled-components";
import {rem} from "polished";
import {StyledPageTitles} from "../../../style/GlobalTitles/index";
import {PageContainer} from "../../../style/GlobalWrappers/index";
import GenericChallengeCard from "../../Shared/GenericCards/GenericChallengeCard";
import {connect} from "react-redux";
import {getAllUserChallengesAction} from "../../../store/actions/challengeActions";
import {GenericSpinner} from "../../Shared/GenericSpinner";

//////////
// STYLE
//////////

const ChallengesContainer = styled.div`
  height: ${rem("710px")};
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: flex-start;
`;

const ChallengesListContainer = styled.div`
  height: ${rem("640px")};
  width: 100%;
  border-radius: 5px;
  background: white;
  display: flex;
  align-items: flex-start;
  padding: 16px;
  flex-direction: column;
  overflow-y: auto;
`;

//////////
// REACT
//////////
const MyChallenges = ({ getAllUserChallengesAction, userChallenges }) => {
    // Fetches all a logged in User's Challenges on component loading
    useEffect(() => {
        getAllUserChallengesAction();
    }, [getAllUserChallengesAction]);
    // Filters so only challenges the User can still do are displayed, or "No Challenges to Display" if none
    const filterCandidateChallenges = () => {
        const filteredChallenges = userChallenges.filter((challenge) =>
            !(
                challenge.status === "PASSED" ||
                challenge.status === "FAILED" ||
                challenge.status === "NEEDS REVIEW"
            )
        );
        if (filteredChallenges.length) {
            return filteredChallenges.map((challenge) => (
                <GenericChallengeCard
                    key={`Challenge ${challenge.id}`}
                    challenge={challenge}
                />))
        } else {
            return <div>No Challenges to Display</div>
        }
    };

    return (
        <PageContainer>
            <ChallengesContainer>
                <StyledPageTitles>My Challenges</StyledPageTitles>
                <ChallengesListContainer>
                    {userChallenges === null ?
                        <GenericSpinner/> : filterCandidateChallenges()}
                </ChallengesListContainer>
            </ChallengesContainer>
        </PageContainer>
    );
};

const mapStateToProps = (state) => {
    return {
        userChallenges: state.challengeReducer.userChallenges,
    };
};

export default connect(mapStateToProps, {getAllUserChallengesAction})(
    MyChallenges
);
