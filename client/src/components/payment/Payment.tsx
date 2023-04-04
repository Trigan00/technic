import { Box, Button, DialogTitle, TextField } from "@mui/material";
import React from "react";
import styles from "./Payment.module.scss";

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

interface PaymentProps {
  orderHandler: () => void;
  setIsPayment: React.Dispatch<React.SetStateAction<boolean>>;
}

const Payment: React.FC<PaymentProps> = ({ orderHandler, setIsPayment }) => {
  return (
    <Box sx={style}>
      <DialogTitle style={{ textAlign: "center" }}>Оплата</DialogTitle>
      <div className={styles.Wrapper}>
        <TextField
          margin="normal"
          size="small"
          label="Адрес"
          variant="outlined"
          fullWidth
        />
        <TextField
          margin="normal"
          size="small"
          label="Номер карты"
          variant="outlined"
          type="number"
          fullWidth
        />
        <TextField
          margin="normal"
          size="small"
          label="Срок действия"
          variant="outlined"
          type="month"
          sx={{ mr: 1 }}
        />
        <TextField
          margin="normal"
          size="small"
          label="CVV/CVC2"
          variant="outlined"
          type="number"
        />
        <div>
          <Button variant="contained" onClick={() => orderHandler()}>
            Оплатить
          </Button>
          <Button onClick={() => setIsPayment(false)}>Закрыть</Button>
        </div>
      </div>
    </Box>
  );
};

export default Payment;
