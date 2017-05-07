import {
  SEARCH_REPOS_IS_PENDING,
  SEARCH_REPOS_WAS_SUCCESSFUL,
  SEARCH_REPOS_HAD_ERROR,
  SEARCH_USERS_IS_PENDING,
  SEARCH_USERS_WAS_SUCCESSFUL,
  SEARCH_USERS_HAD_ERROR,
  SEARCH_ISSUES_IS_PENDING,
  SEARCH_ISSUES_WAS_SUCCESSFUL,
  SEARCH_ISSUES_HAD_ERROR,
  SEARCH_PULLS_IS_PENDING,
  SEARCH_PULLS_WAS_SUCCESSFUL,
  SEARCH_PULLS_HAD_ERROR
} from '../constants';

import { fetchSearch } from '../api';

export const searchRepos = (query) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({type: SEARCH_REPOS_IS_PENDING});

    return fetchSearch('repositories', query, accessToken)
      .then(data => {
        dispatch({
          type: SEARCH_REPOS_WAS_SUCCESSFUL,
          payload: data.items,
        });
      })
      .catch(error => {
        dispatch({
          type: SEARCH_REPOS_HAD_ERROR,
          payload: error,
        });
      });
  };
};

export const searchUsers = (query) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({type: SEARCH_USERS_IS_PENDING});

    return fetchSearch('users', query, accessToken)
      .then(data => {
        dispatch({
          type: SEARCH_USERS_WAS_SUCCESSFUL,
          payload: data.items,
        });
      })
      .catch(error => {
        dispatch({
          type: SEARCH_USERS_HAD_ERROR,
          payload: error,
        });
      });
  };
};

export const searchRepoIssues = (query, repoFullName) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({type: SEARCH_ISSUES_IS_PENDING});

    return fetchSearch('issues', query, accessToken, `+repo:${repoFullName}+type:issue`)
      .then(data => {
        dispatch({
          type: SEARCH_ISSUES_WAS_SUCCESSFUL,
          payload: data.items,
        });
      })
      .catch(error => {
        dispatch({
          type: SEARCH_ISSUES_HAD_ERROR,
          payload: error,
        });
      });
  };
};

export const searchRepoPulls = (query, repoFullName) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({type: SEARCH_PULLS_IS_PENDING});

    return fetchSearch('issues', query, accessToken, `+repo:${repoFullName}+type:pr`)
      .then(data => {
        dispatch({
          type: SEARCH_PULLS_WAS_SUCCESSFUL,
          payload: data.items,
        });
      })
      .catch(error => {
        dispatch({
          type: SEARCH_PULLS_HAD_ERROR,
          payload: error,
        });
      });
  };
};