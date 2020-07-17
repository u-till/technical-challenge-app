import React from "react";
import styled from "styled-components";
import { rem } from "polished";

import Header from "../../Shared/Navigation";
import { StyledPageTitles, Styledh3 } from "../../../style/GlobalTitles/index";
import { PageContainer } from "../../../style/GlobalWrappers/index";
import { BigRedButton } from "../../../style/GlobalButtons/index";
import GenericChallengeCard from "../../Shared/GenericCards/GenericChallengeCard";

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
const MyChallenges = () => {
  return (
    <PageContainer>
      <ChallengesContainer>
        <StyledPageTitles>My Challenges</StyledPageTitles>
        <ChallengesListContainer>
          <GenericChallengeCard />
        </ChallengesListContainer>
      </ChallengesContainer>
    </PageContainer>
  );
};

export default MyChallenges;
