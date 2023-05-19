import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
// import AdminPage from "./pages/admin/AdminPage";
import { publicConsts, adminConsts, officeConsts } from "./utils/routsConsts";
import AddTechnicPage from "./pages/admin/AddTechnicPage";
import TechnicArrayPage from "./pages/admin/TechnicArrayPage";
import OrderListPage from "./pages/admin/OrderListPage";
import TechnicPage from "./pages/TechnicPage";
import EditTechnicPage from "./pages/admin/EditTechnicPage";
import CurrentOrdersPage from "./pages/office/CurrentOrdersPage";
import AllOrdersPage from "./pages/office/AllOrdersPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

export const adminRoutes = [
  {
    path: adminConsts.ADD_TECHNIC_ROUTE,
    Component: AddTechnicPage,
  },
  {
    path: adminConsts.TECHNIC_ARRAY_ROUTE,
    Component: TechnicArrayPage,
  },
  {
    path: adminConsts.ORDERS_ROUTE,
    Component: OrderListPage,
  },
  {
    path: adminConsts.EDIT_TECHNIC_ROUTE + "/:id",
    Component: EditTechnicPage,
  },
];

export const publicRoutes = [
  {
    path: publicConsts.HOME_ROUTE,
    Component: HomePage,
  },
  {
    path: publicConsts.LOGIN_ROUTE,
    Component: LoginPage,
  },
  {
    path: publicConsts.REGISTRATION_ROUTE,
    Component: RegisterPage,
  },
  {
    path: publicConsts.FORGET_PASSWORD_ROUTE,
    Component: ForgetPasswordPage,
  },
  {
    path: publicConsts.RESET_PASSWORD_ROUTE + "/:token",
    Component: ResetPasswordPage,
  },
  {
    path: publicConsts.TECHNIC_ROUTE + "/:id",
    Component: TechnicPage,
  },
];

export const officeRoutes = [
  {
    path: officeConsts.CURRENT_ORDERS_ROUTE,
    Component: CurrentOrdersPage,
  },
  {
    path: officeConsts.ALL_ORDERS_ROUTE,
    Component: AllOrdersPage,
  },
];
