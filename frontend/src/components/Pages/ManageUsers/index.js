import React from "react";
import styled from "styled-components";
import { rem } from "polished";

import {
  BaseContainer,
  InputAndLabelContainer,
  PageContainer,
} from "../../../style/GlobalWrappers";
import { BaseInput } from "../../../style/GlobalInputs";
import {
  BlueButton,
  RedButton,
  RoundGreyButton,
} from "../../../style/GlobalButtons";
import avatar from "../../../assets/images/user.png";
import { Styledh1 } from "../../../style/GlobalTitles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GenericQuestionCard from "../../Shared/GenericCards/GenericQuestionCard";
import GenericUserCard from "../../Shared/GenericCards/GenericUserCard";

//////////
// STYLE
//////////

const ManageUsersContainer = styled.div`
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ManageContainer = styled(BaseContainer)`
  flex-grow: 1;
  flex-basis: 0;
  min-width: 700px;
  height: 640px;
  padding: 24px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
`;

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 16px;

  p {
    display: inline;
    margin-right: 12px;
    margin-left: 12px;
  }
  div:last-child {
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const SearchUInput = styled(BaseInput)`
  margin-left: 12px;
  height: 6px;
`;

const SortUDropdown = styled.select`
  background: #ffffff;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 5px;
  height: 38px;
  width: 120px;
  &:focus {
    outline: none;
  }
`;

const UserList = styled.div`
  border: 1px solid #dbdbdb;

  box-sizing: border-box;
  border-radius: 5px;
  overflow-y: scroll;
  padding: 8px;
  height: 100%;
`;

//////////
// REACT
//////////
const ManageUsers = () => {
  return (
    <PageContainer>
      <ManageUsersContainer>
        <Styledh1>Users</Styledh1>
        <ManageContainer>
          <ListHeader>
            <RoundGreyButton>
              <FontAwesomeIcon icon={["fas", "plus"]} />
            </RoundGreyButton>
            <div>
              <p>Role:</p>
              <SortUDropdown id="role" name="Role">
                <option value="All">All</option>
                <option value="Staff">Staff</option>
                <option value="Candidate">Candidate</option>
              </SortUDropdown>
              <p>Sort by:</p>
              <SortUDropdown id="sort" name="Sort by">
                <option value="Date">Date</option>
                <option value="Name">Name</option>
              </SortUDropdown>
              <SearchUInput
                type="text"
                placeholder="Search..."
                required
              ></SearchUInput>
            </div>
          </ListHeader>
          <UserList>
            <GenericUserCard />
            <GenericUserCard />
            <GenericUserCard />
            <GenericUserCard />
            <GenericUserCard />
            <GenericUserCard />
            <GenericUserCard />
          </UserList>
        </ManageContainer>
      </ManageUsersContainer>
    </PageContainer>
  );
};

export default ManageUsers;
