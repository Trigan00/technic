import { Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAlert } from "../store/slices/alertSlice";
import Loader from "./Loader";

interface FormProps {
  isSignUp: boolean;
  title: string;
  isLoading: boolean;
  onSubmit: (email: string, password: string) => void;
  error: any;
}

const Form: React.FC<FormProps> = ({
  isSignUp,
  title,
  isLoading,
  onSubmit,
  error,
}) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [errorMsg, setErrorMsg] = useState({ email: "", password: "" });

  useEffect(() => {
    if (error) {
      dispatch(
        setAlert({
          severity: "error",
          message: error.message,
        })
      );
      error.errors &&
        error.errors.forEach((err: { param: string; msg: string }) => {
          setErrorMsg((prev) => {
            return { ...prev, [err.param]: err.msg };
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg({ email: "", password: "" });
    setConfirmPasswordError("");
    if (!form.email.trim().length || !form.password.trim().length) {
      return setErrorMsg({
        email: form.email.trim() ? "" : "Поле не должно быть пустым",
        password: form.password.trim() ? "" : "Поле не должно быть пустым",
      });
    }
    if (isSignUp && form.password !== confirmPassword) {
      return setConfirmPasswordError("Пароли не совпадают");
    }

    onSubmit(form.email, form.password);
  };

  return (
    <form
      onSubmit={submitHandler}
      style={{
        padding: "10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TextField
        id="filled-basic"
        label="Email"
        variant="filled"
        margin="normal"
        error={!!errorMsg.email}
        helperText={errorMsg.email}
        name="email"
        value={form.email}
        onChange={changeHandler}
        type="email"
      />
      <TextField
        id="filled-basic_2"
        label="Пароль"
        variant="filled"
        margin="normal"
        error={!!errorMsg.password}
        helperText={errorMsg.password}
        name="password"
        value={form.password}
        onChange={changeHandler}
        type="password"
      />

      {isSignUp && (
        <>
          <TextField
            id="filled-basic_3"
            label="Подтвердите пароль"
            variant="filled"
            margin="normal"
            error={!!confirmPasswordError}
            helperText={confirmPasswordError}
            name="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
          />
        </>
      )}

      {isLoading ? (
        <Loader color="#1976d2" />
      ) : (
        <Button variant="contained" type="submit" disabled={isLoading}>
          {title}
        </Button>
      )}
    </form>
  );
};

export default Form;
