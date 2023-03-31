import { Paper, useTheme } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { adminConsts } from "../../utils/routsConsts";
import styles from "./AdminNav.module.scss";

type arrType = {
  name: string;
  route: string;
};

const arr: arrType[] = [
  {
    route: adminConsts.ADD_TECHNIC_ROUTE,
    name: "Добваить технику",
  },
  {
    route: adminConsts.TECHNIC_ARRAY_ROUTE,
    name: "Список техники",
  },
  {
    route: adminConsts.ORDERS_ROUTE,
    name: "Заказы",
  },
];
const AdminNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Paper elevation={3} className={styles.AdminNav}>
      {arr.map(({ name, route }: arrType) => (
        <div key={route}>
          <div
            style={{
              transition: "0.3s",
              color:
                route === location.pathname ? theme.palette.primary.main : "",
            }}
            onClick={() => navigate(route)}
          >
            {name}
          </div>
          <div
            style={{
              transition: "0.3s",
              borderBottom:
                route === location.pathname
                  ? `1px solid ${theme.palette.primary.main}`
                  : "1px solid gray",
            }}
          />
        </div>
      ))}
    </Paper>
  );
};

export default AdminNav;
