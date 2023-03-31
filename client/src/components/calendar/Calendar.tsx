import moment from "moment/moment";
import "moment/locale/ru";
import React, { useState } from "react";
import Header from "./Header";
import Grid from "./Grid";
import { Modal, Backdrop, Fade, Box, DialogTitle, Button } from "@mui/material";
import styles from "./Calendar.module.scss";

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
}

const Calendar: React.FC<CalendarProps> = ({ isModal, setIsModal }) => {
  moment.updateLocale("ru", { week: { dow: 1 } });

  const [today, setToday] = useState(moment());
  const startDay = today.clone().startOf("month").startOf("week");

  const [datesList, setDatesList] = useState<string[]>([]);

  const prevMonthHandler = () =>
    setToday((prev) => prev.clone().subtract(1, "month"));

  const currentMonthHandler = () => setToday(moment());

  const nextMonthHandler = () =>
    setToday((prev) => prev.clone().add(1, "month"));

  // const pickDate = (date: string) => {
  //   setDatesList((prev) => [...prev, date]);
  // };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isModal}
      onClose={() => setIsModal(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isModal}>
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
                  Итого: <span>41000 &#x20bd;</span>
                </div>
                <div className={styles.Buttons}>
                  <Button variant="contained">Заказать</Button>
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
      </Fade>
    </Modal>
  );
};

export default Calendar;
