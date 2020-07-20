import {
  PROBLEMS_LOADED_SUCCESS,
  PROBLEMS_BY_ID_LOADED_SUCCESS,
  PROBLEMS_BY_SLUG_LOADED_SUCCESS,
  UPDATE_PROBLEM_IN_PROBLEM_BY_ID_SUCCESS,
  ADD_PROBLEM_IN_PROBLEMS_SUCCESS,
  ADD_PROBLEM_IN_PROBLEMS_BY_ID_SUCCESS,
  ADD_PROBLEM_IN_PROBLEMS_BY_SLUG_SUCCESS,
  PROBLEMS_LOADED_BEGIN,
  PROBLEMS_LOADED_COMPLETE,
  ADD_UPDATE_PROBLEM_COMPLETE,
  ADD_UPDATE_PROBLEM_BEGIN,
  UPDATE_PROBLEM_SOURCE_CODE_SUCCESS,
  UPDATE_PROBLEM_META_DATA_SUCCESS,
  ADD_TEST_CASE_BEGIN,
  ADD_TEST_CASE_COMPLETE,
  ADD_TEST_CASE_SUCCESS,
  UPDATE_TEST_CASE_BEGIN,
  UPDATE_TEST_CASE_COMPLETE,
  UPDATE_TEST_CASE_SUCCESS,
  DELETE_TEST_CASE_BEGIN,
  DELETE_TEST_CASE_COMPLETE,
  DELETE_TEST_CASE_SUCCESS,
  SET_CONSTANTS,
  LOAD_TRY_CODE_BEGIN,
  LOAD_TRY_CODE_COMPLETE,
  LOAD_CREATE_UPDATE_PAGE_BEGIN,
  LOAD_CREATE_UPDATE_PAGE_COMPLETE,
} from "./actionTypes";

import {
  getAllProblems as getAllProblemsApi,
  getSourceCode as getSourceCodeApi,
  createORUpdateProblem as createORUpdateProblemApi,
  saveSourceCode as saveSourceCodeApi,
  saveMetaData as saveMetaDataApi,
  saveTestCases as saveTestCaseApi,
  deleteTestCase as deleteTestCaseApi,
  tryCode as tryCodeApi,
} from "../../api/problemsApi";

function setConstants(data) {
  let payload = {
    difficulty: {},
    language: {},
    tag: {},
    variableType: {},
    codeTemplate: {},
  };

  data.difficulty.forEach((item) => (payload.difficulty[item.id] = item.value));
  data.language.forEach((item) => (payload.language[item.id] = item.value));
  data.tag.forEach((item) => (payload.tag[item.id] = item.value));
  data.variable_type.forEach(
    (item) => (payload.variableType[item.id] = item.value)
  );
  data.code_template.forEach(
    (item) => (payload.codeTemplate[item.lang_id] = item)
  );

  return {
    type: SET_CONSTANTS,
    payload,
  };
}

function setAllProblemsData(data) {
  return {
    type: PROBLEMS_LOADED_SUCCESS,
    payload: data.map((element) => element.id),
  };
}

function setProblemById(data) {
  let payload = {};
  data.forEach((element) => {
    payload[element.id] = element;
  });
  return { type: PROBLEMS_BY_ID_LOADED_SUCCESS, payload };
}

function setProblemBySlug(data) {
  let payload = {};
  data.forEach((element) => {
    payload[element.slug] = element.id;
  });
  return { type: PROBLEMS_BY_SLUG_LOADED_SUCCESS, payload };
}

function addInProblemsById(data) {
  return { type: ADD_PROBLEM_IN_PROBLEMS_BY_ID_SUCCESS, payload: data };
}

function addInProblemsBySlug(slug, id) {
  return {
    type: ADD_PROBLEM_IN_PROBLEMS_BY_SLUG_SUCCESS,
    payload: { slug, id },
  };
}
function addInProblems(id) {
  return {
    type: ADD_PROBLEM_IN_PROBLEMS_SUCCESS,
    payload: id,
  };
}

