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
import { Fade } from "react-reveal";
import { GenericSpinner } from "../../Shared/GenericSpinner";
import GenericChallengeCard from "../../Shared/GenericCards/GenericChallengeCard";
import GenericChallengeCardManage from "../../Shared/GenericCards/GenericChallengeCardManage";

//////////
// STYLE
//////////

const ManageChallengesContainer = styled.div`
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

const SearchCInput = styled(BaseInput)`
  margin-left: 12px;
  height: ${rem("6px")};
`;

const SortCDropdown = styled.select`
  background: #ffffff;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 5px;
  height: ${rem("38px")};
  width: ${rem("160px")};
  &:focus {
    outline: none;
  }
`;

const ChallengesList = styled.div`
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
const ManageChallenges = ({}) => {
  const [sort, setSort] = useState("last_name");
  const [search, setSearch] = useState("");

  const inputHandler = (e, func) => {
    func(e.currentTarget.value);
  };

  return (
    // <Fade>
    <PageContainer>
      <ManageChallengesContainer>
        <Styledh1>Challenges</Styledh1>
        <ManageContainer>
          <ListHeader>
            <div>
              <p>Sort by:</p>
              <SortCDropdown id="sort" name="Sort by" value={sort}>
                <option value="status">Status</option>
                <option value="last_name">Candidate Name</option>
                <option value="date">Date Created</option>
              </SortCDropdown>
              <SearchCInput type="text" placeholder="Search..." required />
            </div>
          </ListHeader>
          <ChallengesList>
            <GenericChallengeCardManage />
          </ChallengesList>
        </ManageContainer>
      </ManageChallengesContainer>
    </PageContainer>
    // </Fade>
  );
};

const mapStateToProps = (state) => {
  const notEmpty = state.userReducer.allUsers.length;
  return {
    allUsers: state.userReducer.allUsers,
    notEmpty: notEmpty,
  };
};

export default connect(mapStateToProps, { getAllUsersAction })(
  ManageChallenges
);
