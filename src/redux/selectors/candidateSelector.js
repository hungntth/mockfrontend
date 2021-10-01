import { createSelector } from "@reduxjs/toolkit";

/** Selector **/
const candidateSelector = (state) => state.candidate;

const selectListCandidateSelector = createSelector(
    candidateSelector,
    state => state.candidates);

const selectPageSelector = createSelector(
    candidateSelector,
    state => state.page);

const selectSizeSelector = createSelector(
    candidateSelector,
    state => state.size);

const selectTotalSizeSelector = createSelector(
    candidateSelector,
    state => state.totalSize);

const selectLoadingSelector = createSelector(
    candidateSelector,
    state => state.isLoading);

const selectSearchSelector = createSelector(
    candidateSelector,
    state => state.isLoading);

/** function */
export const selectListCandidate = (state) => {
    return selectListCandidateSelector(state);
}

export const selectCandidates = (state) => {
    return selectListCandidateSelector(state);
}

export const selectPage = (state) => {
    return selectPageSelector(state);
}

export const selectSize = (state) => {
    return selectSizeSelector(state);
}

export const selectTotalSize = (state) => {
    return selectTotalSizeSelector(state);
}

export const selectLoading = (state) => {
    return selectLoadingSelector(state);
}

export const selectSearch = (state) => {
    return selectSearchSelector(state);
}