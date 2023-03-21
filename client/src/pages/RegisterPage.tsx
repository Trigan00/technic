import { Card } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import SignUp from "../components/SignUp";
import { consts } from "../utils/routsConsts";

const RegisterPage: React.FC = () => {
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
      <h1>RegisterPage</h1>
      <SignUp />
      <p>
        <Link
          to={consts.LOGIN_ROUTE}
          style={{ color: "#1976d2", marginLeft: "10px" }}
        >
          Войти
        </Link>
      </p>
    </Card>
  );
};

export default RegisterPage;
