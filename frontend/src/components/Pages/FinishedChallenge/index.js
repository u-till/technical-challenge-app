import React from "react";
import styled from "styled-components";
import {rem} from "polished";
import {Styledh1} from "../../../style/GlobalTitles/index";
import {BaseContainer, PageContainer} from "../../../style/GlobalWrappers/index";

//////////
// STYLE
//////////

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

const InformationContainer = styled.div`
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  min-width: 800px;
`;

const ExampleImage = styled.div`
  min-height: ${rem("535px")};
  min-width: ${rem("320px")};
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("https://thumbs.gfycat.com/ClassicImaginaryFalcon-size_restricted.gif");
  background-position: center;
`;

const ChallengeDoneContainer = styled(BaseContainer)`
  display: inline-flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  padding: 24px 24px 0 24px;
`;

const LeftSideContainer = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  height: ${rem("535px")};
  min-width: 320px;
  height: 100%;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  margin-right: 24px;
  margin-bottom: 24px;
`;

const ChallengeDone = styled.div`
  width: 100%;
  text-justify: auto;
`;

const RightSideContainer = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  min-width: 320px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;

//////////
// REACT
//////////

const FinishedChallenge = () => {
    return (
        <PageContainer>
            <InformationContainer>
                <Styledh1>Done!</Styledh1>
                <ChallengeDoneContainer>
                    <LeftSideContainer>
                        <ExampleImage/>
                    </LeftSideContainer>
                    <RightSideContainer>
                        <ChallengeDone>
                            <div>
                                <H2>Good job!</H2>
                                <br/>
                                <P>
                                    You will receive an email in your mailbox with information
                                    about the challenge results.
                                </P>
                                <br/>
                                <P>Keep coding!</P>
                            </div>
                        </ChallengeDone>
                    </RightSideContainer>
                </ChallengeDoneContainer>
            </InformationContainer>
        </PageContainer>
    );
};

export default FinishedChallenge;
