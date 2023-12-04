import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home"
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Private from "../Pages/Shared/Private/Private";
import BookParcel from "../Pages/Dashboard/UserDashboard/BookParcel/BookParcel";
import MyParcels from "../Pages/Dashboard/UserDashboard/MyParcels/MyParcels";
import MyProfile from "../Pages/Dashboard/UserDashboard/MyProfile/MyProfile";
import AdminPrivate from "../Pages/Shared/AdminPrivate/AdminPrivate";
import AllUsers from "../Pages/Dashboard/AdminDashboard/AllUsers/AllUsers";
import DelivaryMans from "../Pages/Dashboard/AdminDashboard/DelivaryMans/DelivaryMans";
import AllParcels from "../Pages/Dashboard/AdminDashboard/AllParcels/AllParcels";
import AdminDashBoardHome from "../Pages/Dashboard/AdminDashboard/AdminHome/AdminDashBoardHome";
import HomeDashboard from "../Pages/Dashboard/HomeDashboard/HomeDashboard";
import ReviewPage from "../Pages/Shared/ReviewPage/ReviewPage";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import DelivaryManDashboard from "../Pages/Dashboard/DelivaryManDashboard/DelivaryManDashboard";
import MyDeliveeryList from "../Pages/Dashboard/DelivaryManDashboard/MyDeliveeryList/MyDeliveeryList";
import MyReview from "../Pages/Dashboard/DelivaryManDashboard/MyReview/MyReview";

const rout = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        errorElement : <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/review/:id",
                element: <Private><ReviewPage></ReviewPage></Private>
            },
        ]
    },

    {
        path: "/dashboard",
        element: <Private><Dashboard></Dashboard></Private>,
        children : [
            {
                path: "/dashboard",
                element: <Private><HomeDashboard></HomeDashboard></Private>
            },
            {
                path: "/dashboard/bookParcel",
                element: <Private><BookParcel></BookParcel></Private>
            },
            {
                path : '/dashboard/myParcels',
                element : <Private><MyParcels></MyParcels></Private>
            },
            {
                path : '/dashboard/myProfile',
                element : <Private><MyProfile></MyProfile></Private>
            },
            {
                path: "/dashboard/adminHome",
                element: <Private><AdminPrivate><AdminDashBoardHome></AdminDashBoardHome></AdminPrivate></Private>
            },
            {
                path : '/dashboard/users',
                element : <Private><AdminPrivate><AllUsers></AllUsers></AdminPrivate></Private>
            },
            {
                path : '/dashboard/deliverymans',
                element : <Private><AdminPrivate><DelivaryMans></DelivaryMans></AdminPrivate></Private>
            },
            {
                path : '/dashboard/allParcels',
                element : <Private><AdminPrivate><AllParcels></AllParcels></AdminPrivate></Private>
            },
            {
                path: "/dashboard/DeliveryManHome",
                element: <Private><DelivaryManDashboard></DelivaryManDashboard></Private>
            },
            {
                path : '/dashboard/myDeliverys', 
                element : <Private><MyDeliveeryList></MyDeliveeryList></Private>
            },
            {
                path: "/dashboard/myReview",
                element: <Private><MyReview></MyReview></Private>
            },
            
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