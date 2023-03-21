import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { removeUser, setUser, UserState } from "../store/slices/userSlice";

const storageName = "RinazTechnicData";

export const useAuth = () => {
  const dispatch = useDispatch();

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

  return { login, logout, storageName };
};
