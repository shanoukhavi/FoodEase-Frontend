
import { Navigate, useRoutes } from "react-router-dom";
import Layout from "./layouts/layout";
import HomePage from "./pages/HomePage";
import AuthCallBackPage from "./pages/AuthCallBackPage";
import SearchPage from "./pages/SearchPage";
import ProtectedRoute from "./auth/ProtectedRoute";
import UserProfilePage from "./pages/UserProfilePage";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";
import DetailPage from "./pages/DetailPage";
import OrderStatusPage from "./pages/OrderStatusPage";

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
      path: "/detail/:restaurantId",
      element: <Layout showHero={false}><DetailPage /></Layout>,
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
        {
          path: "/order-status",
          element: <Layout showHero={false}><OrderStatusPage /></Layout>,
        }
   
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