function updateProblem(data) {
  return { type: UPDATE_PROBLEM_IN_PROBLEM_BY_ID_SUCCESS, payload: data };
}

function loadProblemsBegin() {
  return { type: PROBLEMS_LOADED_BEGIN };
}

function loadProblemsCOMPLETE() {
  return { type: PROBLEMS_LOADED_COMPLETE };
}

export function getAllProblems(params) {
  return function (dispatch) {
    dispatch(loadProblemsBegin());
    return getAllProblemsApi(params)
      .then(({ problems, error, constants }) => {
        if (error) {
          throw error;
        } else {
          if (constants) dispatch(setConstants(constants));
          dispatch(setProblemById(problems));
          dispatch(setProblemBySlug(problems));
          dispatch(setAllProblemsData(problems));
          dispatch(loadProblemsCOMPLETE());
        }
      })
      .catch((e) => {
        dispatch(loadProblemsCOMPLETE());
        console.log(e);
        let err = new Error();
        err.msg = "Error in fetching all problems";
        throw err;
      });
  };
}

function getProblemForUpdateBegin() {
  return { type: LOAD_CREATE_UPDATE_PAGE_BEGIN };
}
function getProblemForUpdateComplete() {
  return { type: LOAD_CREATE_UPDATE_PAGE_COMPLETE };
}

export function getProblemForUpdate(data) {
  return function (dispatch) {
    dispatch(getProblemForUpdateBegin());
    return getSourceCodeApi(data.slug, data.params)
      .then(({ constants, problems, problem, error }) => {
        if (error) {
          let err = new Error();
          err.msg = error;
          throw err;
        } else {
          if (constants) dispatch(setConstants(constants));
          if (problems) {
            for (let i in problems) {
              if (problems[i].id === problem.id) {
                problems[i] = problem;
              }
            }
            dispatch(setProblemById(problems));
            dispatch(setProblemBySlug(problems));
            dispatch(setAllProblemsData(problems));
          } else dispatch(updateProblem(problem));
          dispatch(getProblemForUpdateComplete());
        }
      })
      .catch((errMsg) => {
        let err = new Error();
        err.msg = errMsg;
        throw err;
      });
  };
}

function loadTryCodeBegin() {
  return { type: LOAD_TRY_CODE_BEGIN };
}

function loadTryCodeComplete() {
  return { type: LOAD_TRY_CODE_COMPLETE };
}
export function getProblemForTryCode(data) {
  return function (dispatch) {
    dispatch(loadTryCodeBegin());
    return tryCodeApi(data.slug, data.params)
      .then(({ constants, problems, problem, error }) => {
        if (error) {
          throw error;
        } else {
          if (constants) dispatch(setConstants(constants));
          if (problems) {
            for (let i in problems) {
              if (problems[i].id === problem.id) {
                problems[i] = problem;
              }
            }
            dispatch(setProblemById(problems));
            dispatch(setProblemBySlug(problems));
            dispatch(setAllProblemsData(problems));
          } else dispatch(updateProblem(problem));
          dispatch(loadTryCodeComplete());
        }
      })
      .catch((errMsg) => {
        dispatch(loadTryCodeComplete());
        throw errMsg;
      });
  };
}

function addUpdateProblemBegin() {
  return { type: ADD_UPDATE_PROBLEM_BEGIN };
}

function addUpdateProblemCOMPLETE() {
  return { type: ADD_UPDATE_PROBLEM_COMPLETE };
}

export function createORUpdateProblem(data) {
  return function (dispatch) {
    dispatch(addUpdateProblemBegin());
    return createORUpdateProblemApi(data)
      .then(({ error, id, slug }) => {
        if (error) {
          throw error;
        } else if (data.id) {
          data.slug = slug;
          dispatch(updateProblem(data));
          dispatch(addUpdateProblemCOMPLETE());
        } else {
          data.slug = slug;
          data.id = id;
          dispatch(addInProblemsById(data));
          dispatch(addInProblemsBySlug(data.slug, data.id));
          dispatch(addInProblems(data.id));
          dispatch(addUpdateProblemCOMPLETE());
        }
      })
      .catch((err) => {
        dispatch(addUpdateProblemCOMPLETE());
        throw err;
      });
  };
}

