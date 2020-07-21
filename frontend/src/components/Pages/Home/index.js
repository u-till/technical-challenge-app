import React from "react";
//////////
// STYLE
//////////

//////////
// REACT
//////////
const Home = ({ history, userObj }) => {
  if (!userObj) {
    history.push("/login");
  }

  if (userObj && userObj.is_staff) {
    history.push("/manageusers");
  }

  if (userObj && !userObj.is_staff) {
    history.push("/mychallenges");
  }

  return (
    <div>
      <p>Welcome to Propulsion Academy Technical Interview Portal</p>
    </div>
  );
};

export default Home;
