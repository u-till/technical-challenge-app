// --- Sort / Filter Methods used in components ---
export const sortByUpdated = (arr) => {
  return arr.sort((a, b) =>
    a.updated > b.updated ? -1 : b.updated > a.updated ? 1 : 0
  );
};

export const sortByDifficulty = (arr) => {
  return arr.sort((a, b) =>
    a.difficulty > b.difficulty ? 1 : b.difficulty > a.difficulty ? -1 : 0
  );
};

export const sortByPointValue = (arr) => {
  return arr.sort((a, b) =>
    a.points_value > b.points_value
      ? 1
      : b.points_value > a.points_value
      ? -1
      : 0
  );
};

export const sortByDate = (arr) => {
  return arr.sort((a, b) =>
    a.date_joined > b.date_joined ? -1 : b.date_joined > a.date_joined ? 1 : 0
  );
};

export const sortByLastName = (arr) => {
  return arr.sort((a, b) =>
    a.last_name > b.last_name ? 1 : b.last_name > a.last_name ? -1 : 0
  );
};

export const sortByStatus = (arr) => {
  return arr.sort((a, b) =>
    a.status > b.status ? -1 : b.status > a.status ? 1 : 0
  );
};

export const sortByCandidateLastName = (arr) => {
  return arr.sort((a, b) =>
    a.candidate.last_name > b.candidate.last_name
      ? 1
      : b.candidate.last_name > a.candidate.last_name
      ? -1
      : 0
  );
};

export const filterByStaff = (arr, bool) => {
  if (bool) {
    return arr.filter((user) => user.is_staff);
  } else {
    return arr.filter((user) => !user.is_staff);
  }
};
