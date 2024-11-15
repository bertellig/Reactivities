import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../layout/App";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App></App>
    }
]

export const fouter = createBrowserRouter(routes);