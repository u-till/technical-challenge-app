import React from 'react';
import styled from 'styled-components';
import { rem } from "polished";

import Header from '../Shared/Header';
import { StartButton } from '../../style/GlobalButtons';


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
const TechnicalChallenge = () => {
    return (
      <>
      <Header></Header>
      <StartButton>Start</StartButton>
      <TechChallengeCont></TechChallengeCont>
    </>
    );
  };
  
  export default TechnicalChallenge;
  