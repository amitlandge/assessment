import React, { useEffect, useState } from "react";
import AppLayout from "../Layout/AppLayout";
import { Box, Button, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { AccountCircle, Delete, Edit } from "@mui/icons-material";
import {
  clearDelete,
  clearLoading,
  getUser,
  setLoading,
  userDelete,
} from "../../redux/reducers/user";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { server } from "../../constants";
import Loader from "../Layout/Loader";

const AdminUser = () => {
  const { isDelete } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.user);
  const [keyword, setKeyword] = useState("");
  const columns = [
    { field: "id", headerName: "User Id", width: 150, flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      flex: 0.3,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      flex: 0.3,
    },
    {
      field: "mobile",
      headerName: "Mobile",
      width: 300,
      flex: 0.3,
    },
    {
      field: "role",
      headerName: "Role",
      width: 150,
      flex: 0.3,
    },
    {
      field: "status",
      headerName: "Status",

      width: 100,
      flex: 0.3,
      renderCell: (value, row) => {
        if (value.row?.status === false) {
          return <Box sx={{ color: "red" }}>Inactive</Box>;
        } else {
          return <Box color={"green"}>Active</Box>;
        }
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      width: 100,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link to={`/users/update/${params.id}`}>
              <Edit />
            </Link>
            <Button
              onClick={() => {
                deleteUserHandler(params.id);
              }}
            >
              <Delete style={{ cursor: "pointer", color: "red" }} />
            </Button>
          </Box>
        );
      },
    },
  ];
  const rows = [];
  users &&
    users.forEach((item, index) => {
      rows.push({
        id: item._id,
        role: item.role,
        status: item.isActive,
        name: item.name,
        email: item.email,
        mobile: item.mobile,
      });
    });

  useEffect(() => {
    if (isDelete) {
      searchUserHandler();
      dispatch(clearDelete());
    }
  }, [isDelete, dispatch]);

  const searchUserHandler = async () => {
    try {
      const res = await axios.get(
        `${server}/api/v1/admin/search?keyword=${keyword}`,
        {
          withCredentials: true,
        }
      );

      dispatch(getUser(res.data?.users));
    } catch (error) {}
  };
  useEffect(() => {
    searchUserHandler();
  }, [keyword]);
  const deleteUserHandler = async (id) => {
    try {
      dispatch(setLoading(true));
      const res = await axios.delete(`${server}/api/v1/admin/${id}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        dispatch(userDelete(true));
        dispatch(clearLoading(false));
        toast.success("User Delete Successfully");
      }
    } catch (error) {
      dispatch(clearLoading(false));
      toast.error(error.response?.data.message);
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
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "2rem",
              width: "90%",
              margin: "2% 0%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <AccountCircle />
              <h4>Users</h4>
            </Box>
            <TextField
              variant="outlined"
              type="text"
              placeholder="Search Role...."
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
            />
            <Link to="/users/create">
              <Button
                variant="contained"
                sx={{
                  background: "rgb(92, 33, 139)",
                }}
              >
                Add New
              </Button>
            </Link>
          </Box>
          <Box sx={{ width: "90%", height: "70vh" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 8,
                  },
                },
              }}
              pageSizeOptions={[8]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </AppLayout>
      )}
    </>
  );
};

export default AdminUser;
