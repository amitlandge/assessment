import { ArrowRight, Category, Group, Home } from "@mui/icons-material";
import { Box, MenuItem, MenuList, Typography } from "@mui/material";
import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  return (
    <div>
      <MenuList>
        <NavLink
          to="/home"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          <MenuItem
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "2rem",
                alignItems: "center",
              }}
            >
              <Home />
              <Typography variant="h6" sx={{ fontSize: "2rem" }}>
                Home
              </Typography>
            </Box>

            <ArrowRight sx={{ fontSize: "4rem" }} />
          </MenuItem>
        </NavLink>

        <NavLink
          to="/roles"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          <MenuItem
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "2rem",
                alignItems: "center",
              }}
            >
              <Category />
              <Typography variant="h6" sx={{ fontSize: "2rem" }}>
                Roles
              </Typography>
            </Box>

            <ArrowRight sx={{ fontSize: "4rem" }} />
          </MenuItem>
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          <MenuItem
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "2rem",
                alignItems: "center",
              }}
            >
              <Group />
              <Typography variant="h6" sx={{ fontSize: "2rem" }}>
                Users
              </Typography>
            </Box>

            <ArrowRight sx={{ fontSize: "4rem" }} />
          </MenuItem>
        </NavLink>
      </MenuList>
    </div>
  );
};

export default Sidebar;
