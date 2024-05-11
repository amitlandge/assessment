import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AppLayout from "../Layout/AppLayout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";
import { server } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layout/Loader";
import { clearLoading, setLoading } from "../../redux/reducers/role";

const UpdateRole = () => {
  const [getRole, setGetRole] = useState({});
  const [role, setRole] = useState("");
  const [status, setStatus] = useState();
  const { isLoading } = useSelector((state) => state.role);
  const param = useParams();
  const { rid } = param;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const updateRoleHandler = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axios.put(
        `${server}/api/v1/role/${rid}`,
        {
          role,
          status,
        },
        { withCredentials: true }
      );
      if (res.status === 200) {
        navigate("/roles");
        dispatch(clearLoading());
        toast.success("Update Sucessfully");
      }
    } catch (error) {
      dispatch(clearLoading());
      toast.error(error.response?.data.message);
    }
  };

  const getSingleRole = async () => {
    try {
      const res = await axios.get(`${server}/api/v1/role/${rid}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setGetRole(res.data?.role);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getSingleRole();
  }, []);
  useEffect(() => {
    if (getRole && getRole._id !== rid) {
      getSingleRole();
    } else {
      setRole(getRole.role);
      setStatus(getRole.status);
    }
  }, [rid, getRole]);

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
              onClick={updateRoleHandler}
              variant="contained"
              sx={{
                background: "rgb(92, 33, 139)",
              }}
            >
              Update Role
            </Button>
          </Box>
        </AppLayout>
      )}
    </>
  );
};

export default UpdateRole;
