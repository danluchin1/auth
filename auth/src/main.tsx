import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Landing from "./pages/Landing.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.tsx";
import PublicLayout from "./layouts/PublicLayout.tsx";
import ProtectedLayout from "./layouts/ProtectedLayout.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import UpdateProfile from "./pages/UpdateProfile.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <Landing />},
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  { 
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <ProtectedLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: ":profileId", element: <Dashboard /> },
      { path: ":profileId/update-profile", element: <UpdateProfile /> },
    ],
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
