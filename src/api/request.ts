import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig
} from 'axios';

export type Response<T> = Promise<[boolean, T, AxiosResponse<T>]>;

class Request {
  private axiosInstance: AxiosInstance;

  constructor(config: CreateAxiosDefaults) {
    this.axiosInstance = axios.create(config);
    this.axiosInstance.interceptors.request.use(
      (axiosConfig: InternalAxiosRequestConfig) => this.requestInterceptor(axiosConfig)
    );
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse<unknown, unknown>) => this.responseSuccessInterceptor(response),
      (error: any) => this.responseFailInterceptor(error)
    );
  }

  // 请求拦截器
  private async requestInterceptor(config: InternalAxiosRequestConfig): Promise<any> {
    // do something before request is sent
    return Promise.resolve(config);
  }

  // 成功响应拦截器
  private async responseSuccessInterceptor(response: AxiosResponse<any, any>): Promise<any> {
    // do something with response data
    return Promise.resolve([false, response.data, response]);
  }

  // 失败响应拦截器
  private async responseFailInterceptor(error: any): Promise<any> {
    // do something with response error
    return Promise.reject([true, error?.response?.data]);
  }

  // get请求
  public get<T, D = any>(url: string, config?: AxiosRequestConfig<D>): Response<T> {
    return this.axiosInstance.get(url, config);
  }

  // post请求
  public post(url: string, data?: any, config?: InternalAxiosRequestConfig): Promise<any> {
    return this.axiosInstance.post(url, data, config);
  }

  // put请求
  public put(url: string, data?: any, config?: InternalAxiosRequestConfig): Promise<any> {
    return this.axiosInstance.put(url, data, config);
  }

  // delete请求
  public delete(url: string, config?: InternalAxiosRequestConfig): Promise<any> {
    return this.axiosInstance.delete(url, config);
  }
}

const request = new Request({
  // baseURL: 'http://127.0.0.1:7001', // 这里不要配置，会被vite.config.ts中的proxy代理覆盖，导致请求失败
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
});

export default request;