import React from "react";
import styled from "styled-components";
import { rem } from "polished";

import Header from "../../Shared/Navigation";

//////////
// STYLE
//////////
const Contfinishedchallenge = styled.div`
  margin-top: 30px;
  width: 1507px;
  height: 450px;
  margin-left: 22px;
  background: #ffffff;
  border-radius: 5px;
  display: flex;
  padding: 40px;
`;

const Text = styled.div`
  width: 430px;
  height: 300px;
  background-color: #bbbbbb;
  border-radius: 5px;
`;

const Donetext = styled.p`
  font-size: 40px;
  margin-left: 22px;
`;

//////////
// REACT
//////////
const Finishedchallenge = () => {
  return (
    <>
      <Donetext>Done!</Donetext>
      <Contfinishedchallenge>
        <Text></Text>
      </Contfinishedchallenge>
    </>
  );
};

export default Finishedchallenge;
