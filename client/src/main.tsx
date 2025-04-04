import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Router from "./router/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AuthProvider from "./providers/AuthProvider";
import { ToastContainer } from "react-toastify";
import CartInfoProvider from "./providers/CartInfoProvider";
import { register } from './serviceWorkerRegistration.ts'

// Create a React Query Client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartInfoProvider>
          <RouterProvider router={Router()} />
        </CartInfoProvider>
      </AuthProvider>
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);

register()