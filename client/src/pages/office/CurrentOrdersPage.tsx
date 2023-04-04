import React from "react";
import { DialogTitle } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import MyOrdersList from "../../components/office/MyOrdersList";

const CurrentOrdersPage: React.FC = () => {
  const { isAuth } = useAuth();

  if (!isAuth)
    return (
      <DialogTitle sx={{ textAlign: "center" }}>
        Для просмотра заказов необходима авторизация
      </DialogTitle>
    );

  return <MyOrdersList type="current" />;
};

export default CurrentOrdersPage;
