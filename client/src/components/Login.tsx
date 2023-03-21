import React from "react";
import Form from "../UI/Form";
import { useNavigate } from "react-router-dom";
import { consts } from "../utils/routsConsts";
import { useHttp } from "../hooks/useHttp";
import { useAuth } from "../hooks/useAuth";

const Login: React.FC = () => {
  const { request, loading, error } = useHttp();
  const { login } = useAuth();
  const navigate = useNavigate();

  const loginHandler = async (email: string, password: string) => {
    try {
      const res = await request(
        `${process.env.REACT_APP_SERVERURL}/api/auth/login`,
        "POST",
        {
          email,
          password,
        }
      );
      if (res) {
        login(res);
        navigate(consts.HOME_ROUTE);
      }
    } catch (e) {}
  };
  return (
    <Form
      isSignUp={false}
      onSubmit={loginHandler}
      isLoading={loading}
      title={"Войти"}
      error={error}
    />
  );
};

export default Login;
