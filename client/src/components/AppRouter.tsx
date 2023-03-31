import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { adminRoutes, publicRoutes } from "../routes";
import Layout from "./admin/Layout";

const AppRouter: React.FC = () => {
  const { email } = useAuth();

  return (
    <>
      <Routes>
        {email === process.env.REACT_APP_ADMINEMAIL && (
          <Route path="/admin" element={<Layout />}>
            {adminRoutes.map(({ path, Component }) => {
              return <Route key={path} path={path} element={<Component />} />;
            })}
          </Route>
        )}
        {publicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        <Route path={"*"} element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default AppRouter;
