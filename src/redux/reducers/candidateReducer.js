import * as types from "../constants";

const initialState = {
  candidates: [],
  page: 1,
  size: 5,
  totalSize: 0,

  sortField: "candidateID",
  sortType: "desc",

  isLoading: false
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_LIST_CANDIDATE:
      return {
        ...state,
        candidates: actions.payload.candidates,

        page: actions.payload.page,
        totalSize:actions.payload.totalSize,

        sortField: actions.payload.sortField,
        sortOrder: actions.payload.sortType,

        isLoading: false
      };
    default:
      return state;
  }
}