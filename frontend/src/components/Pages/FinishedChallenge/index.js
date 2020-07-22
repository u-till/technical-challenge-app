import React from "react";
import styled from "styled-components";
import { rem } from "polished";

import { StyledPageTitles, Styledh3 } from "../../../style/GlobalTitles/index";
import { PageContainer } from "../../../style/GlobalWrappers/index";
import GenericChallengeCard from "../../Shared/GenericCards/GenericChallengeCard";

//////////
// STYLE
//////////

const InformationContainer = styled.div`
  height: 720px;
  width: 99%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: flex-start;
`;

const ChallengeDoneContainer = styled.div`
  height: 640px;
  width: 100%;
  border-radius: 5px;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChallengeDoneInstructions = styled.div`
  height: 82.5%;
  width: 100%;
  text-justify: auto;
  padding-top: 50px;
`;

const LeftSideContainer = styled.div`
  padding-left: 50px;
  height: 100%;
  width: 40%;
`;

const RightSideContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: flex-start;
  width: 60%;
  padding: 50px;
`;

const P = styled.p`
  font-weight: normal;
  font-size: 14px;
  text-align: justify;
`;

//////////
// REACT
//////////
const FinishedChallenge = () => {
  return (
    <PageContainer>
      <InformationContainer>
        <StyledPageTitles>Done!</StyledPageTitles>
        <ChallengeDoneContainer>
          <LeftSideContainer>
            <ChallengeDoneInstructions>
              <P>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </P>
              <br></br>
              <P>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </P>
              <br></br>
              <P>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </P>
            </ChallengeDoneInstructions>
          </LeftSideContainer>
          <RightSideContainer>
            {/*<GenericChallengeCard />*/}
          </RightSideContainer>
        </ChallengeDoneContainer>
      </InformationContainer>
    </PageContainer>
  );
};

export default FinishedChallenge;
