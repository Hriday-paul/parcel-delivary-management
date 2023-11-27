import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home"
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Private from "../Pages/Shared/Private/Private";



const rout = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
        ]
    },

    {
        path: "/dashboard",
        element: <Private><Dashboard></Dashboard></Private>
    },

    {
        path: "/login",
        element: <Login></Login>
    },
    {
        path: "/register",
        element: <Register></Register>
    },
])

export default rout;