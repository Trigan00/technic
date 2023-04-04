import moment from "moment/moment";
import "moment/locale/ru";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Grid from "./Grid";
import { Modal, Backdrop, Fade, Box, DialogTitle, Button } from "@mui/material";
import styles from "./Calendar.module.scss";
import Loader from "../../UI/Loader";
import useQuery from "../../hooks/useQuery";
import { addNewOrder } from "../../store/slices/orderSlice";
import { useAuth } from "../../hooks/useAuth";
import { useTypedDispatch } from "../../store/hooks/useTypedDispatch";
import { useParams } from "react-router-dom";
import { setAlert } from "../../store/slices/alertSlice";
import Payment from "../payment/Payment";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
};

interface CalendarProps {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  technicId: number;
  technicPrice: number;
  technicname: string;
}

const Calendar: React.FC<CalendarProps> = ({
  isModal,
  setIsModal,
  technicId,
  technicPrice,
  technicname,
}) => {
  moment.updateLocale("ru", { week: { dow: 1 } });
  const [today, setToday] = useState(moment());
  const startDay = today.clone().startOf("month").startOf("week");

  const { id } = useParams();
  const { token, email, username } = useAuth();
  const { isLoading, /* createOrder, */ getBusyDays } = useQuery();
  const [datesList, setDatesList] = useState<string[]>([]);
  const [busyDays, setBusyDays] = useState<string[]>([]);
  const [isPayment, setIsPayment] = useState(false);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    (async () => {
      // if (!isAuth) return;
      if (!id) return;
      const res = await getBusyDays(+id);
      setBusyDays(res);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prevMonthHandler = () =>
    setToday((prev) => prev.clone().subtract(1, "month"));

  const currentMonthHandler = () => setToday(moment());

  const nextMonthHandler = () =>
    setToday((prev) => prev.clone().add(1, "month"));

  const orderHandler = async () => {
    // await createOrder(technicId, datesList);
    if (!token || !email || !username)
      return dispatch(
        setAlert({
          severity: "error",
          message: "Необходима авторизация",
        })
      );
    if (!datesList.length) return;
    dispatch(
      addNewOrder({
        technicId,
        datesList,
        token,
        username,
        userEmail: email,
        technicname: technicname,
      })
    );
    setIsModal(false);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isModal}
      onClose={() => {
        setIsModal(false);
        setIsPayment(false);
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isModal}>
        {!isPayment ? (
          <div>
            {!isLoading ? (
              <Box sx={style}>
                <DialogTitle sx={{ p: 0, mb: 2, textAlign: "center" }}>
                  Выберите дни аренды
                </DialogTitle>
                <div className={styles.Wrapper}>
                  <div style={{ overflow: "hidden" }}>
                    <Header
                      today={today}
                      onPrevMonth={prevMonthHandler}
                      onCurrentMonth={currentMonthHandler}
                      onNextMonth={nextMonthHandler}
                    />
                    <Grid
                      startDay={startDay}
                      today={today}
                      datesList={datesList}
                      setDatesList={setDatesList}
                      busyDays={busyDays}
                    />
                  </div>
                  <div className={styles.Right}>
                    <ul>
                      {datesList.map((day) => (
                        <li key={day}>{day}</li>
                      ))}
                    </ul>
                    <div>
                      <div className={styles.Price}>
                        Итого:{" "}
                        <span>{datesList.length * technicPrice} &#x20bd;</span>
                      </div>
                      <div className={styles.Buttons}>
                        <Button
                          variant="contained"
                          onClick={() => {
                            if (!datesList.length) return;
                            setIsPayment(true);
                          }}
                        >
                          Заказать
                        </Button>
                        <Button
                          onClick={() => {
                            setIsModal(false);
                            setDatesList([]);
                          }}
                        >
                          Отмена
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Box>
            ) : (
              <Box sx={style}>
                <Loader />
              </Box>
            )}
          </div>
        ) : (
          <div>
            <Payment orderHandler={orderHandler} setIsPayment={setIsPayment} />
          </div>
        )}
      </Fade>
    </Modal>
  );
};

export default Calendar;
