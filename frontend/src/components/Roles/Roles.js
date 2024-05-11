import React, { useEffect, useState } from "react";
import AppLayout from "../Layout/AppLayout";
import { DataGrid } from "@mui/x-data-grid";
import { Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  clearDelete,
  clearLoading,
  deleteRole,
  getAllRole,
  setLoading,
} from "../../redux/reducers/role";
import { toast } from "react-toastify";
import { server } from "../../constants";
import Loader from "../Layout/Loader";

const Roles = () => {
  const dispatch = useDispatch();
  const { roles, isDelete, isLoading } = useSelector((state) => state.role);
  const [keyword, setKeyword] = useState("");

  const columns = [
    { field: "id", headerName: "Role Id", width: 150, flex: 0.5 },

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
            <Link to={`/roles/update/${params.id}`}>
              <Edit />
            </Link>
            <Button
              onClick={() => {
                deleteProductHandler(params.id);
              }}
            >
              <Delete style={{ cursor: "pointer", color: "red" }} />
            </Button>
          </Box>
        );
      },
    },
  ];
  const deleteProductHandler = async (id) => {
    try {
      dispatch(setLoading(true));
      const res = await axios.delete(`${server}/api/v1/role/${id}`, {
        withCredentials: true,
      });
      dispatch(deleteRole(true));
      if (res.status === 200) {
        dispatch(clearLoading());
        toast.success("Role Delete Successfully");
      }
    } catch (error) {
      dispatch(clearLoading());
      toast.error(error.response?.data.message);
    }
  };

  const rows = [];
  roles &&
    roles.forEach((item, index) => {
      rows.push({
        id: item._id,
        role: item.role,
        status: item.isActive,
      });
    });
  console.log(process.env.PORT);
  const searchRoleHandler = async () => {
    try {
      const res = await axios.get(
        `${server}/api/v1/role/search?keyword=${keyword}`,
        {
          withCredentials: true,
        }
      );

      dispatch(getAllRole(res.data?.roles));
    } catch (error) {}
  };
  useEffect(() => {
    searchRoleHandler();
    if (isDelete) {
      searchRoleHandler();
      dispatch(clearDelete());
    }
  }, [keyword, dispatch, isDelete]);

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
              }}
            >
              <img
                src="https://s3-alpha-sig.figma.com/img/2588/b462/bf3f810f9d10a4876639928b0c9f536e?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Qk~mUG7qZ9eB6W4TMgy0vEg5ek3w-Oou~FpBFuxN3oy6JmO1QiO0z2s5NrToUPzqfLBXwtSwPqg7rACnRQiydfxBPVmF6XQdfp3GzxVdYePGnIP5EzlQoTzqB-cpIvkeSxy~MJdFkcYZBLJPm3wq-6iAJYgymX3lE0MeAhbIJ4AX38F~lyS-CRyXmSGDtSplHFB1LNOY239duv3GwX2glcAlfKMSW1EBJyfE4dYwC459vP5oGGzUzchfsKaK2uQenPlbXOxlZgqhOd2pOfBLRYpI~~PmxypkbfqimRNfaDisKmB5z6iS6HMCJLwwwCksq9JxntbedJ1T7swcyj6o9g__"
                alt="Logo"
                style={{ width: "5rem" }}
              />
              <h4>Roles</h4>
            </Box>
            <TextField
              variant="outlined"
              type="text"
              placeholder="Search Role...."
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
            />
            <Link to="/roles/create">
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

export default Roles;
