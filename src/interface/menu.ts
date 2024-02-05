import { ActionFunction, LoaderFunction, ShouldRevalidateFunction } from 'react-router-dom';

export type MenuItem = {
  id: string;
  name: String;
  path: String;
  children?: React.ReactNode;
};

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
