import { Paper, useTheme } from "@mui/material";
import React from "react";
import { officeConsts } from "../../utils/routsConsts";
import styles from "./OfficeNav.module.scss";
import { useLocation, useNavigate } from "react-router-dom";

type arrType = {
  name: string;
  route: string;
};

const arr: arrType[] = [
  {
    route: officeConsts.CURRENT_ORDERS_ROUTE,
    name: "Текущие заказы",
  },
  {
    route: officeConsts.ALL_ORDERS_ROUTE,
    name: "Все заказы",
  },
];

const OfficeNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Paper elevation={3} className={styles.OfficeNav}>
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

export default OfficeNav;
