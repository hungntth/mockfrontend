import * as types from "../constants";
import CandidateApi from '../../api/CandidateApi';

const listCandidateAction = (candidates, page, totalSize, sortField, sortType) => {
  return {
    type: types.GET_LIST_CANDIDATE,
    payload: {
      candidates,
      // paging
      page,
      totalSize,
      // sorting
      sortField,
      sortType
    }
  };
}

export const getListCandidateAction = (page, size, sortField, sortType, search) => {
  return async dispatch => {
    try {
      const json = await CandidateApi.getAll(page, size, sortField, sortType, search);
      const candidates = json.content;
      const totalSize = json.totalElements;
      dispatch(listCandidateAction(candidates, page, totalSize, sortField, sortType));
    } catch (error) {
      console.log(error);
    }
  }
}