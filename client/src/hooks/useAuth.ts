import { useCallback } from "react";
import { useTypedDispatch } from "../store/hooks/useTypedDispatch";
import { useTypedSelector } from "../store/hooks/useTypedSelector";
import { removeUser, setUser, UserState } from "../store/slices/userSlice";
import { useHttp } from "./useHttp";

const storageName = "RinazTechnicData";

export const useAuth = () => {
  const { email, id, username, isVerified, token } = useTypedSelector(
    (state) => state.user
  );
  const dispatch = useTypedDispatch();
  const { request } = useHttp();

  const login = useCallback(async (user: UserState) => {
    try {
      const res = await request(
        `${process.env.REACT_APP_SERVERURL}/api/auth/validateToken`,
        "GET",
        null,
        { authorization: "Bearer " + user.token }
      );
      if (res) {
        dispatch(setUser({ ...user, isVerified: res.isVerified }));
        localStorage.setItem(
          storageName,
          JSON.stringify({ ...user, isVerified: res.isVerified })
        );
      }
    } catch (error) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = useCallback(() => {
    dispatch(removeUser());
    localStorage.removeItem(storageName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isAuth: !!email,
    email,
    id,
    username,
    isVerified,
    token,
    login,
    logout,
    storageName,
  };
};
