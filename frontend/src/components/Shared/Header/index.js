import React from 'react';
import styled from 'styled-components';

import logo from '../../../assets/images/momentumLogo.png';
import {HeaderLogo} from '../../../style/GlobalIcons';
import {BaseButton} from '../../../style/GlobalButtons'


//////////
// STYLE
//////////
const HeaderContainer = styled.header`
    width: 1920px;
    height: 70px;
    background: white;
    display: flex;
    justify-content: space-around;
`;


const HeaderText = styled.p`
  font-family: Arial, Helvetica, sans-serif;
`;

//////////
// REACT
//////////
const Header = () => {
    return (
      <HeaderContainer>
          <HeaderLogo src={logo}></HeaderLogo>
          <HeaderText>Technical Challenge</HeaderText>
          <BaseButton>Login</BaseButton>
      </HeaderContainer>
    );
  };
  
  export default Header;
  