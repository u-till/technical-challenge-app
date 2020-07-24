// Sort / Filter Methods used in components
export const sortByCreated = (arr) => {
    return arr.sort((a, b) => a.created > b.created ? -1 : b.created > a.created ? 1 : 0)
};

export const sortByDifficulty = (arr) => {
    return arr.sort((a, b) => a.difficulty > b.difficulty ? -1 : b.difficulty > a.difficulty ? 1 : 0)
};

export const sortByPointValue = (arr) => {
    return arr.sort((a, b) => a.points_value > b.points_value ? 1 : b.points_value > a.points_value ? -1 : 0)
};

export const sortByDate = (arr) => {
    return arr.sort((a, b) => a.date_joined > b.date_joined ? -1 : b.date_joined > a.date_joined ? 1 : 0)
};

export const sortByLastName = (arr) => {
    return arr.sort((a, b) => a.last_name > b.last_name ? 1 : b.last_name > a.last_name ? -1 : 0)
};

export const filterByStaff = (arr, bool) => {
    if (bool) {
        return arr.filter((user) => user.is_staff)
    } else {
        return arr.filter((user) => !user.is_staff)
    }
};