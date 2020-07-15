import React from "react";
import styled from "styled-components";
import { rem } from "polished";

import logo from "../../../assets/images/momentum-tech-challenge-logo.png";
import { HeaderLogo } from "../../../style/GlobalIcons";
import { RedButton } from "../../../style/GlobalButtons";
import { NavLink } from "react-router-dom";
import avatar from "../../../assets/images/user.png";

//////////
// STYLE
//////////

const Wrapper = styled.div`
  padding-top: 70px; /* Needs to be exactly the same height as the Header, offsets content because it's fixed */
`;

/* -----------HEADER------------------ */
const Header = styled.div`
  border-bottom: solid 1px rgba(221, 221, 221, 0.67);
  width: 100%;
  height: 70px;
  display: flex;
  padding: 0 ${rem("30px")} 0 ${rem("30px")};
  position: fixed;
  top: 0;
  z-index: 1000;
  background-color: white;
  justify-content: space-between;
`;

const NavSectionLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-width: 20%;
  cursor: pointer;
`;

const NavSectionRight = styled.div`
  min-width: 40%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  a {
    text-decoration: none;
    margin-right: 32px;
    height: 100%;
    color: #4a4a4a;
    font-style: normal;
    font-weight: normal;
    font-size: ${rem("20px")};
  }
`;

const LogoutButton = styled(RedButton)`
  margin-right: 32px;
`;

const NavbarAvatar = styled.div`
  width: 40px;
  height: 40px;
  border: solid 1px rgba(221, 221, 221, 0.67);
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  img {
    width: 40px;
    height: 40px;
  }
`;

const StyledNavLink = styled(NavLink)`
  width: ${rem("85px")};
  height: 100%;
  padding: 0 ${rem("3px")} 0 ${rem("3px")};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;

  :hover {
    padding-top: 4px;
  }

  :hover:after {
    content: "";
    position: relative;
    bottom: ${rem("-20px")};
    width: ${rem("50px")};
    border-bottom: 3px solid #f37786;
  }
`;

const HeaderText = styled.p``;

//////////
// REACT
//////////
const Navigation = ({ children }) => {
  return (
    <Wrapper>
      <Header>
        <NavSectionLeft>
          <HeaderLogo src={logo}></HeaderLogo>
        </NavSectionLeft>
        <NavSectionRight>
          <StyledNavLink to="/questions">Questions</StyledNavLink>
          <StyledNavLink to="/users">Users</StyledNavLink>
          <LogoutButton>Logout</LogoutButton>
          <NavbarAvatar>
            <img src={avatar}></img>
          </NavbarAvatar>
        </NavSectionRight>
      </Header>
      {children}
    </Wrapper>
  );
};

export default Navigation;
