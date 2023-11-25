import { Skeleton } from "antd";
import React from "react";
import { Type } from "@/interface";

export function useLazy(callback: () => Promise<Type.defRC>) {
  const LazyComp = React.lazy(callback); // 懒加载组件
  return (
    <React.Suspense fallback={<Skeleton active />}>
      <LazyComp />
    </React.Suspense>
  )
}