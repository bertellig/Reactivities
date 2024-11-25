import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import App from "../layout/App";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import TestErrors from "../../features/errors/TestError";
import NotFound from "../../features/errors/NotFound";
import { NavRoutes, NavRoutesKeys } from "../../shared/enums";
import LoginForm from "../../features/users/LogingForm";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: NavRoutes.Activities, element: <ActivityDashboard /> },
            { path: NavRoutes.ActivityDetails, element: <ActivityDetails /> },
            { path: NavRoutes.ActivityCreate, element: <ActivityForm key={NavRoutesKeys.Create} /> },
            { path: NavRoutes.ActivityEdit, element: <ActivityForm key={NavRoutesKeys.Edit} /> },
            { path: NavRoutes.Login, element: <LoginForm /> },
            { path: NavRoutes.Errors, element: <TestErrors /> },
            { path: NavRoutes.NotFound, element: <NotFound /> },
            //{ path: NavRoutes.ServerError, element: <ServerError /> },
            { path: '*', element: <Navigate replace to={NavRoutes.NotFound} /> },
        ]
    }
]

export const router = createBrowserRouter(routes, {
    future: {
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_relativeSplatPath: true,
        v7_skipActionErrorRevalidation: true
    }
});