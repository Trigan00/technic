import { useTheme } from "@mui/material";
import React from "react";
import styles from "./Header.module.scss";

interface HeaderProps {
  today: moment.Moment;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onCurrentMonth: () => void;
}

const Header: React.FC<HeaderProps> = ({
  today,
  onPrevMonth,
  onNextMonth,
  onCurrentMonth,
}) => {
  const theme = useTheme();

  return (
    <div
      className={styles.headerWrapper}
      style={{ backgroundColor: theme.palette.primary.main }}
    >
      <div>
        <span>
          <b>{today.format("MMMM")} </b>
        </span>
        <span>{today.format("YYYY")}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          style={{ color: theme.palette.primary.main }}
          onClick={() => onPrevMonth()}
        >
          &lt;
        </button>
        <button
          style={{ color: theme.palette.primary.main }}
          onClick={() => onCurrentMonth()}
        >
          Сегодня
        </button>
        <button
          style={{ color: theme.palette.primary.main }}
          onClick={() => onNextMonth()}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Header;
