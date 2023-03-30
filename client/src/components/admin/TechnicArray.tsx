import {
  DialogTitle,
  Box,
  List,
  ListItem,
  IconButton,
  Icon,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import useAdmin from "../../hooks/useAdmin";
import { useTypedSelector } from "../../store/hooks/useTypedSelector";
import { TechnicState } from "../../store/slices/technicSlice";
import DeleteModal from "../../UI/DeleteModal";
import Loader from "../../UI/Loader";

const TechnicArray: React.FC = () => {
  const selector = useTypedSelector((state) => state.technic);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState({ name: "", id: 0 });
  const { deleteTechnic } = useAdmin();

  const deleteHandler = (id: number) => {
    deleteTechnic(id);
  };

  return (
    <>
      <DialogTitle style={{ textAlign: "center" }}>Список техники</DialogTitle>
      <Box sx={{ width: "100%" }}>
        <Paper elevation={3}>
          <List>
            {selector.status !== "pending" ? (
              selector.technicList.map((technic: TechnicState, i) => (
                <ListItem
                  key={technic.id}
                  secondaryAction={
                    <div>
                      <IconButton
                        sx={{ mr: "5px" }}
                        aria-label="edit"
                        onClick={() => {
                          // setEditVideoId(video.id);
                          // setIsEdit(true);
                        }}
                      >
                        <Icon>edit</Icon>
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => {
                          setIsModal(true);
                          setModalInfo({
                            name: technic.name,
                            id: technic.id,
                          });
                        }}
                      >
                        <Icon>delete</Icon>
                      </IconButton>
                    </div>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>{i + 1}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={technic.name} />
                </ListItem>
              ))
            ) : (
              <Loader />
            )}
          </List>
        </Paper>
      </Box>
      <DeleteModal
        isModal={isModal}
        setIsModal={setIsModal}
        technicName={modalInfo.name}
        technicId={modalInfo.id}
        onDelete={deleteHandler}
      />
    </>
  );
};

export default TechnicArray;
