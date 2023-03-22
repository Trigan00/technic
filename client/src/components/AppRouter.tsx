import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { adminRoutes, publicRoutes } from "../routes";

const AppRouter: React.FC = () => {
  const { email } = useAuth();

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
