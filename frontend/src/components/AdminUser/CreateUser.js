import React, { useEffect, useState } from "react";
import AppLayout from "../Layout/AppLayout";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  styled,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Cloud } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getAllRole } from "../../redux/reducers/role";
import { server } from "../../constants";
import { clearLoading, setLoading } from "../../redux/reducers/user";
import Loader from "../Layout/Loader";

function CreateUser() {
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [avatar, setAvatar] = useState();
  const dispatch = useDispatch();
  const { roles } = useSelector((state) => state.role);
  const { isLoading } = useSelector((state) => state.user);
  const getAllRoles = async () => {
    try {
      const res = await axios.get(`${server}/api/v1/role`, {
        withCredentials: true,
      });

      dispatch(getAllRole(res.data?.roles));
    } catch (error) {}
  };

  useEffect(() => {
    getAllRoles();
  }, []);
  const addUserHandler = async () => {
    try {
      dispatch(setLoading(true));
      const formData = new FormData();
      formData.append("image", avatar);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("mobile", mobile);
      formData.append("role", role);
      formData.append("status", status);
      const res = await axios.post(`${server}/api/v1/admin/create`, formData, {
        withCredentials: true,
      });
      if (res.status === 200) {
        dispatch(clearLoading());
        toast.success("User Added Successfully");
        navigate("/users");
      }
    } catch (error) {
      dispatch(clearLoading());
      toast.error(error.response?.data?.message);
    }
  };
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

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
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "3rem",
              flexWrap: "wrap",
            }}
          >
            <TextField
              placeholder="Enter Name"
              type="text"
              variant="outlined"
              sx={{ width: "20rem" }}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextField
              placeholder="Enter Email"
              required={true}
              type="email"
              variant="outlined"
              sx={{ width: "20rem" }}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              placeholder="Enter Mobile"
              type="text"
              variant="outlined"
              sx={{ width: "20rem" }}
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
              }}
            />

            <FormControl
              sx={{
                width: "20rem",
              }}
            >
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="Role"
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              >
                {roles &&
                  roles?.map((role) => {
                    return <MenuItem value={role.role}>{role.role}</MenuItem>;
                  })}
              </Select>
            </FormControl>

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
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<Cloud />}
            >
              Upload file
              <VisuallyHiddenInput
                type="file"
                accept="image/jpg"
                onChange={(e) => {
                  setAvatar(e.target.files[0]);
                }}
              />
            </Button>
          </Box>
          <Button
            onClick={addUserHandler}
            variant="contained"
            sx={{
              background: "rgb(92, 33, 139)",
              display: "block",
              margin: "0 auto",
            }}
          >
            Add User
          </Button>
        </AppLayout>
      )}
    </>
  );
}

export default CreateUser;
