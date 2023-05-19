import { Card, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loader from "../UI/Loader";
import { useHttp } from "../hooks/useHttp";
import { setAlert } from "../store/slices/alertSlice";
import { useParams } from "react-router-dom";

const ResetPasswordPage: React.FC = () => {
  const { token } = useParams();
  const { request, error, loading } = useHttp();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (error) {
      dispatch(
        setAlert({
          severity: "error",
          message: error.message,
        })
      );
      error.errors && setErrorMsg(error.errors[0].msg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const submitHandler = async () => {
    if (password !== confirmPassword) {
      return setConfirmPasswordError("Пароли не совпадают");
    }
    try {
      setErrorMsg("");
      setConfirmPasswordError("");
      const res = await request(
        `${process.env.REACT_APP_SERVERURL}/api/auth/update-password`,
        "PUT",
        {
          password,
          token,
        }
      );
      if (res) {
        dispatch(
          setAlert({
            severity: "success",
            message: res.message,
          })
        );
      }
    } catch (e) {}
  };

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
      <h3 style={{ textAlign: "center" }}>Новый пароль</h3>
      <TextField
        id="filled-basic_2"
        label="Пароль"
        variant="filled"
        margin="normal"
        error={!!errorMsg}
        helperText={errorMsg}
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        fullWidth
      />

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
        fullWidth
      />
      {loading ? (
        <Loader />
      ) : (
        <Button variant="contained" fullWidth onClick={submitHandler}>
          Продолжить
        </Button>
      )}
    </Card>
  );
};

export default ResetPasswordPage;
