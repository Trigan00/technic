import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage";
import { consts } from "./utils/routsConsts";

export const adminRoutes = [
  {
    path: consts.ADMIN_ROUTE,
    Component: AdminPage,
  },
];

export const publicRoutes = [
  {
    path: consts.HOME_ROUTE,
    Component: HomePage,
  },
  {
    path: consts.LOGIN_ROUTE,
    Component: LoginPage,
  },
  {
    path: consts.REGISTRATION_ROUTE,
    Component: RegisterPage,
  },
];
