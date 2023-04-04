import React, { useState } from "react";
import { TechnicState } from "../../store/slices/technicSlice";
// import useQuery, { OrderType } from "../../hooks/useQuery";
import styles from "./Order.module.scss";
import { Button } from "@mui/material";
import DeleteModal from "../../UI/DeleteModal";
import { useTypedDispatch } from "../../store/hooks/useTypedDispatch";
import { OrderState, deleteOrder } from "../../store/slices/orderSlice";
import { useAuth } from "../../hooks/useAuth";
import chooseColorOrTranslate from "../../helpers/chooseColorOrTranslate";

interface OrderProps {
  technicInfo: TechnicState;
  orderInfo: OrderState;
}

const Order: React.FC<OrderProps> = ({ technicInfo, orderInfo }) => {
  const { token } = useAuth();
  const [isModal, setIsModal] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState({ name: "", id: 0 });
  const dispatch = useTypedDispatch();
  // const { deleteOrder } = useQuery();

  const deleteHandler = (id: number) => {
    if (!token) return;
    dispatch(deleteOrder({ id, token }));
  };

  return (
    <div className={styles.Order}>
      <div className={styles.Title}>
        <h3>{technicInfo.name}</h3>
        <div className={styles.Image}>
          <img
            style={{
              display: "block",
              objectFit: "cover",
            }}
            src={`${process.env.REACT_APP_SERVERURL}/${technicInfo.imgname}`}
            alt="technicImage"
          ></img>
        </div>
      </div>
      <div className={styles.Dates}>
        {orderInfo.dates.split("-").map((date) => (
          <span key={date}>{date}</span>
        ))}
      </div>
      <div className={styles.Right}>
        <div
          className={styles.Status}
          style={{
            color: chooseColorOrTranslate(orderInfo.status, true),
          }}
        >
          {chooseColorOrTranslate(orderInfo.status, false)}
        </div>

        {orderInfo.status === "pending" && (
          <>
            <div className={styles.Line}></div>
            <Button
              color="error"
              onClick={() => {
                setModalInfo({
                  name: technicInfo.name,
                  id: orderInfo.id,
                });
                setIsModal(true);
              }}
            >
              Удалить
            </Button>
          </>
        )}
      </div>
      <DeleteModal
        isModal={isModal}
        setIsModal={setIsModal}
        technicName={modalInfo.name}
        id={modalInfo.id}
        onDelete={deleteHandler}
        isOrder={true}
      />
    </div>
  );
};

export default Order;
