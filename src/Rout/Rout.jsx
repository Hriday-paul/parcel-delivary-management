import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home"
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Private from "../Pages/Shared/Private/Private";
import HomeDashboard from "../Pages/Dashboard/UserDashboard/HomeDashboard/HomeDashboard";
import BookParcel from "../Pages/Dashboard/UserDashboard/BookParcel/BookParcel";
import MyParcels from "../Pages/Dashboard/UserDashboard/MyParcels/MyParcels";
import MyProfile from "../Pages/Dashboard/UserDashboard/MyProfile/MyProfile";
import AdminPrivate from "../Pages/Shared/AdminPrivate/AdminPrivate";
import AllUsers from "../Pages/Dashboard/AdminDashboard/AllUsers/AllUsers";
import DelivaryMans from "../Pages/Dashboard/AdminDashboard/DelivaryMans/DelivaryMans";

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
        element: <Private><Dashboard></Dashboard></Private>,
        children : [
            {
                path: "/dashboard",
                element: <HomeDashboard></HomeDashboard>
            },
            {
                path: "/dashboard/bookParcel",
                element: <BookParcel></BookParcel>
            },
            {
                path : '/dashboard/myParcels',
                element : <MyParcels></MyParcels>
            },
            {
                path : '/dashboard/myProfile',
                element : <Private><MyProfile></MyProfile></Private>
            },
            {
                path : '/dashboard/users',
                element : <AdminPrivate><AllUsers></AllUsers></AdminPrivate>
            },
            {
                path : '/dashboard/deliverymans',
                element : <AdminPrivate><DelivaryMans></DelivaryMans></AdminPrivate>
            }
            
        ]
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