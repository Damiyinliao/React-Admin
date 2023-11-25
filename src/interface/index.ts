import { ActionFunction, LoaderFunction, ShouldRevalidateFunction } from "react-router-dom";

import { MenuItem } from "@/stores/menu";

export interface BaseResponse<T> {
  code: number;
  data: T;
  msg: string;
}

/**
 * @function useLazy 使用的类型
 */
export namespace Type {
  export type defRC = {
    default: React.ComponentType<any>;
  };
}

export namespace Menu {
  export type MenuItem = {
    id: string;
    name: String;
    path: String;
    children?: React.ReactNode;
  }
}

export namespace Route {
  export interface RouteObject {
    path?: string;
    index?: boolean;
    children?: React.ReactNode;
    caseSensitive?: boolean;
    id?: string;
    loader?: LoaderFunction;
    action?: ActionFunction;
    element?: React.ReactNode | null;
    errorElement?: React.ReactNode | null;
    handle?: any;
    shouldRevalidate?: ShouldRevalidateFunction;
  }
}

export type {
  MenuItem
}