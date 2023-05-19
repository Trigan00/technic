import { DialogTitle, Icon, IconButton, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import Loader from "../../UI/Loader";
import useAdmin from "../../hooks/useAdmin";
import { OrderState } from "../../store/slices/orderSlice";
import DeleteModal from "../../UI/DeleteModal";
import StatusChanger from "../../components/admin/StatusChanger";
import styles from "./OrderListPage.module.scss";

interface AdminOrders extends OrderState {
  username: string;
  useremail: string;
  technicname: string;
}

const OrderListPage: React.FC = () => {
  const { isLoading, getOrders, deleteOrder, updateStatus } = useAdmin();
  const [orders, setOrders] = useState<AdminOrders[]>([]);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const [delteModalInfo, setDeleteModalInfo] = useState({ name: "", id: 0 });

  useEffect(() => {
    (async () => {
      const res = await getOrders();
      console.log(res);
      setOrders(res);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteOrderHandler = async (id: number) => {
    await deleteOrder(id);
    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  const setStatus = async (status: string, id: number) => {
    await updateStatus(id, status);
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: status } : order
      )
    );
  };

  if (isLoading)
    return (
      <Paper>
        <Loader />
      </Paper>
    );
  return (
    <>
      <DialogTitle sx={{ textAlign: "center" }}>Список заказов</DialogTitle>
      <Paper elevation={3} className={styles.Wrapper}>
        {orders.length ? (
          orders.map((order) => (
            <div className={styles.Order} key={order.id}>
              <div className={styles.Top}>
                <div>
                  <div className={styles.userEmail}>
                    Email: {order.useremail}
                  </div>
                  <div className={styles.TechnicName}>
                    Техника: {order.technicname}
                  </div>
                  <div className={styles.TechnicName}>
                    Адрес: {order.address}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <StatusChanger
                    currentStatus={order.status}
                    setStatus={setStatus}
                    orderId={order.id}
                  />
                  <IconButton
                    onClick={() => {
                      setDeleteModalInfo({
                        name: order.technicname,
                        id: order.id,
                      });
                      setIsDeleteModal(true);
                    }}
                  >
                    <Icon>delete</Icon>
                  </IconButton>
                </div>
              </div>
              <div className={styles.Bottom}>{order.dates}</div>
            </div>
          ))
        ) : (
          <h1 style={{ textAlign: "center" }}>Список заказов пуст</h1>
        )}
      </Paper>
      <DeleteModal
        isModal={isDeleteModal}
        setIsModal={setIsDeleteModal}
        technicName={delteModalInfo.name}
        id={delteModalInfo.id}
        onDelete={deleteOrderHandler}
        isOrder={true}
      />
    </>
  );
};

export default OrderListPage;
