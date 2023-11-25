import { Response } from "@/api/request";
import { useCallback, useEffect, useRef, useState } from "react";

export interface requestOptions {
  manual?: boolean; // 是否手动触发
  defaultParams?: any; // 默认参数
}

interface RequestResponse<T> {
  error: boolean | undefined;
  data: T | undefined;
  loading: boolean;
  run(...params: any): void;
  runAsync(...params: any): Response<T>;
  refresh(): void;
}

/**
 * @description 请求hook
 * @param serviceApi 请求方法
 * @param options 参数
 */
export default function useRequest<T>(
  serviceApi: (...args: any) => Response<T>,
  options?: requestOptions
): RequestResponse<T> {

  const [loading, setLoading] = useState<boolean>(false); // loading状态
  const [data, setData] = useState<T>();  // 数据
  const [error, setError] = useState<boolean>();  // 错误

  const paramsRef = useRef<any>(options?.defaultParams); // 参数

  /**
   * @description 手动触发
   */
  const resolveData = useCallback(async ()=>{
    console.log('resolveData执行了');
    setLoading(true);
    // const [error, data] = await serviceApi(paramsRef.current);
    const [error, responseData] = await serviceApi(...(options?.defaultParams || []) ); // 这里的...是展开运算符，如果defaultParams是数组，那么就是把数组里面的每一项都展开，如果是对象，那么就是把对象里面的每一项都展开
    setError(error);
    setData(responseData);
    setLoading(false);
  }, [serviceApi, options])

  /**
   * @description 刷新
   */
  const runAsync = useCallback(async (...params: any) => {
    console.log('runAsync执行了');
    paramsRef.current = params;
    setLoading(true);
    const res = await serviceApi(...params);
    const [error, responseData] = res;
    setError(error);
    setData(responseData);
    setLoading(false);
    return res; // 这里的res是一个数组，第一项是error，第二项是responseData...返回全部的数据
  }, [serviceApi]);

  /**
   * @description 刷新
   */
  const run = useCallback(async (...params: any) => {
    await runAsync(...params);
  }, [runAsync]);

  /**
   * @description 刷新
   */
  const refresh = useCallback(() => {
    runAsync(...(paramsRef.current || []));
  }, [runAsync]);

  /**
   * @description 初始化
   */
  useEffect(() => {
    if (!options?.manual) {
      resolveData();
    }
  }, [resolveData, options]);

  return {
    error,
    data,
    loading,
    run,
    runAsync,
    refresh,
  }
}