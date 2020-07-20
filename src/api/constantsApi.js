import { handleResponse, handleError } from "./apiUtils";
import { filter as apiUrl } from "./apiUrls";

const get = apiUrl + `/constant`;

export function getConstants() {
  return fetch(get).then(handleResponse).catch(handleError);
}
