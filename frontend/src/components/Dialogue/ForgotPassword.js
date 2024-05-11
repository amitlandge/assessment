import React from "react";
import "./ForgotPassword.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
const ForgotPassword = (prop) => {
  return (
    <>
      <Dialog
        open={prop.isOpen}
        aria-labelledby="form-dialog-title"
        onClose={() => {
          prop.closeDialog();
        }}
      >
        <DialogTitle id="form-dialog-title">
          <Typography variant="h5" sx={{ color: "rgb(92,33,139)" }}>
            Did you forget password?
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your email address and we’ll send you a link to restore
            password
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
          />

          <DialogActions
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            <Button
              className="loginBtn"
              sx={{
                color: "white",
                alignSelf: "center",
                justifySelf: "center",
                marginTop: "2rem",
              }}
            >
              Request reset link
            </Button>
            <Link
              to="/login"
              onClick={() => {
                prop.closeDialog();
              }}
            >
              Back To Login
            </Link>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ForgotPassword;
