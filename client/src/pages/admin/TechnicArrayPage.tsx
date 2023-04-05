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
import { useNavigate } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import { useTypedSelector } from "../../store/hooks/useTypedSelector";
import { TechnicState } from "../../store/slices/technicSlice";
import DeleteModal from "../../UI/DeleteModal";
import Loader from "../../UI/Loader";
import { adminConsts } from "../../utils/routsConsts";

const TechnicArrayPage: React.FC = () => {
  const selector = useTypedSelector((state) => state.technic);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState({ name: "", id: 0 });
  const { deleteTechnic } = useAdmin();
  const navigate = useNavigate();

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
                        onClick={() =>
                          navigate(
                            adminConsts.EDIT_TECHNIC_ROUTE + "/" + technic.id
                          )
                        }
                      >
                        <Icon>edit</Icon>
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => {
                          setModalInfo({
                            name: technic.name,
                            id: technic.id,
                          });
                          setIsModal(true);
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
        id={modalInfo.id}
        onDelete={deleteHandler}
        isOrder={false}
      />
    </>
  );
};

export default TechnicArrayPage;
