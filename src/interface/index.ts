export interface BaseResponse<T> {
  code: number;
  data: T;
  msg: string;
}

/**
 * @function useLazy 使用的类型
 */
export type defRC = {
  default: React.ComponentType<any>;
};
