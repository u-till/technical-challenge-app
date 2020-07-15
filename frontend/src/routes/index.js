import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../components/Pages/Home";
import ChallengeTitle from "../components/Pages/ChallengeTitle";
import Login from "../components/Pages/Authentication/Login";
import Registration from "../components/Pages/Authentication/Registration";
import Users from "../components/Pages/Users";
import Questions from "../components/Pages/Questions";
import TechnicalChallenge from "../components/Pages/TechnicalChallenge";
import Done from "../components/Pages/Done";
import Navigation from "../components/Shared/Navigation";

const Routes = () => {
  return (
    <>
      <Router>
        <Switch>
          <Navigation>
            <Route exact path="/" component={Home} />
            <Route exact path="/challengetitle" component={ChallengeTitle} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/registration" component={Registration} />
            <Route
              exact
              path="/technicalchallenge"
              component={TechnicalChallenge}
            />
            <Route exact path="/users" component={Users} />
            <Route exact path="/questions" component={Questions} />
            <Route exact path="/done" component={Done} />
          </Navigation>
        </Switch>
      </Router>
    </>
  );
};

export default Routes;
