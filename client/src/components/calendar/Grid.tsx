import moment from "moment";
import styles from "./Grid.module.scss";
import React from "react";
import { useTheme } from "@mui/material";

interface GridProps {
  startDay: moment.Moment;
  today: moment.Moment;
  datesList: string[];
  setDatesList: React.Dispatch<React.SetStateAction<string[]>>;
}

const busyDays = {
  "12.03.2023": "",
  "14.03.2023": "",
};

const Grid: React.FC<GridProps> = ({
  startDay,
  today,
  datesList,
  setDatesList,
}) => {
  const day = startDay.clone().subtract(1, "day");
  const daysArr = [...Array(42)].map(() => day.add(1, "day").clone());
  const theme = useTheme();
  const color = theme.palette.primary.main;

  const pickDate = (date: string) => {
    if (date in busyDays) return;
    if (datesList.includes(date))
      return setDatesList((prev) => prev.filter((el) => el !== date));
    setDatesList((prev) => [...prev, date]);
  };

  return (
    <div className={styles.gridWrapper} style={{ backgroundColor: color }}>
      {[...Array(7)].map((_, i) => (
        <div
          className={`${styles.weekDay} ${styles.rowInCell}`}
          key={i}
          style={{ color: color }}
        >
          {moment()
            .day(i + 1)
            .format("ddd")}
        </div>
      ))}
      {daysArr.map((dayItem) => {
        // console.log(dayItem.format("DD.MM.YYYY"));
        return (
          <div
            className={styles.cellWrapper}
            key={dayItem.unix()}
            style={{
              borderTop: "1px solid " + color,
              backgroundColor:
                dayItem.day() === 6 || dayItem.day() === 0 ? "#ECECEC" : "",
              borderRight: dayItem.day() === 0 ? "none" : "1px solid " + color,
              color: today.isSame(dayItem, "month") ? "black" : "lightgrey",
              boxShadow:
                dayItem.format("DD.MM.YYYY") in busyDays
                  ? "inset 3px 4px 5px red"
                  : datesList.includes(dayItem.format("DD.MM.YYYY"))
                  ? "inset 3px 4px 5px green"
                  : "none",
            }}
            onClick={() => {
              pickDate(dayItem.format("DD.MM.YYYY"));
            }}
          >
            <div className={styles.rowInCell}>
              <div
                className={styles.dayWrapper}
                style={{
                  backgroundColor: moment().isSame(dayItem, "day")
                    ? color
                    : "none",
                }}
              >
                {dayItem.format("D")}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