function updateProblemSourceCode(data) {
  return { type: UPDATE_PROBLEM_SOURCE_CODE_SUCCESS, payload: data };
}

export function saveSourceCode(data) {
  return function (dispatch) {
    dispatch(addUpdateProblemBegin());
    return saveSourceCodeApi(data)
      .then(({ error }) => {
        if (error) {
          throw error;
        } else {
          dispatch(updateProblemSourceCode(data));
          dispatch(addUpdateProblemCOMPLETE());
        }
      })
      .catch((err) => {
        dispatch(addUpdateProblemCOMPLETE());
        throw err;
      });
  };
}

function updateProblemMetaData(data) {
  let payload = {
    id: data.problem_id,
    meta_data: {
      input_meta_data: {
        no_of_inputs: data.no_of_inputs,
        inputs: data.inputs,
      },
      output_meta_data: {
        output_type: data.output_type,
      },
    },
  };
  return { type: UPDATE_PROBLEM_META_DATA_SUCCESS, payload };
}

export function saveMetaData(data) {
  return function (dispatch) {
    dispatch(addUpdateProblemBegin());
    return saveMetaDataApi(data)
      .then(({ error }) => {
        if (error) {
          throw error;
        } else {
          dispatch(updateProblemMetaData(data));
          dispatch(addUpdateProblemCOMPLETE());
        }
      })
      .catch((err) => {
        dispatch(addUpdateProblemCOMPLETE());
        throw err;
      });
  };
}

function updateTestCaseBegin() {
  return { type: UPDATE_TEST_CASE_BEGIN };
}

function updateTestCaseComplete() {
  return { type: UPDATE_TEST_CASE_COMPLETE };
}

function updateTestCase(data) {
  return { type: UPDATE_TEST_CASE_SUCCESS, payload: data };
}

function addTestCaseBegin() {
  return { type: ADD_TEST_CASE_BEGIN };
}

function addTestCaseComplete() {
  return { type: ADD_TEST_CASE_COMPLETE };
}

function addTestCase(data) {
  return { type: ADD_TEST_CASE_SUCCESS, payload: data };
}

export function saveTestCase(data) {
  return function (dispatch) {
    if (data.id) dispatch(updateTestCaseBegin());
    else dispatch(addTestCaseBegin());
    return saveTestCaseApi(data)
      .then(({ error, insertId }) => {
        if (error) {
          throw error;
        } else if (data.id) {
          dispatch(updateTestCase(data));
          dispatch(updateTestCaseComplete());
        } else {
          data.id = insertId;
          dispatch(addTestCase(data));
          dispatch(addTestCaseComplete());
        }
      })
      .catch((err) => {
        if (data.id) updateTestCaseComplete();
        else addTestCaseComplete();
        throw err;
      });
  };
}

function deleteTestCaseBegin() {
  return { type: DELETE_TEST_CASE_BEGIN };
}

function deleteTestCaseComplete() {
  return { type: DELETE_TEST_CASE_COMPLETE };
}

function deleteTestCaseSuccess(id) {
  return { type: DELETE_TEST_CASE_SUCCESS, id };
}

export function deleteTestCase(data) {
  return function (dispatch) {
    dispatch(deleteTestCaseBegin());
    return deleteTestCaseApi(data)
      .then(({ error }) => {
        if (error) {
          throw error;
        } else {
          dispatch(deleteTestCaseSuccess(data.id));
          dispatch(deleteTestCaseComplete());
        }
      })
      .catch((err) => {
        dispatch(deleteTestCaseComplete());
        throw err;
      });
  };
}
