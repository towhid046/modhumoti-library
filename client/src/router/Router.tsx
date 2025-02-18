import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "../layouts/MainLayout";
import LoadingSpinner from "../components/shared/LoadingSpinner/LoadingSpinner";

// Lazy loading components
const Home = lazy(() => import("../pages/Home/Home"));
const Books = lazy(() => import("../pages/Books/Books"));
const Book = lazy(() => import("../pages/Book/Book"));
const Sheets = lazy(() => import("../pages/Sheets/Sheets"));
const Stationary = lazy(() => import("../pages/Stationary/Stationary"));
const Login = lazy(() => import("../pages/Login/Login"));
const Registration = lazy(() => import("../pages/Registration/Registration"));

const Router = () => {
    const routes = createBrowserRouter([
        {
            path: "/",
            element: <MainLayout />,
            children: [
                { path: "/", element: <Suspense fallback={<LoadingSpinner />}><Home /></Suspense> },
                { path: "/books", element: <Suspense fallback={<LoadingSpinner />}><Books /></Suspense> },
                { path: "/books/:id", element: <Suspense fallback={<LoadingSpinner />}><Book /></Suspense> },
                { path: "/sheets", element: <Suspense fallback={<LoadingSpinner />}><Sheets /></Suspense> },
                { path: "/stationary", element: <Suspense fallback={<LoadingSpinner />}><Stationary /></Suspense> },
                { path: "/login", element: <Suspense fallback={<LoadingSpinner />}><Login /></Suspense> },
                { path: "/registration", element: <Suspense fallback={<LoadingSpinner />}><Registration /></Suspense> }
            ],
        },
    ]);
    return routes;
};

export default Router;

