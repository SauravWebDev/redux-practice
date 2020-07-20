import { handleResponse, handleError } from "./apiUtils";
import { problem as apiUrl } from "./apiUrls";
import { getCookieByName } from "../util/util";
const getAll = apiUrl + `/getAllProblems/`;
const getByIdOrTitle = apiUrl + "/problem/";
const createORUpdate = apiUrl + "/problem/createORUpdate";
const sourceCode = apiUrl + "/problem/sourceCode/";
const saveSourceCodeUrl = apiUrl + "/problem/problemSourceCode/save/";
const tryCodeUrl = apiUrl + "/problem/try/";
const saveTestCasesUrl = apiUrl + "/problem/testCase/save";
const deleteTestCaseUrl = apiUrl + "/problem/testCase/delete";
const saveMetaDataUrl = apiUrl + "/problem/saveMetaData";
const accessToken = "ac-token";
export function getAllProblems(params) {
  let url = new URL(getAll);
  if (params)
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );
  return fetch(url).then(handleResponse).catch(handleError);
}

export function getProblemBySlug(slug, params) {
  let url = new URL(getByIdOrTitle + slug);
  if (params)
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );
  return fetch(url).then(handleResponse).catch(handleError);
}
export function getSourceCode(slug, params) {
  let url = new URL(sourceCode + slug);
  if (params)
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );
  return fetch(url).then(handleResponse).catch(handleError);
}
export function tryCode(slug, params) {
  let url = new URL(tryCodeUrl + slug);
  if (params)
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );
  return fetch(url).then(handleResponse).catch(handleError);
}

export function createORUpdateProblem(data) {
  return fetch(createORUpdate, {
    method: "post",
    mode: "cors",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    headers: {
      "Content-Type": "application/json",
      authorization: "Basic " + getCookieByName(accessToken),
    },
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function saveSourceCode(data) {
  return fetch(saveSourceCodeUrl, {
    method: "post",
    mode: "cors",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function saveTestCases(data) {
  return fetch(saveTestCasesUrl, {
    method: "post",
    mode: "cors",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteTestCase(data) {
  return fetch(deleteTestCaseUrl, {
    method: "post",
    mode: "cors",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function saveMetaData(data) {
  return fetch(saveMetaDataUrl, {
    method: "post",
    mode: "cors",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .catch(handleError);
}
