import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "../components/Home";
import ChallengeTitle from "../components/ChallengeTitle";
import Login from "../components/Login";
import Registration from "../components/Registration";
import Users from "../components/Users";
import Questions from "../components/Questions";
import TechnicalChallenge from "../components/TechnicalChallenge";
import Done from "../components/Done";


const Routes = () => {
  return (
    <>
      <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/challengetitle" component={ChallengeTitle} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/registration" component={Registration} />
            <Route exact path="/technicalchallenge" component={TechnicalChallenge} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/questions" component={Questions} />
            <Route exact path="/done" component={Done} />
        </Switch>
      </Router>
    </>
  );
};

export default Routes;
