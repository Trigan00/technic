import { Card, useTheme } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import SignUp from "../components/SignUp";
import { publicConsts } from "../utils/routsConsts";

const RegisterPage: React.FC = () => {
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
      <h3 style={{ textAlign: "center" }}>Регистрация</h3>
      <SignUp />
      <p>
        <Link
          to={publicConsts.LOGIN_ROUTE}
          style={{ color: theme.palette.primary.main, marginLeft: "10px" }}
        >
          Войти
        </Link>
      </p>
    </Card>
  );
};

export default RegisterPage;
