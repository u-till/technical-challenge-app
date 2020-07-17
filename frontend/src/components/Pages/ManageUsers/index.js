import React from "react";
import styled from "styled-components";
import { rem } from "polished";

import {
  BaseContainer,
  InputAndLabelContainer,
  PageContainer,
} from "../../../style/GlobalWrappers";
import { BaseInput } from "../../../style/GlobalInputs";
import { BlueButton, RedButton } from "../../../style/GlobalButtons";
import avatar from "../../../assets/images/user.png";

//////////
// STYLE
//////////
const Userstext = styled.p`
  padding-top: 70px;
  font-size: 48px;
  padding-left: 110px;
`;

const Containerwrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Firstcontainer = styled.div`
  display: flex;
`;

const Sorttext = styled.p``;

const Dateinput = styled(BaseInput)`
  width: 96px;
  height: 30px;
`;

const Searchinput = styled(BaseInput)`
  width: 250px;
  height: 30px;
`;

const Userscontainerwrapper = styled(BaseContainer)`
  width: 1300px;
  height: 800px;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #ffffff;
`;

const Deletebutton = styled(RedButton)`
  width: 20%;
`;

const Insideuserscontainerwrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
`;

const Insideuserscontainerone = styled.div`
  width: 1230px;
  height: 380px;
  box-shadow: 2px 2px 2px #999;
  border-radius: 5px;
  display: flex;
  border-top: 1px solid grey;
  border-right: 1px solid grey;
  border-bottom: 1px solid grey;
  border-left: 1px solid grey;
`;

const Contuserformularwrapper = styled.div`
  width: 520px;
  height: 380px;
  display: flex;
  justify-content: space-around;
`;

const Contchallengeswrapper = styled.div`
  width: 350px;
  height: 380px;
  display: flex;
  flex-direction: column;
`;

const Challengelabel = styled.label`
  margin-top: 20px;
`;
const Challengeinput = styled(BaseInput)`
  width: 280px;
  height: 30px;
`;

const Addbuttonwrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;
`;

const Addbutton = styled(BlueButton)`
  width: 30%;
`;

const Savebutton = styled(BlueButton)`
  width: 15%;
  height: 30px;
`;

const Contfullstackchallengeswrapper = styled.div`
  width: 700px;
  height: 380px;
  display: flex;
  justify-content: center;
`;

const Fullstackwrapper = styled.div`
  width: 520px;
  height: 300px;
  margin-top: 20px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Fullstackdivins = styled.div`
  width: 500px;
  height: 100px;
  background: #dae0e1;
  margin-left: 10px;
  margin-top: 10px;
`;

const Contuserformularlabel = styled.label`
  margin-top: 20px;
`;
const Contuserformular = styled(BaseInput)`
  margin-bottom: 56px;
  width: 100px;
  height: 30px;
`;

const Formulartwowrapper = styled.div`
  display: flex;
`;

const Eachinputwrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Imagenamewrapper = styled.div`
  display: flex;
`;

const Insideuserscontainertwo = styled.div`
  width: 1230px;
  height: 190px;
  background: #ffffff;
  border-radius: 5px;
  display: flex;
  border-top: 1px solid grey;
  border-right: 1px solid grey;
  border-bottom: 1px solid grey;
  border-left: 1px solid grey;
  img {
    width: 100px;
    height: 100px;
  }
`;

const Staffpencilwrapper = styled.div`
  display: flex;
`;

const Stafftext = styled.p``;

const Userconttext = styled.p``;

const Insideuserscontainerthree = styled.div`
  width: 1230px;
  height: 80px;
  background: #dae0e1;
  border-radius: 5px;
`;

//////////
// REACT
//////////
const ManageUsers = () => {
  return (
    <>
      <Userstext>Users</Userstext>
      <Containerwrapper>
        <Userscontainerwrapper>
          <div>
            <Firstcontainer>
              <Sorttext>Sort by:</Sorttext>
              <Dateinput type="date" placeholder="Date" required></Dateinput>
              <Searchinput
                type="search"
                placeholder="Search"
                required
              ></Searchinput>
            </Firstcontainer>
          </div>
          <Insideuserscontainerwrapper>
            <Insideuserscontainerone>
              <Contuserformularwrapper>
                <div>
                  <Eachinputwrapper>
                    <Contuserformularlabel for="name">
                      First Name:
                    </Contuserformularlabel>
                    <Contuserformular
                      type="name"
                      placeholder=""
                      required
                    ></Contuserformular>
                  </Eachinputwrapper>
                  <Eachinputwrapper>
                    <Contuserformularlabel for="name">
                      Last Name:
                    </Contuserformularlabel>
                    <Contuserformular
                      type="lastname"
                      placeholder=""
                      required
                    ></Contuserformular>
                  </Eachinputwrapper>
                  <Eachinputwrapper>
                    <Contuserformularlabel for="name">
                      Email:
                    </Contuserformularlabel>
                    <Contuserformular
                      type="name"
                      placeholder=""
                      required
                    ></Contuserformular>
                  </Eachinputwrapper>
                  <Eachinputwrapper>
                    <Deletebutton>Delete</Deletebutton>
                  </Eachinputwrapper>
                </div>
                <Formulartwowrapper>
                  <div>
                    <Eachinputwrapper>
                      <Contuserformularlabel for="name">
                        Staff or Candidate:
                      </Contuserformularlabel>
                      <Contuserformular
                        type="name"
                        placeholder=""
                        required
                      ></Contuserformular>
                    </Eachinputwrapper>
                    <Eachinputwrapper>
                      <Contuserformularlabel for="name">
                        Avatar:
                      </Contuserformularlabel>
                      <Contuserformular
                        type="name"
                        placeholder=""
                        required
                      ></Contuserformular>
                    </Eachinputwrapper>
                  </div>
                </Formulartwowrapper>
              </Contuserformularwrapper>
              <Contchallengeswrapper>
                <div>
                  <Eachinputwrapper>
                    <Challengelabel for="name">Challenges:</Challengelabel>
                    <Challengeinput
                      type="text"
                      placeholder=""
                      required
                    ></Challengeinput>
                    <Addbuttonwrapper>
                      <Addbutton>Add</Addbutton>
                    </Addbuttonwrapper>
                  </Eachinputwrapper>
                </div>
              </Contchallengeswrapper>
              <Contfullstackchallengeswrapper>
                <div>
                  <Fullstackwrapper>
                    <Fullstackdivins></Fullstackdivins>
                    <Fullstackdivins></Fullstackdivins>
                  </Fullstackwrapper>
                  <Savebutton>Save</Savebutton>
                </div>
              </Contfullstackchallengeswrapper>
            </Insideuserscontainerone>

            <Insideuserscontainertwo>
              <Imagenamewrapper>
                <img src={avatar}></img>
                <Userconttext>Jane Doe</Userconttext>
              </Imagenamewrapper>
              <Staffpencilwrapper>
                <Stafftext></Stafftext>
              </Staffpencilwrapper>
            </Insideuserscontainertwo>
            <Insideuserscontainerthree></Insideuserscontainerthree>
          </Insideuserscontainerwrapper>
        </Userscontainerwrapper>
      </Containerwrapper>
    </>
  );
};

export default ManageUsers;
