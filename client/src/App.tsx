import React, { useEffect } from "react";
import { Container, createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { useAuth } from "./hooks/useAuth";
import NavBar from "./components/NavBar";
import MyAlert from "./UI/MyAlert";
import { useTypedSelector } from "./store/hooks/useTypedSelector";
import { useTypedDispatch } from "./store/hooks/useTypedDispatch";
import { fetchTechnic } from "./store/slices/technicSlice";
import { orange } from "@mui/material/colors";
import Footer from "./components/Footer";

const theme = createTheme({
  palette: {
    primary: {
      main: orange[500],
      contrastText: "#fff",
    },
  },
});

function App() {
  const selector = useTypedSelector((state) => state.alert);
  const dispatch = useTypedDispatch();
  const { login, storageName } = useAuth();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName) || "{}");

    if (data && data.token) {
      login(data);
    }
    dispatch(fetchTechnic());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <NavBar />
        <Container sx={{ mb: 4 }} className="Main">
          <AppRouter />
        </Container>
        <Footer />
        <MyAlert
          message={selector.message}
          open={selector.isOpen}
          severity={selector.severity}
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
