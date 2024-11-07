import useGlobalFuncStore from "@/store/globalFuncStore";
import { ToastCode, ApiVersion, SystemVersion } from "@/types/common";
import { Toast } from 'antd-mobile';
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

interface RequestOptions extends AxiosRequestConfig {
  baseURL: string;
  timeout?: number;
  options?: object;
}

const defaultHeaders = {
  "Content-Type": "application/json", // 设置请求头
  "QL-Source": "ql_toc", // 来源
  "QL-Sys-Version": `${SystemVersion.major}.${SystemVersion.minor}.${SystemVersion.patch}`, // 系统版本号
  "QL-Api-Version": `${ApiVersion.major}.${ApiVersion.minor}.${ApiVersion.patch}`, // API版本号
};

const createRequest = ({
  baseURL,
  timeout = 10000,
  headers = {},
}: RequestOptions): AxiosInstance => {
  // 创建axios实例
  const request = axios.create({
    baseURL, // 设置基础URL，用于所有请求
    timeout, // 设置请求超时时间，单位是毫秒
    headers: { ...defaultHeaders, ...headers },
  });

  // 使用拦截器（interceptor）配置请求和响应
  request.interceptors.request.use(
    (config) => {
      // 做一些设置请求参数的操作
      return config;
    },
    (error) => {
      // 对请求错误做一些处理
      return Promise.reject(error);
    }
  );

  request.interceptors.response.use(
    (response) => {
      const responseData = response.data;
      const { toastCode, message: msg } = responseData;
      if (toastCode === ToastCode.SUCCESS || toastCode === ToastCode.WARNING || toastCode === ToastCode.ERROR) {
        Toast.show({content: msg});
      }
      // 对响应数据做一些处理
      return responseData;
    },
    (error) => {
      const { message: errorMessage = "网络连接错误", code } =
        error?.response?.data || {};
      Toast.show({content: errorMessage});
      if (error?.response?.data?.code === 401) {
        useGlobalFuncStore
          ?.getState?.()
          ?.funcs?.globalNavigate?.("/", { replace: true });
      }
      // 对响应错误做一些处理
      return {
        success: false,
        code,
        data: null,
        message: errorMessage,
      };
    }
  );
  return request;
};

export default createRequest;
