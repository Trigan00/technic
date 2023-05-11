import React, { useEffect, useState } from "react";
import { Paper } from "@mui/material";
// import useQuery, { OrderType } from "../../hooks/useQuery";
import Loader from "../../UI/Loader";
import Order from "./Order";
import { TechnicState } from "../../store/slices/technicSlice";
import { useTypedSelector } from "../../store/hooks/useTypedSelector";
import styles from "./MyOrdersList.module.scss";
import { OrderState } from "../../store/slices/orderSlice";

interface MyOrdersListProps {
  type: "current" | "all";
}

const MyOrdersList: React.FC<MyOrdersListProps> = ({ type }) => {
  const { technicList, status } = useTypedSelector((state) => state.technic);
  const myOrders = useTypedSelector((state) => state.order);
  // const { isLoading, getOrders } = useQuery();
  const [orders, setOrders] = useState<OrderState[]>([]);

  useEffect(() => {
    // const res = await getOrders(type);
    if (type === "current") {
      const currentOrders = myOrders.ordersList.filter(
        (order) => order.status === "pending" || order.status === "given"
      );
      // console.log(currentOrders);
      setOrders(currentOrders);
    } else {
      setOrders(myOrders.ordersList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myOrders.status]);

  const getTechnicInfo = (id: number): TechnicState => {
    // console.log(id);
    const index = technicList.findIndex((tec) => tec.id === id);
    return technicList[index];
  };

  if (myOrders.status === "pending" || status === "pending")
    return (
      <Paper>
        <Loader />
      </Paper>
    );
  return (
    <Paper elevation={3} className={styles.Wrapper}>
      {orders.length ? (
        orders.map((order) => (
          <Order
            key={order.id}
            orderInfo={order}
            technicInfo={getTechnicInfo(order.technicid)}
          />
        ))
      ) : (
        <h1 style={{ textAlign: "center" }}>Список заказов пуст</h1>
      )}
    </Paper>
  );
};

export default MyOrdersList;
