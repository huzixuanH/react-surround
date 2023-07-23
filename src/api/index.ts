import Request from "./request";
import { BASE_URL, TIMEOUT } from "./config";
export const service = new Request({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});
