import React from "react";
import styled from "styled-components";
import { rem } from "polished";

import Header from "../../Shared/Navigation";
import { StyledPageTitles, Styledh3 } from "../../../style/GlobalTitles/index"
import { PageContainer } from "../../../style/GlobalWrappers/index"
import { BigRedButton } from "../../../style/GlobalButtons/index"

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
`

const ExampleImage = styled.img`
  height: 535px;
  width: 710px;
  background-image: url("http://via.placeholder.com/710x535");
`

const ChallengeInstructionsContainer = styled.div`
  height: 640px;
  width: 100%;
  border-radius: 5px;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ChallengeInstructions = styled.div`
  height: 82.5%;
  width: 100%;
  text-justify: auto;
  padding-top: 50px;
`

const LeftSideContainer = styled.div`
  padding-left: 50px;
  height: 100%;
  width: 40%;

`

const RightSideContainer = styled.div`
  padding-right: 50px;
  height: 100%;
  display: flex;
  align-items: center;
`


const P = styled.p`
  font-weight: normal;
  font-size: 14px;
  text-align: justify;
`


const ReadyButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

//////////
// REACT
//////////
const Startchallenge = () => {
  return (
      <PageContainer>
          <InformationContainer>
              <StyledPageTitles>Technical Challenge</StyledPageTitles>
              <ChallengeInstructionsContainer>
                  <LeftSideContainer>
                      <ChallengeInstructions>
                          <P>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</P>
                          <br></br>
                          <P>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</P>
                          <br></br>
                          <P>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</P>
                          </ChallengeInstructions>
                      <ReadyButtonContainer>
                          <Styledh3>Ready?</Styledh3>
                          <BigRedButton>Start</BigRedButton>
                      </ReadyButtonContainer>
                  </LeftSideContainer>
                  <RightSideContainer>
                      <ExampleImage></ExampleImage>
                  </RightSideContainer>

              </ChallengeInstructionsContainer>
          </InformationContainer>
      </PageContainer>
  );
};

export default Startchallenge;
