import React, { useEffect, useState } from "react";
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
import { Styledh1 } from "../../../style/GlobalTitles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GenericUserCard from "../../Shared/GenericCards/GenericUserCard";
import { connect } from "react-redux";
import { getAllUsersAction } from "../../../store/actions/userActions";
import GenericSpinner from "../../Shared/GenericSpinner";
import UserAddModal from "../../Shared/Modals/UserAddModal";

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
const ManageUsers = ({ allUsers, getAllUsersAction, notEmpty }) => {
  const displayMessage = () => (!notEmpty ? <GenericSpinner /> : null);

  const [isModalCreateOpen, setModalCreateOpen] = useState(false);

  const ModalCreateOpenCloseHandler = () => {
    setModalCreateOpen(!isModalCreateOpen);
  };

  const [filterRole, setFilterRole] = useState("all");
  const [sort, setSort] = useState("last_name");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllUsersAction();
  }, [getAllUsersAction]);

  const inputHandler = (e, func) => {
    func(e.currentTarget.value);
  };

  const searchedUsers = allUsers.filter(
    (user) =>
      user.first_name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
      user.last_name.toLowerCase().indexOf(search.toLowerCase()) !== -1
  );

  const renderUsers = (searchedUsers) => {
    if (filterRole === "all") {
      if (sort === "last_name") {
        return searchedUsers
          .sort((a, b) =>
            a.last_name > b.last_name ? 1 : b.last_name > a.last_name ? -1 : 0
          )
          .map((user) => (
            <GenericUserCard key={`User ${user.id}`} user={user} />
          ));
      } else {
        return searchedUsers
          .sort((a, b) =>
            a.date_joined > b.date_joined
              ? -1
              : b.date_joined > a.date_joined
              ? 1
              : 0
          )
          .map((user) => (
            <GenericUserCard key={`User ${user.id}`} user={user} />
          ));
      }
    }
    if (filterRole === "staff") {
      if (sort === "last_name") {
        return searchedUsers
          .filter((user) => user.is_staff)
          .sort((a, b) =>
            a.last_name > b.last_name ? 1 : b.last_name > a.last_name ? -1 : 0
          )
          .map((user) => (
            <GenericUserCard key={`User ${user.id}`} user={user} />
          ));
      } else {
        return searchedUsers
          .filter((user) => user.is_staff)
          .sort((a, b) =>
            a.date_joined > b.date_joined
              ? -1
              : b.date_joined > a.date_joined
              ? 1
              : 0
          )
          .map((user) => (
            <GenericUserCard key={`User ${user.id}`} user={user} />
          ));
      }
    }
    if (sort === "last_name") {
      return searchedUsers
        .filter((user) => !user.is_staff)
        .sort((a, b) =>
          a.last_name > b.last_name ? 1 : b.last_name > a.last_name ? -1 : 0
        )
        .map((user) => <GenericUserCard key={`User ${user.id}`} user={user} />);
    } else {
      return searchedUsers
        .filter((user) => !user.is_staff)
        .sort((a, b) =>
          a.date_joined > b.date_joined
            ? -1
            : b.date_joined > a.date_joined
            ? 1
            : 0
        )
        .map((user) => <GenericUserCard key={`User ${user.id}`} user={user} />);
    }
  };

  return (
    <PageContainer>
      <ManageUsersContainer>
        <Styledh1>Users</Styledh1>
        <ManageContainer>
          <ListHeader>
            <RoundGreyButton onClick={ModalCreateOpenCloseHandler}>
              <FontAwesomeIcon icon={["fas", "plus"]} />
            </RoundGreyButton>
            {isModalCreateOpen ? (
              <UserAddModal
                ModalCreateOpenCloseHandler={ModalCreateOpenCloseHandler}
              />
            ) : null}
            <div>
              <p>Role:</p>
              <SortUDropdown
                id="role"
                name="Role"
                value={filterRole}
                onChange={(e) => inputHandler(e, setFilterRole)}
              >
                <option value="all">All</option>
                <option value="staff">Staff</option>
                <option value="candidate">Candidate</option>
              </SortUDropdown>
              <p>Sort by:</p>
              <SortUDropdown
                id="sort"
                name="Sort by"
                value={sort}
                onChange={(e) => inputHandler(e, setSort)}
              >
                <option value="last_name">Last Name</option>
                <option value="date">Date Created</option>
              </SortUDropdown>
              <SearchUInput
                type="text"
                placeholder="Search..."
                required
                value={search}
                onChange={(e) => inputHandler(e, setSearch)}
              />
            </div>
          </ListHeader>
          <UserList>
            {allUsers && notEmpty
              ? renderUsers(searchedUsers)
              : displayMessage()}
          </UserList>
        </ManageContainer>
      </ManageUsersContainer>
    </PageContainer>
  );
};

const mapStateToProps = (state) => {
  const notEmpty = state.userReducer.allUsers.length;
  return {
    allUsers: state.userReducer.allUsers,
    notEmpty: notEmpty,
  };
};

export default connect(mapStateToProps, { getAllUsersAction })(ManageUsers);
