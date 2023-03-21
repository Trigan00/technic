import React, { useEffect } from "react";
import { Container } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { useAuth } from "./hooks/useAuth";
import NavBar from "./components/NavBar";
import MyAlert from "./UI/MyAlert";
import { useTypedSelector } from "./store/hooks/useTypedSelector";

function App() {
  const selector = useTypedSelector((state) => state.alert);
  const { login, storageName } = useAuth();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName) || "{}");
    if (data && data.token) {
      login(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <NavBar />
      <Container>
        <AppRouter />
      </Container>
      <MyAlert
        message={selector.message}
        open={selector.isOpen}
        severity={selector.severity}
      />
    </BrowserRouter>
  );
}

export default App;