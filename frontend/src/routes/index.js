import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../components/Pages/Home";
import Login from "../components/Pages/Authentication/Login";
import Registration from "../components/Pages/Authentication/Registration";
import ManageUsers from "../components/Pages/ManageUsers";
import ManageQuestions from "../components/Pages/ManageQuestions";
import StartChallenge from "../components/Pages/StartChallenge";
import FinishedChallenge from "../components/Pages/FinishedChallenge";
import Navigation from "../components/Shared/Navigation";
import Challenge from "../components/Pages/Challenge";
import MyChallenges from "../components/Pages/MyChallenges";
import AuthComponent from "../HOC";
import ManageChallenges from "../components/Pages/ManageChallenges";

import SendPasswordReset from "../components/Pages/Authentication/PasswordReset/SendReset";
import ConfirmPasswordReset from "../components/Pages/Authentication/PasswordReset/ConfirmReset";

const Routes = () => {
  return (
    <>
      <Router>
        <Switch>
          <Navigation>
            <Route exact path="/" component={AuthComponent(Home)} />
            <Route exact path="/login" component={Login} />
            <Route path="/verification/:userId" component={Registration} />
            <Route
              exact
              path="/sendpasswordreset"
              component={SendPasswordReset}
            />
            <Route
              exact
              path="/confirmpasswordreset"
              component={ConfirmPasswordReset}
            />
            <Route
              exact
              path="/mychallenges"
              component={AuthComponent(MyChallenges)}
            />
            <Route
              path="/startchallenge/:challengeId"
              component={AuthComponent(StartChallenge)}
            />
            <Route
              path="/challenge/:challengeId"
              component={AuthComponent(Challenge)}
            />
            <Route
              exact
              path="/finishedchallenge"
              component={AuthComponent(FinishedChallenge)}
            />
            <Route
              exact
              path="/manageusers"
              component={AuthComponent(ManageUsers)}
            />
            <Route
              exact
              path="/managequestions"
              component={AuthComponent(ManageQuestions)}
            />
            <Route
              exact
              path="/managechallenges"
              component={AuthComponent(ManageChallenges)}
            />
          </Navigation>
        </Switch>
      </Router>
    </>
  );
};

export default Routes;
