import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Container,
  Icon,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sanitize from "../helpers/Sanitize";
import shortenText from "../helpers/shortenText";
import { useAuth } from "../hooks/useAuth";
import { adminConsts, publicConsts, officeConsts } from "../utils/routsConsts";
import logo from "./logo_full_white.png";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { isAuth, email, username } = useAuth();

  const signOutHandler = () => {
    logout();
    navigate(publicConsts.HOME_ROUTE);
  };

  return (
    <Box>
      <AppBar position="static">
        <Container>
          <Toolbar style={{ padding: "0" }}>
            <Box
              component="div"
              sx={{ flexGrow: 1 }}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(publicConsts.HOME_ROUTE)}
            >
              {/* Rinaz Technic */}
              <img width="96px" height="40px" src={logo} alt="rinaz_logo" />
            </Box>

            {isAuth && (
              <Tooltip
                title={
                  <Sanitize
                    html={`<div>${username}</div><div>${email}</div>`}
                  />
                }
              >
                <Box
                  sx={{
                    p: 1,
                    mr: "5px",
                    borderRadius: "5px",
                    boxShadow:
                      "rgba(50, 50, 93, 0.15) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
                  }}
                >
                  {shortenText(username || "", 10)}
                </Box>
              </Tooltip>
            )}

            <Button
              color="inherit"
              onClick={() => navigate(officeConsts.CURRENT_ORDERS_ROUTE)}
            >
              Кабинет
            </Button>

            {!isAuth && (
              <Button
                color="inherit"
                onClick={() => navigate(publicConsts.LOGIN_ROUTE)}
              >
                Войти
              </Button>
            )}

            {email === process.env.REACT_APP_ADMINEMAIL && (
              <Button
                color="inherit"
                onClick={() => navigate(adminConsts.ADD_TECHNIC_ROUTE)}
              >
                Админ
              </Button>
            )}
            {isAuth && (
              <IconButton
                sx={{ color: "white" }}
                size="small"
                onClick={signOutHandler}
              >
                <Icon>power_settings_new</Icon>
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default NavBar;
