import {
  Button,
  DialogTitle,
  FormGroup,
  Paper,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import { useTypedSelector } from "../../store/hooks/useTypedSelector";
import { TechnicState } from "../../store/slices/technicSlice";
import Loader from "../../UI/Loader";

const EditTechnicPage: React.FC = () => {
  const { id } = useParams();
  const { technicList, status } = useTypedSelector((state) => state.technic);
  const { updateTechnic } = useAdmin();
  const [technicInfo, setTechnicInfo] = useState<TechnicState>();

  useEffect(() => {
    const index = technicList.findIndex(
      (el: TechnicState) => el.id.toString() === id
    );
    setTechnicInfo(technicList[index]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const clickHandler = () => {
    if (!id) return;
    updateTechnic(+id, { name: "hope", price: "1000" });
  };
  if (!technicInfo) return <Loader />;
  return (
    <>
      <DialogTitle style={{ textAlign: "center" }}>
        {technicInfo.name}
      </DialogTitle>
      <Paper elevation={3} sx={{ p: "15px" }}>
        <FormGroup>
          <TextField
            id="outlined-basic"
            label="название"
            variant="outlined"
            type="text"
            size="small"
            sx={{
              w: "100%",
            }}
            value={technicInfo.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTechnicInfo((prev: any) => {
                return { ...prev, name: e.target.value };
              })
            }
          />
          <TextField
            id="price"
            label="цена"
            variant="outlined"
            type="number"
            size="small"
            margin="normal"
            value={technicInfo.price}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTechnicInfo((prev: any) => {
                return { ...prev, price: e.target.value };
              })
            }
          />
        </FormGroup>
        <Button variant="contained" onClick={clickHandler}>
          Сохранить
        </Button>
      </Paper>
    </>
  );
};

export default EditTechnicPage;
