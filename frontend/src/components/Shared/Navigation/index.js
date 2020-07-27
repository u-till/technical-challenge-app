import React, { useState } from "react";
import styled from "styled-components";
import { rem } from "polished";
import logo from "../../../assets/images/momentum-tech-challenge-logo.png";
import { HeaderLogo } from "../../../style/GlobalIcons";
import { RedButton } from "../../../style/GlobalButtons";
import { NavLink, useHistory } from "react-router-dom";
import UserModal from "./UserModal";
import { connect, useDispatch } from "react-redux";
import { logoutUser } from "../../../store/actions/loginActions";
import Fade from "react-reveal/Fade";
import { resetError } from "../../../store/actions/verificationAction";

//////////
// STYLE
//////////

const Wrapper = styled.div`
  padding-top: 70px; /* Needs to be exactly the same height as the Header, offsets content because it's fixed */
  height: 100vh;
`;

/* -----------HEADER------------------ */
const Header = styled.div`
  border-bottom: solid 1px #dddddd;
  width: 100%;
  height: ${rem("70px")};
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
  width: ${rem("40px")};
  height: ${rem("40px")};
  border: solid 1px rgba(221, 221, 221, 0.67);
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  img {
    width: ${rem("40px")};
    height: ${rem("40px")};
  }
  :hover {
    cursor: pointer;
  }
`;

const activeClassName = "nav-item-active";

const StyledNavLink = styled(NavLink).attrs({ activeClassName })`
  &.${activeClassName} {
    width: ${rem("140px")};
    padding-top: 4px;
    &:after {
      content: "";
      position: relative;
      bottom: ${rem("-20px")};
      width: ${rem("50px")};
      border-bottom: 3px solid #f37786;
    }
    :hover {
      padding-top: 4px;
    }
  }

  width: ${rem("140px")};
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

const StyledFade = styled.div`
  position: absolute;
  top: 100px;
  right: 0px;
`;

//////////
// REACT
//////////

const Navigation = ({ children, userObj, logoutUser }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  // Used to manage the display of the edit User modal
  const [isProfileModalVisible, setProfileModalVisible] = useState(false);
  const showProfileContextHandler = () => {
    setProfileModalVisible(!isProfileModalVisible);
  };
  // Used by the Login button during login request
  const handleLoginClick = () => {
    dispatch(resetError());
    history.push("/login");
  };
  // Used by the Logout button during logout request
  const handleLogoutClick = () => {
    logoutUser();
  };

  return (
    <Wrapper>
      <Header>
        <NavSectionLeft>
          <HeaderLogo src={logo} />
        </NavSectionLeft>
        <NavSectionRight>
          {userObj && userObj.is_staff ? (
            <>
              <StyledNavLink to="/manageusers">Users</StyledNavLink>{" "}
              <StyledNavLink to="/managequestions">Questions</StyledNavLink>
              <StyledNavLink to="/managechallenges">Challenges</StyledNavLink>
            </>
          ) : null}
          {userObj && !userObj.is_staff ? (
            <>
              <StyledNavLink to="/mychallenges">Challenges</StyledNavLink>
            </>
          ) : null}
          {!userObj ? (
            <LogoutButton onClick={handleLoginClick}>Login</LogoutButton>
          ) : (
            <>
              <LogoutButton onClick={handleLogoutClick}>Logout</LogoutButton>
              <NavbarAvatar onClick={showProfileContextHandler}>
                <img
                  src={
                    userObj.avatar
                      ? userObj.avatar
                      : `https://eu.ui-avatars.com/api/?name=${userObj.first_name}+${userObj.last_name}`
                  }
                  alt="avatar"
                />
              </NavbarAvatar>
              <StyledFade>
                <Fade duration={600} top when={isProfileModalVisible}>
                  {isProfileModalVisible && (
                    <UserModal
                      isProfileModalVisible={isProfileModalVisible}
                      showProfileContextHandler={showProfileContextHandler}
                      userObj={userObj}
                    />
                  )}
                </Fade>
              </StyledFade>
            </>
          )}
        </NavSectionRight>
      </Header>
      {children}
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    userObj: state.authReducer.userObj,
  };
};

export default connect(mapStateToProps, { logoutUser })(Navigation);
