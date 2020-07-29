import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { rem } from "polished";
import { BaseContainer, PageContainer } from "../../../style/GlobalWrappers";
import { BaseInput } from "../../../style/GlobalInputs";
import { Styledh1 } from "../../../style/GlobalTitles";
import { connect } from "react-redux";
import GenericChallengeCardManage from "../../Shared/GenericCards/GenericChallengeCardManage";
import { getAllChallengesAction } from "../../../store/actions/challengeActions";
import { GenericSpinner } from "../../Shared/GenericSpinner";
import {
  sortByCandidateLastName,
  sortByUpdated,
  sortByStatus,
} from "../../../Helpers";

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

const ManageChallenges = ({ getAllChallengesAction, allChallenges }) => {
  // Used to handle sort by name, status, date created
  const [sort, setSort] = useState("last_name");
  const [search, setSearch] = useState("");
  const inputHandler = (e, func) => {
    func(e.currentTarget.value);
  };
  // Fetches all challenges on component loading
  useEffect(() => {
    getAllChallengesAction();
  }, [getAllChallengesAction]);
  // Used by search input to filter Challenges by candidate last name
  const searchChallenges = allChallenges
    ? allChallenges.filter(
        (challenge) =>
          challenge.candidate.first_name
            .toLowerCase()
            .indexOf(search.toLowerCase()) !== -1 ||
          challenge.candidate.last_name
            .toLowerCase()
            .indexOf(search.toLowerCase()) !== -1
      )
    : null;
  // Renders Challenge Card based on returns from sort/filter/search functions
  const renderChallenges = (searchChallenges) => {
    const mapChallengeCard = (arr) => {
      return arr.map((challenge) => (
        <GenericChallengeCardManage
          key={`Challenge ${challenge.id}`}
          challenge={challenge}
        />
      ));
    };
    switch (sort) {
      case "last_name": {
        return mapChallengeCard(sortByCandidateLastName(searchChallenges));
      }
      case "status": {
        return mapChallengeCard(sortByStatus(searchChallenges));
      }
      default:
        return mapChallengeCard(sortByUpdated(searchChallenges));
    }
  };

  return (
    <PageContainer>
      <ManageChallengesContainer>
        <Styledh1>Challenges</Styledh1>
        <ManageContainer>
          <ListHeader>
            <div>
              <p>Sort by:</p>
              <SortCDropdown
                id="sort"
                name="Sort by"
                value={sort}
                onChange={(e) => inputHandler(e, setSort)}
              >
                <option value="status">Status</option>
                <option value="last_name">Candidate Name</option>
                <option value="date">Date Updated</option>
              </SortCDropdown>
              <SearchCInput
                type="text"
                placeholder="Search..."
                required
                name="search"
                value={search}
                onChange={(e) => {
                  inputHandler(e, setSearch);
                }}
              />
            </div>
          </ListHeader>
          <ChallengesList>
            {allChallenges === null ? (
              <GenericSpinner />
            ) : allChallenges.length > 0 ? (
              renderChallenges(searchChallenges)
            ) : (
              <div>No Challenges to Display</div>
            )}
          </ChallengesList>
        </ManageContainer>
      </ManageChallengesContainer>
    </PageContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    allChallenges: state.challengeReducer.allChallenges,
  };
};

export default connect(mapStateToProps, { getAllChallengesAction })(
  ManageChallenges
);
