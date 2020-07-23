import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {rem} from "polished";
import {BaseContainer, PageContainer} from "../../../style/GlobalWrappers";
import {BaseInput} from "../../../style/GlobalInputs";
import {Styledh1} from "../../../style/GlobalTitles";
import {connect} from "react-redux";
import GenericChallengeCardManage from "../../Shared/GenericCards/GenericChallengeCardManage";
import {getAllChallengesAction} from "../../../store/actions/challengeActions";
import {GenericSpinner} from "../../Shared/GenericSpinner";

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
const ManageChallenges = ({getAllChallengesAction, allChallenges}) => {
    const [sort, setSort] = useState("last_name");
    const [search, setSearch] = useState("");

    useEffect(() => {
        getAllChallengesAction();
    }, [getAllChallengesAction]);

    const inputHandler = (e, func) => {
        func(e.currentTarget.value);
    };

    const searchChallenges =
        allChallenges ?
            (allChallenges.filter((challenge) =>
            challenge.candidate.first_name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
            challenge.candidate.last_name.toLowerCase().indexOf(search.toLowerCase()) !== -1)) : null;


    const renderChallenges = (searchChallenges) => {
        if (sort === "last_name") {
            return searchChallenges.sort((a, b) => a.candidate.last_name > b.candidate.last_name ? 1 : b.candidate.last_name > a.candidate.last_name ? -1 : 0).map(challenge =>
                <GenericChallengeCardManage key={`Challenge ${challenge.id}`} challenge={challenge}/>)
        }
        if (sort === "status") {
            return searchChallenges.sort((a, b) => a.status > b.status ? -1 : b.status > a.status ? 1 : 0).map(challenge =>
                                    <GenericChallengeCardManage key={`Challenge ${challenge.id}`} challenge={challenge}/>)
        }
        if (sort === "date") {
            return searchChallenges.sort((a, b) => a.created > b.created ? -1 : b.created > a.created ? 1 : 0).map(challenge =>
                                    <GenericChallengeCardManage key={`Challenge ${challenge.id}`} challenge={challenge}/>)
        }
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
                            <SortCDropdown
                                id="sort"
                                name="Sort by"
                                value={sort}
                                onChange={(e) => inputHandler(e, setSort)}
                            >
                                <option value="status">Status</option>
                                <option value="last_name">Candidate Name</option>
                                <option value="date">Date Created</option>
                            </SortCDropdown>
                            <SearchCInput
                                type="text"
                                placeholder="Search..."
                                required
                                name="search"
                                value={search}
                                onChange={(e) => {
                                    inputHandler(e, setSearch)
                                }}
                            />
                        </div>
                    </ListHeader>
                    <ChallengesList>
                        {allChallenges === null ?
                            <GenericSpinner/> : allChallenges.length > 0 ? renderChallenges(searchChallenges) :
                                <div>No Challenges to Display</div>}
                        {/*<GenericChallengeCardManage/>*/}
                    </ChallengesList>
                </ManageContainer>
            </ManageChallengesContainer>
        </PageContainer>
        // </Fade>
    );
};

const mapStateToProps = (state) => {
    return {
        allChallenges: state.challengeReducer.allChallenges,
    };
};

export default connect(mapStateToProps, {getAllChallengesAction})(ManageChallenges);
