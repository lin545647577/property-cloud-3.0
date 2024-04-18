import axios from "axios";
import { Message } from "element-ui";
import { getAuthToken, removeAuthToken } from "@/cookie/auth";
import store from "@/store";

axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";

// 请求相应状态码常量
const HttpStatusCode = {
  SUCCESS: 200,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  SERVERERROR: 500,
};

// 创建axios实例
const request = axios.create({
  // 请求接口的baseUrl
  baseURL: process.env.VUE_APP_API_BASE_URL,
  // 超时时间，单位毫秒
  timeout: 30000,
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    if (getAuthToken()) {
      config.headers.Authorization = getAuthToken();
    }
    return config;
  },
  () => {
    Message.error("Initiating request exception");
  }
);

// 响应拦截器
request.interceptors.response.use(
  (res) => {
    if (
      res.config.responseType === "blob" ||
      res.config.responseType === "document"
    ) {
      return res.data;
    }
    let code = res.data.code;
    let msg = res.data.msg;
    if (code === 200) {
      if (res.data.data && Object.keys(res.data).length === 3) {
        return res.data.data;
      } else {
        return res.data;
      }
    } else {
      Message.error(msg);
      return Promise.reject(msg);
    }
  },
  (error) => {
    let status = error.response.status;
    let statusText = error.response.statusText;
    if (status === HttpStatusCode.UNAUTHORIZED) {
      store.dispatch("auth/clearLoginInfo");
      removeAuthToken();
      Message.error(statusText);
    } else if (status === HttpStatusCode.FORBIDDEN) {
      Message.error(statusText);
      return Promise.reject("Forbidden：" + statusText);
    } else if (status === HttpStatusCode.SERVERERROR) {
      Message.error(statusText);
      return Promise.reject("Server error：" + statusText);
    } else {
      Message.error(statusText);
      return Promise.reject(statusText);
    }
  }
);

export default request;
