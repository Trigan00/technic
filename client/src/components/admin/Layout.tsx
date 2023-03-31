import React from "react";
import { Outlet } from "react-router-dom";
import AdminNav from "./AdminNav";
import styles from "./Layout.module.scss";

const Layout: React.FC = () => {
  return (
    <div className={styles.Wrapper}>
      <AdminNav />
      <div style={{ height: "fit-content", width: "100%" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
