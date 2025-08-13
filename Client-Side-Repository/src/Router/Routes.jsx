import React from "react";
import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import PageNotFound from "../Pages/PageNotFound";
import HomePage from "../Pages/HomePage";
import LoadingSpinner from "../Components/Shared/LoadingElement/LoadingSpinner";
import Authentication from "../Layout/Authentication";
import LoginPage from "../Components/Shared/Authentication/Form/LoginPage";
import RegisterPage from "../Components/Shared/Authentication/Form/RegisterPage";
import DashBoardLayout from "../Layout/DashBoardLayout";
import PrivateRoutes from "../Provider/PrivateRoutes";
import AddCamp from "../Components/Dashboard/Components/Admin/Form/AddCamp";
import AvailableCampsPage from "../Pages/AvailableCampsPage";
import CampDetailPage from "../Pages/CampDetailPage";
import ManageRegCamps from "../Components/Dashboard/Pages/Admin/ManageRegCamps";
import AnalyticsPage from "../Components/Dashboard/Pages/AnalyticsPage";
import ManageCamps from "../Components/Dashboard/Pages/Admin/ManageCamps";
import PaymentsHistory from "../Components/Dashboard/Pages/PaymentsHistory";
import RegisteredCamps from "../Components/Dashboard/Pages/RegisteredCamps";
import EditProfilePage from "../Components/Dashboard/Pages/EditProfilePage";
import ProfilePage from "../Components/Dashboard/Pages/ProfilePage";
import UpdateCamp from "../Components/Dashboard/Components/Admin/Form/UpdateCamp";

const Routes = createBrowserRouter([
   {
      path: "/",
      Component: RootLayout,
      errorElement: <PageNotFound />,
      children: [
         {
            index: true,
            Component: HomePage,
            hydrateFallbackElement: <LoadingSpinner />,
         },
         {
            path: "available-camps",
            Component: AvailableCampsPage,
            hydrateFallbackElement: <LoadingSpinner />,
         },
         {
            path: "camp-details/:id",
            Component: CampDetailPage,
            hydrateFallbackElement: <LoadingSpinner />,
         },
      ],
   },
   {
      path: "/authentication",
      Component: Authentication,
      errorElement: <PageNotFound />,
      children: [
         {
            path: "login",
            Component: LoginPage,
         },
         {
            path: "register",
            Component: RegisterPage,
         },
      ],
   },
   {
      path: "/dashboard",
      element: (
         <PrivateRoutes>
            <DashBoardLayout />
         </PrivateRoutes>
      ),
      errorElement: <PageNotFound />,
      hydrateFallbackElement: <LoadingSpinner />,
      children: [
         {
            path: "add-camp",
            element: <AddCamp />,
         },
         {
            path: "update-camp/:id",
            element: <UpdateCamp />,
         },
         {
            path: "profile-status",
            element: <ProfilePage />,
         },
         {
            path: "update-profile",
            element: <EditProfilePage />,
         },
         {
            path: "analytics",
            element: <AnalyticsPage />,
         },
         {
            path: "manage-camps",
            element: <ManageCamps />,
         },
         {
            path: "registered-camps",
            element: <RegisteredCamps />,
         },
         {
            path: "manage-reg-camps",
            element: <ManageRegCamps />,
         },
         {
            path: "payment-history",
            element: <PaymentsHistory />,
         },
      ],
   },
]);

export default Routes;
