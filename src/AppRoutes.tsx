import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Layout from "./layouts/layout";
import HomePage from "./pages/HomePage";
import AuthCallBackPage from "./pages/AuthCallBackPage";
import SearchPage from "./pages/SearchPage";
import ProtectedRoute from "./auth/ProtectedRoute";
import UserProfilePage from "./pages/UserProfilePage";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";

const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Layout showHero={true}><HomePage /></Layout>,
    },
    {
      path: "/auth-callback",
      element: <AuthCallBackPage />,
    },
    {
      path: "/search/:city",
      element: <Layout showHero={false}><SearchPage /></Layout>,
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "/user-profile",
          element: <Layout showHero={false}><UserProfilePage /></Layout>,
        },
        {
          path: "/manage-restaurant",
          element: <Layout showHero={false}><ManageRestaurantPage /></Layout>,
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ]);

  return routes;
};

export default AppRoutes;

