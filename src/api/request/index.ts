import type { AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";
import { checkErrorStatus } from "@/api/util";

/** axios 封装 */
class Request {
  private readonly instance: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);

    // 请求拦截
    this.instance.interceptors.request.use(
      (reqConfig) => {
        return reqConfig;
      },
      (e) => {
        return e;
      }
    );

    // 响应拦截
    this.instance.interceptors.response.use(
      (resp) => {
        // 将data拿出来，减少一层对象嵌套
        return resp.data;
      },
      (e) => {
        const { response } = e;
        if (e.message.indexOf("timeout") !== -1) checkErrorStatus(408);
        else checkErrorStatus(response?.status);

        return e;
      }
    );
  }

  request<T = any>(config: AxiosRequestConfig) {
    return this.instance.request<any, T>(config);
  }

  get<T = any>(config: AxiosRequestConfig) {
    return this.request<T>({ ...config, method: "GET" });
  }

  post<T = any>(config: AxiosRequestConfig) {
    return this.request<T>({ ...config, method: "POST" });
  }
}

export default Request;
