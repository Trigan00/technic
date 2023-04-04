import { Button, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import chooseColorOrTranslate from "../../helpers/chooseColorOrTranslate";

interface StatusChangerProps {
  currentStatus: string;
  setStatus: (status: string, id: number) => void;
  orderId: number;
}

const StatusChanger: React.FC<StatusChangerProps> = ({
  currentStatus,
  setStatus,
  orderId,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const statusChangeHandler = (status: string) => {
    setStatus(status, orderId);
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ color: chooseColorOrTranslate(currentStatus, true) }}
      >
        {chooseColorOrTranslate(currentStatus, false)}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => statusChangeHandler("given")}>Выдана</MenuItem>
        <MenuItem onClick={() => statusChangeHandler("returned")}>
          Возвращена
        </MenuItem>
        <MenuItem onClick={() => statusChangeHandler("pending")}>
          В ожидании
        </MenuItem>
      </Menu>
    </div>
  );
};

export default StatusChanger;
