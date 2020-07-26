

const renderChallengesV2 = (searchChallenges) => {
    const mapChallengeCard = (arr) => {
        return arr.map((challenge) => (
            <GenericChallengeCardManage key={`Challenge ${challenge.id}`} challenge={challenge}/>));
    };
    switch (sort) {
        case ("last_name"): {
            return mapChallengeCard(sortByCandidateLastName(searchChallenges))
        }
        case ("status"): {
            return mapChallengeCard(sortByStatus(searchChallenges))
        }
        default:
            return mapChallengeCard(sortByCreated(searchChallenges))
    }
};
