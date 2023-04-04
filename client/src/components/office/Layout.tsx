import React, { useEffect } from "react";
import OfficeNav from "./OfficeNav";
import styles from "./Layout.module.scss";
import { Outlet } from "react-router-dom";
import { fetchOrders } from "../../store/slices/orderSlice";
import { useTypedDispatch } from "../../store/hooks/useTypedDispatch";
import { useAuth } from "../../hooks/useAuth";

const OfficeLayout: React.FC = () => {
  const { token } = useAuth();
  const dispatch = useTypedDispatch();
  useEffect(() => {
    if (token) dispatch(fetchOrders(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return (
    <div className={styles.Wrapper}>
      <OfficeNav />
      <div style={{ height: "fit-content", width: "100%" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default OfficeLayout;
