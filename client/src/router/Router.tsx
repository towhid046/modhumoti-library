import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "../layouts/MainLayout";
import LoadingSpinner from "../components/shared/LoadingSpinner/LoadingSpinner";
import NotFound from "../pages/NotFound/NotFound";
import DashboardLayout from "../layouts/DashboardLayout";

// Lazy loading components
const Registration = lazy(() => import("../pages/Registration/Registration"));
const Login = lazy(() => import("../pages/Login/Login"));
const Home = lazy(() => import("../pages/Home/Home"));
const Books = lazy(() => import("../pages/Books/Books"));
const Book = lazy(() => import("../pages/Book/Book"));
const Sheets = lazy(() => import("../pages/Sheets/Sheets"));
const Stationary = lazy(() => import("../pages/Stationary/Stationary"));
const ViewCart = lazy(() => import("../pages/ViewCart/ViewCart"));
const Checkout = lazy(() => import("./../pages/Checkout/Checkout"));

// Lazy loading dashboard components
const ManageBooks = lazy(() => import("../pages/Dashboard/ManageBooks/ManageBooks"));
const ManageOrders = lazy(() => import("../pages/Dashboard/ManageOrders/ManageOrders"));
const ManageStationers = lazy(() => import("../pages/Dashboard/ManageStationers/ManageStationers"));
const OrderedBooks = lazy(() => import("../pages/Dashboard/ManageOrders/OrderedBooks/OrderedBooks"));
const OrderedSheets = lazy(() => import("../pages/Dashboard/ManageOrders/OrderedSheets/OrderedSheets"));


const Router = () => {
    const routes = createBrowserRouter([
        {
            path: "/",
            element: <MainLayout />,
            errorElement: <NotFound />,
            children: [
                { path: "/", element: <Suspense fallback={<LoadingSpinner />}><Home /></Suspense> },
                { path: "/books", element: <Suspense fallback={<LoadingSpinner />}><Books /></Suspense> },
                { path: "/books/:id", element: <Suspense fallback={<LoadingSpinner />}><Book /></Suspense> },
                { path: "/sheets", element: <Suspense fallback={<LoadingSpinner />}><Sheets /></Suspense> },
                { path: "/stationary", element: <Suspense fallback={<LoadingSpinner />}><Stationary /></Suspense> },
                { path: "/login", element: <Suspense fallback={<LoadingSpinner />}><Login /></Suspense> },
                { path: "/registration", element: <Suspense fallback={<LoadingSpinner />}><Registration /></Suspense> },
                { path: "/cart", element: <Suspense fallback={<LoadingSpinner />}><ViewCart /></Suspense> },
                { path: "/checkout", element: <Suspense fallback={<LoadingSpinner />}><Checkout /></Suspense> }
            ],
        },
        {
            path: '/dashboard',
            element: <DashboardLayout />,
            errorElement: <NotFound isAdmin={true} />,
            children: [
                { path: '/dashboard', element: <Suspense fallback={<LoadingSpinner />}><ManageBooks /></Suspense> },
                { path: '/dashboard/manage-stationers', element: <Suspense fallback={<LoadingSpinner />}><ManageStationers /></Suspense> },
                {
                    path: '/dashboard/manage-orders',
                    element: <Suspense fallback={<LoadingSpinner />}><ManageOrders /></Suspense>,
                    children: [
                        { path: "/dashboard/manage-orders", element: <Suspense fallback={<LoadingSpinner />}><OrderedBooks /></Suspense> },
                        { path: "/dashboard/manage-orders/ordered-sheets", element: <Suspense fallback={<LoadingSpinner />}><OrderedSheets /></Suspense> }
                    ]
                },
            ]
        }
    ]);
    return routes;
};

export default Router;
