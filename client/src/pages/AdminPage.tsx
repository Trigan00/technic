import React, { useState } from "react";
import AdminNav from "../components/admin/AdminNav";
import AddTechnic from "../components/admin/AddTechnic";
import OrderList from "../components/admin/OrderList";
import TechnicArray from "../components/admin/TechnicArray";
import styles from "./AdminPage.module.scss";

const pages: any = {
  AddTechnic: {
    componentName: "AddTechnic",
    name: "Добваить технику",
    component: AddTechnic,
  },
  TechnicArray: {
    componentName: "TechnicArray",
    name: "Список техники",
    component: TechnicArray,
  },
  OrderList: {
    componentName: "OrderList",
    name: "Заказы",
    component: OrderList,
  },
};

const AdminPage: React.FC = () => {
  const [page, setPage] = useState("AddTechnic");

  const AdminComponent = pages[page].component;

  return (
    <div className={styles.Wrapper}>
      <AdminNav setPage={setPage} pages={pages} currnetPage={page} />
      <div style={{ height: "fit-content", width: "100%" }}>
        <AdminComponent />
      </div>
    </div>
  );
};

export default AdminPage;
