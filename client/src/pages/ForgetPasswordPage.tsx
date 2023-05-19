import { Button, Card, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHttp } from "../hooks/useHttp";
import Loader from "../UI/Loader";
import { useDispatch } from "react-redux";
import { setAlert } from "../store/slices/alertSlice";

const ForgetPasswordPage: React.FC = () => {
  const { request, error, loading } = useHttp();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
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
    try {
      setErrorMsg("");
      const res = await request(
        `${process.env.REACT_APP_SERVERURL}/api/auth/forget-password`,
        "POST",
        {
          email,
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
      <h3 style={{ textAlign: "center" }}>Восстановление пароля</h3>
      <TextField
        id="filled-basic"
        label="Email"
        variant="filled"
        margin="normal"
        error={!!errorMsg}
        helperText={errorMsg}
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
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

export default ForgetPasswordPage;
