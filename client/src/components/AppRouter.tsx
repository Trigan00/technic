import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { adminRoutes, publicRoutes } from "../routes";
import { useTypedSelector } from "../store/hooks/useTypedSelector";

const AppRouter: React.FC = () => {
  const { email } = useTypedSelector((state) => state.user);

  return (
    <Routes>
      {email === process.env.REACT_APP_ADMINEMAIL &&
        adminRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path={"*"} element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
