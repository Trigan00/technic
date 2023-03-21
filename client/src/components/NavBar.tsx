import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Container,
  Icon,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTypedSelector } from "../store/hooks/useTypedSelector";
import { consts } from "../utils/routsConsts";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { email } = useTypedSelector((state) => state.user);

  const signOutHandler = () => {
    logout();
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
              onClick={() => navigate(consts.HOME_ROUTE)}
            >
              Rinaz Technic
            </Box>

            <span>{email}</span>
            <Button
              color="inherit"
              onClick={() => navigate(consts.LOGIN_ROUTE)}
            >
              Войти
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate(consts.REGISTRATION_ROUTE)}
            >
              Зарегистрироваться
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate(consts.ADMIN_ROUTE)}
            >
              Админ
            </Button>
            <IconButton
              sx={{ color: "white" }}
              size="small"
              onClick={signOutHandler}
            >
              <Icon>power_settings_new</Icon>
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default NavBar;
