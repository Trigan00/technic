import React from "react";
import { useDispatch } from "react-redux";
import { setAlert } from "../store/slices/alertSlice";
import { useHttp } from "../hooks/useHttp";
import Form from "../UI/Form";
import { useNavigate } from "react-router-dom";
import { publicConsts } from "../utils/routsConsts";
import { useAuth } from "../hooks/useAuth";

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const { request, loading, error } = useHttp();
  const navigate = useNavigate();
  const { login } = useAuth();

  const registerHandler = async (
    email: string,
    password: string,
    username: string | undefined
  ) => {
    try {
      const res = await request(
        `${process.env.REACT_APP_SERVERURL}/api/auth/register`,
        "POST",
        {
          email,
          password,
          username,
        }
      );
      if (res) {
        dispatch(
          setAlert({
            severity: "success",
            message: res.message,
          })
        );
        login(res.user);
        navigate(publicConsts.HOME_ROUTE);
      }
    } catch (e) {}
  };
  return (
    <Form
      isSignUp={true}
      onSubmit={registerHandler}
      isLoading={loading}
      title={"Зарегистрироваться"}
      error={error}
    />
  );
};

export default SignUp;
