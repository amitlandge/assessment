import React, { useState } from "react";
import AppLayout from "../Layout/AppLayout";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { server } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layout/Loader";
import { clearLoading, setLoading } from "../../redux/reducers/role";

function CreateRole() {
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.role);
  const dispatch = useDispatch();
  const addRoleHandler = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${server}/api/v1/role/create`,
        {
          role,
          status: status,
        },
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success("Role Added Successfully");
        dispatch(clearLoading());
        navigate("/roles");
      }
    } catch (error) {
      dispatch(clearLoading());
      toast.error(error.response?.data?.message);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <AppLayout>
          <Box
            sx={{
              padding: "3rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "3rem",
            }}
          >
            <TextField
              placeholder="Enter Role..."
              type="text"
              variant="outlined"
              sx={{ width: "20rem" }}
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
              }}
            />
            <FormControl
              sx={{
                width: "20rem",
              }}
            >
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <MenuItem value={true}>Active</MenuItem>
                <MenuItem value={false}>Inactive</MenuItem>
              </Select>
            </FormControl>
            <Button
              onClick={addRoleHandler}
              variant="contained"
              sx={{
                background: "rgb(92, 33, 139)",
              }}
            >
              Add Role
            </Button>
          </Box>
        </AppLayout>
      )}
    </>
  );
}

export default CreateRole;
