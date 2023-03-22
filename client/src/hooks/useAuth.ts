import { useCallback } from "react";
import { useTypedDispatch } from "../store/hooks/useTypedDispatch";
import { useTypedSelector } from "../store/hooks/useTypedSelector";
import { removeUser, setUser, UserState } from "../store/slices/userSlice";

const storageName = "RinazTechnicData";

export const useAuth = () => {
  const { email, id, username, isVerified, token } = useTypedSelector(
    (state) => state.user
  );
  const dispatch = useTypedDispatch();

  const login = useCallback((user: UserState) => {
    dispatch(setUser(user));

    localStorage.setItem(storageName, JSON.stringify(user));
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
