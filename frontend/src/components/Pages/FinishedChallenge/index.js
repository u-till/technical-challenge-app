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
  height: 100%;
  width: 60vw;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  text-justify: auto;
  padding-top: 50px;
`;

const DoneText = styled.div`
  height: 100%;
  width: 75%;«
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-justify: auto;
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
  font-size: 20px;
  text-align: justify;
`;

const H2 = styled.h2`
  font-weight: 700;
  font-size: 20px;
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
              <img
                width="172px"
                src="https://thumbs.gfycat.com/ClassicImaginaryFalcon-size_restricted.gif"
              />
              <br></br>
              <br></br>
              <br></br>
              <br></br>

              <DoneText>
                <H2>Good job!</H2>
                <br></br>
                <P>
                  You will receive an email in your mailbox with information
                  about the challenge results.
                </P>
                <br></br>
                <P>Keep coding!</P>
              </DoneText>
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
