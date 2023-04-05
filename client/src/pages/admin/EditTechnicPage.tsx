import {
  Box,
  Button,
  DialogTitle,
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import { useTypedSelector } from "../../store/hooks/useTypedSelector";
import { TechnicState } from "../../store/slices/technicSlice";
import Loader from "../../UI/Loader";
import TextEditor from "../../components/admin/TextEditor";
import { technicsTypes } from "../../utils/technicsTypes";

const EditTechnicPage: React.FC = () => {
  const { id } = useParams();
  const { technicList, status } = useTypedSelector((state) => state.technic);
  const { updateTechnic } = useAdmin();
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [shortDescription, setShortDescription] = useState<string>("");
  const [fullDescription, setFullDescription] = useState<string>("");
  const [characteristic, setCharacteristic] = useState<string>("");
  const [type, setType] = useState<string>("");

  useEffect(() => {
    const index = technicList.findIndex(
      (el: TechnicState) => el.id.toString() === id
    );
    const technic = technicList[index];
    setName(technic.name);
    setPrice("" + technic.price);
    setShortDescription(technic.shortDescription);
    setFullDescription(technic.fullDescription);
    setCharacteristic(technic.characteristic);
    setType("" + technicsTypes.indexOf(technic.type));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const clickHandler = () => {
    if (!id) return;
    updateTechnic(+id, {
      name,
      characteristic,
      fullDescription,
      price,
      shortDescription,
      type: technicsTypes[+type],
    });
  };
  if (status === "pending") return <Loader />;
  return (
    <>
      <DialogTitle style={{ textAlign: "center" }}>{name}</DialogTitle>
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
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
          <TextField
            id="price"
            label="цена"
            variant="outlined"
            type="number"
            size="small"
            margin="normal"
            value={price}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPrice(e.target.value)
            }
          />
          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Тип</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Тип"
                onChange={(event: SelectChangeEvent) =>
                  setType(event.target.value as string)
                }
                sx={{ mt: 1, height: "40px" }}
              >
                {technicsTypes.map((type, i) => (
                  <MenuItem key={type} value={i}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <div style={{ marginTop: "20px", padding: "15px" }}>
            <DialogTitle
              style={{
                textAlign: "center",
                margin: "0 0 5px 0",
              }}
            >
              Краткое описание
            </DialogTitle>
            <TextEditor text={shortDescription} setText={setShortDescription} />
          </div>
          <div style={{ marginTop: "20px", padding: "15px" }}>
            <DialogTitle
              style={{
                textAlign: "center",
                margin: "0 0 5px 0",
              }}
            >
              Полное описание
            </DialogTitle>
            <TextEditor text={fullDescription} setText={setFullDescription} />
          </div>
          <div style={{ marginTop: "20px", padding: "15px" }}>
            <DialogTitle
              style={{
                textAlign: "center",
                margin: "0 0 5px 0",
              }}
            >
              Характеристика
            </DialogTitle>
            <TextEditor text={characteristic} setText={setCharacteristic} />
          </div>
        </FormGroup>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" onClick={clickHandler} size="large">
            Сохранить
          </Button>
        </Box>
      </Paper>
    </>
  );
};

export default EditTechnicPage;
