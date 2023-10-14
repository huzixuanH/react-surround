import Request from "./request";
import { BASE_URL, TIMEOUT } from "./config";
export const request = new Request({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});

export const fileUploadRequest = new Request({
  baseURL: "https://www.mocky.io/v2/5cc8019d300000980a055e76", // antd example url
  timeout: TIMEOUT,
});
