import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { rem } from "polished";
import { BaseContainer, PageContainer } from "../../../style/GlobalWrappers";
import { BaseInput } from "../../../style/GlobalInputs";
import { RoundGreyButton } from "../../../style/GlobalButtons";
import { Styledh1 } from "../../../style/GlobalTitles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GenericUserCard from "../../Shared/GenericCards/GenericUserCard";
import { connect } from "react-redux";
import { getAllUsersAction } from "../../../store/actions/userActions";
import UserAddModal from "../../Shared/Modals/UserAddModal";
import { GenericSpinner } from "../../Shared/GenericSpinner";
import { filterByStaff, sortByDate, sortByLastName } from "../../../Helpers";

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
  height: ${rem("640px")};
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
  height: ${rem("6px")};
`;

const SortUDropdown = styled.select`
  background: #ffffff;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 5px;
  height: ${rem("38px")};
  width: ${rem("120px")};
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
  // Used for displaying of the Create New User Modal
  const [isModalCreateOpen, setModalCreateOpen] = useState(false);
  const ModalCreateOpenCloseHandler = () => {
    setModalCreateOpen(!isModalCreateOpen);
  };
  // Used to sort by role, last name, and date created
  const [filterRole, setFilterRole] = useState("all");
  const [sort, setSort] = useState("last_name");
  const [search, setSearch] = useState("");
  const inputHandler = (e, func) => {
    func(e.currentTarget.value);
  };
  // Fetches all Users on component loading
  useEffect(() => {
    getAllUsersAction();
  }, [getAllUsersAction]);
  // Used by search input to filter Users by first/last name
  const searchedUsers = allUsers.filter(
    (user) =>
      user.first_name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
      user.last_name.toLowerCase().indexOf(search.toLowerCase()) !== -1
  );
  // Renders User Cards based on returns from sort/filter/search functions
  const renderUsers = (searchedUsers) => {
    const mapUserCard = (arr) => {
      return arr.map((user) => (
        <GenericUserCard key={`User ${user.id}`} user={user} />
      ));
    };
    switch (filterRole) {
      case "all": {
        if (sort === "last_name") {
          return mapUserCard(sortByLastName(searchedUsers));
        } else {
          return mapUserCard(sortByDate(searchedUsers));
        }
      }
      case "staff": {
        if (sort === "last_name") {
          return mapUserCard(
            sortByLastName(filterByStaff(searchedUsers, true))
          );
        } else {
          return mapUserCard(
            sortByLastName(filterByStaff(searchedUsers, true))
          );
        }
      }
      default:
        if (sort === "last_name") {
          return mapUserCard(
            sortByLastName(filterByStaff(searchedUsers, false))
          );
        } else {
          return mapUserCard(sortByDate(filterByStaff(searchedUsers, false)));
        }
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
                <option value="date">Date Joined</option>
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
            {allUsers && notEmpty ? (
              renderUsers(searchedUsers)
            ) : !notEmpty ? (
              <GenericSpinner />
            ) : null}
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
