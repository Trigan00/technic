import { Card, useTheme } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Login from "../components/Login";
import { publicConsts } from "../utils/routsConsts";

const LoginPage: React.FC = () => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        maxWidth: "500px",
        w: "100%",
        m: "40px auto 0 auto",
        p: "10px",
        boxSizing: "border-box",
      }}
    >
      <h3 style={{ textAlign: "center" }}>Вход</h3>
      <Login />

      <Link
        to={publicConsts.REGISTRATION_ROUTE}
        style={{ color: theme.palette.primary.main, marginLeft: "10px" }}
      >
        Создать аккаунт
      </Link>
    </Card>
  );
};

export default LoginPage;
