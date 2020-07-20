import configureStore from "./redux/configureStore.dev";
import {
  getAllProblems as getAllProblemsAction,
  createORUpdateProblem,
  saveSourceCode as saveSourceCodeAction,
  saveMetaData as saveMetaDataAction,
  saveTestCase as saveTestCaseAction,
  deleteTestCase as deleteTestCaseAction,
  getProblemForTryCode as getProblemForTryCodeAction,
  getProblemForUpdate as getProblemForUpdateApi,
} from "./redux/actions/problemsAction";
import {
  login as loginAction,
  logout as logoutAction,
  signup as signupAction,
} from "./redux/actions/authActions";
import { tryCode } from "./api/problemsApi";
let store = configureStore();

function getAllProblems() {
  store.dispatch(getAllProblemsAction({ constants: true })).then(() => {
    alert("data received");
  });
}

function createProblem() {
  let data = {
    title: "abcdef",
    description: "abcd",
    example: "abcd",
    note: "abcd",
    language: [1],
    tag: [1],
    difficulty: 1,
    status: 0,
  };
  store
    .dispatch(createORUpdateProblem(data))
    .then(() => {
      alert("success");
    })
    .catch((e) => {
      console.log("e  ", e);
      alert("error");
    });
}

function update() {
  let data = {
    id: 49,
    title: "abcd",
    description: "abcd",
    example: "abcd",
    note: "abcd",
    language: [1],
    tag: [1],
    difficulty: 1,
    status: 0,
  };
  store
    .dispatch(createORUpdateProblem(data))
    .then(() => {
      alert("updated successfull");
    })
    .catch((e) => {
      console.log("e  ", e);
      alert("error");
    });
}

function logIn() {
  store
    .dispatch(loginAction("sauravsingh124@gmail.com", "srv124"))
    .then(() => {
      alert("login success");
    })
    .catch((errMsg) => {
      alert(errMsg);
    });
}

function logout() {
  store.dispatch(logoutAction());
}

function signup() {
  store
    .dispatch(signupAction("firsName", "lastName", "emaiasl@g.com", "paswsao"))
    .then((data) => {
      alert("signup succes");
    })
    .catch((err) => {
      alert(err);
    });
}

function saveSourceCode() {
  let data = {
    id: 49,
    code: [
      {
        lang_id: 1,
        code_head: "34",
        code_body: "sdf",
        code_tail: "sdfsd",
      },
    ],
  };
  store
    .dispatch(saveSourceCodeAction(data))
    .then(() => {
      alert("code successfully updated");
    })
    .catch((errMsg) => {
      alert(errMsg);
    });
}

function saveMetaData() {
  let data = {
    problem_id: 49,
    no_of_inputs: 1,
    inputs: [
      {
        name: "n",
        type: 1,
      },
    ],
    output_type: 1,
  };
  store
    .dispatch(saveMetaDataAction(data))
    .then(() => {
      alert("metdata update successfull");
    })
    .catch((errMsg) => {
      alert(errMsg);
    });
}

function addTestCase() {
  let data = {
    problem_id: 49,
    type: 1,
    input: [1],
    output: 1,
  };
  store
    .dispatch(saveTestCaseAction(data))
    .then(() => alert("test case added"))
    .catch((e) => alert(e));
}

function updateTestCase() {
  let data = {
    id: 62,
    problem_id: 49,
    type: 1,
    input: [1],
    output: 11,
  };
  store
    .dispatch(saveTestCaseAction(data))
    .then(() => alert("test case updated"))
    .catch((e) => alert(e));
}

function deleteTestCase() {
  let data = {
    id: 62,
    problem_id: 49,
  };
  store
    .dispatch(deleteTestCaseAction(data))
    .then(() => alert("test case deleted"))
    .catch((e) => alert(e));
}

function getProblemForTryCode() {
  let state = store.getState();
  let data = { slug: "kth_smallest_element_in_a_sorted_matrix", params: {} };
  if (state.problems.length == 0) data.params.getAllProblems = true;
  if (Object.keys(state.constants.language).length == 0)
    data.params.constants = true;
  store
    .dispatch(getProblemForTryCodeAction(data))
    .then(() => alert("problem fetch"))
    .catch((e) => alert(e));
}

function getProblemForUpdate() {
  let state = store.getState();
  let data = { slug: "kth_smallest_element_in_a_sorted_matrix", params: {} };
  if (state.problems.length == 0) data.params.getAllProblems = true;
  if (Object.keys(state.constants.language).length == 0)
    data.params.constants = true;
  store
    .dispatch(getProblemForUpdateApi(data))
    .then(() => alert("problem fetch"))
    .catch((e) => alert(e));
}

getProblemForUpdate();
