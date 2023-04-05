import {
  Box,
  Button,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import ImageChanger from "../../components/admin/ImageChanger";
import TextEditor from "../../components/admin/TextEditor";
import useAdmin from "../../hooks/useAdmin";
import { useTypedDispatch } from "../../store/hooks/useTypedDispatch";
import { setAlert } from "../../store/slices/alertSlice";
import Loader from "../../UI/Loader";
import { technicsTypes } from "../../utils/technicsTypes";

const AddTechnicPage: React.FC = () => {
  const { addTechnic, isLoading } = useAdmin();
  const dispatch = useTypedDispatch();
  const [imgFile, setImgFile] = useState<File>();
  const [imgFileDescription, setImgFileDescription] = useState<File>();
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [shortDescription, setShortDescription] = useState<string>("");
  const [fullDescription, setFullDescription] = useState<string>("");
  const [characteristic, setCharacteristic] = useState<string>("");
  const [type, setType] = useState<string>("");

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const name = event.target.name;
    switch (name) {
      case "Изображение для карточки":
        setImgFile(event.target.files[0]);
        break;
      case "Изображение для описания":
        setImgFileDescription(event.target.files[0]);
        break;
    }
  };

  const uploadHandler = async () => {
    if (
      imgFile &&
      price.trim() &&
      name.trim() &&
      imgFileDescription &&
      technicsTypes[+type]
    ) {
      return addTechnic(
        imgFile,
        imgFileDescription,
        name,
        fullDescription,
        shortDescription,
        characteristic,
        price,
        technicsTypes[+type]
      );
    }
    dispatch(
      setAlert({
        severity: "error",
        message: "Введены не все данные",
      })
    );
  };

  return (
    <>
      <DialogTitle style={{ textAlign: "center" }}>
        Добавить технику
      </DialogTitle>

      <Paper elevation={3} sx={{ p: "15px" }}>
        <TextField
          id="outlined-basic"
          label="название"
          variant="outlined"
          type="text"
          size="small"
          fullWidth
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
          fullWidth
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

        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <ImageChanger
            imgFile={imgFile}
            changeHandler={changeHandler}
            width={225}
            height={120}
            title={"Изображение для карточки"}
          />
          <ImageChanger
            imgFile={imgFileDescription}
            changeHandler={changeHandler}
            width={420}
            height={420}
            title={"Изображение для описания"}
          />
        </div>
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
        <div style={{ marginTop: "10px" }}>
          {!isLoading ? (
            <Button
              variant="contained"
              style={{ width: "100%" }}
              onClick={uploadHandler}
            >
              Добавить
            </Button>
          ) : (
            <Loader />
          )}
        </div>
      </Paper>
    </>
  );
};

export default AddTechnicPage;
