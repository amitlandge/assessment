import { Dangerous } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import React, { useContext } from "react";
import { UserContext } from "../../context/store";
import { useNavigate } from "react-router-dom";
import { server } from "../../constants";

const LogoutDialog = (prop) => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const onLogout = async () => {
    const res = await axios.get(`${server}/api/v1/logout`, {
      withCredentials: true,
    });
    if (res.status === 200) {
      setUser(null);
      navigate("/login");
    }
  };
  return (
    <div>
      <Dialog
        open={prop.isOpen}
        onClose={() => {
          prop.onclose();
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          variant="h6"
          sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Dangerous sx={{ color: "red" }} />
          Log Out
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              prop.onclose();
            }}
            color="error"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={onLogout}
            variant="outlined"
            sx={{
              backgroundColor: "rgb(92, 33, 139)",
              color: "white",
              ":hover": {
                backgroundColor: "rgb(92, 33, 139)",
                color: "white",
              },
            }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LogoutDialog;
