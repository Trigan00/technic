import { DialogTitle } from "@mui/material";
import React from "react";
import MyOrdersList from "../../components/office/MyOrdersList";
import { useAuth } from "../../hooks/useAuth";

const AllOrdersPage: React.FC = () => {
  const { isAuth } = useAuth();

  if (!isAuth)
    return (
      <DialogTitle sx={{ textAlign: "center" }}>
        Для просмотра заказов необходима авторизация
      </DialogTitle>
    );

  return <MyOrdersList type="all" />;
};

export default AllOrdersPage;
