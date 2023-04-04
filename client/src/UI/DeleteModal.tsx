import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Icon from "@mui/material/Icon/Icon";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

interface DeleteModalProps {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  technicName: string;
  id: number;
  onDelete: (id: number) => void;
  isOrder: boolean;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isModal,
  setIsModal,
  technicName,
  id,
  onDelete,
  isOrder,
}) => {
  const [deleteIsActive, setDeleteIsActive] = useState(false);
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Удалить {isOrder ? "заказ" : "технику"}?
            </Typography>
            <Icon
              style={{ cursor: "pointer" }}
              onClick={() => setIsModal(false)}
            >
              close
            </Icon>
          </div>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            {isOrder ? "Заказ" : "Техника"} &#171;{technicName}&#187; будет
            {isOrder ? " удален" : " удалена"} без возможности восстановления
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={deleteIsActive}
                  onChange={() => setDeleteIsActive((prev) => !prev)}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label={`Удалить ${isOrder ? "заказ" : "технику"}`}
            />
          </Typography>
          <div style={{ marginTop: "20px", float: "right" }}>
            <Button
              size="small"
              style={{ marginRight: "10px" }}
              onClick={() => setIsModal(false)}
            >
              Отменить
            </Button>
            <Button
              variant="contained"
              size="small"
              color="error"
              disabled={!deleteIsActive}
              onClick={() => {
                onDelete(id);
                setDeleteIsActive(false);
                setIsModal(false);
              }}
            >
              Удалить
            </Button>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default DeleteModal;
