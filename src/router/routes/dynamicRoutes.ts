import { RouteObject } from "react-router-dom";
import Home from "@/pages/home";
import SystemMenu from "@/pages/system/menu";
import Cropper from "@/pages/tool/cropper";

const dynamicRoutes: RouteObject[] = [
    {
        path: "/home",
        Component: Home
    },
    {
        path: "/tool/cropper",
        Component: Cropper
    },
    {
        path: "/system/menu",
        Component: SystemMenu
    }
];
export default dynamicRoutes;