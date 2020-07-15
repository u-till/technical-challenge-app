import React from "react";
import styled from "styled-components";
import { rem } from "polished";

import Header from "../../Shared/Navigation";
import { StartButton } from "../../../style/GlobalButtons";

//////////
// STYLE
//////////
const TechChallengeCont = styled.div`
  width: 1807px;
  height: 711px;
  background: #ffffff;
`;

//////////
// REACT
//////////
const StartChallenge = () => {
  return (
    <>
      <Header></Header>
      <StartButton>Start</StartButton>
      <TechChallengeCont></TechChallengeCont>
    </>
  );
};

export default StartChallenge;
