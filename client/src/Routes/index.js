import React from "react";
import { routesObj } from "../common/constants";

const CanInfo = React.lazy(() => import("../components/CanInfo"));
const Vote = React.lazy(() => import("../components/Vote"));
const User = React.lazy(() => import("../components/User"));
const Auth = React.lazy(() => import("../components/Auth"));

const routes = [
    {
        path: routesObj.auth,
        component: Auth,
        requiresAuth: false,
        exact: false,
    },
    {
        path: routesObj.home,
        component: CanInfo,
        requiresAuth: true,
        exact: true,
    },
    {
        path: routesObj.vote,
        component: Vote,
        requiresAuth: true,
        exact: true,
    },
    {
        path: routesObj.me,
        component: User,
        requiresAuth: true,
        exact: true,
    },
];

export default routes;
