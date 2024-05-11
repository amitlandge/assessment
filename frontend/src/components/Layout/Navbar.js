import { AccountCircle } from "@mui/icons-material";
import React, { useState } from "react";
import "./AppLayout.css";
import { IconButton } from "@mui/material";

import LogoutDialog from "../Dialogue/LogoutDialog";
const Navbar = () => {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const logoutHandler = async () => {
    setLogoutOpen(true);
  };
  const closeLogoutDialog = () => {
    setLogoutOpen(false);
  };
  return (
    <div>
      <div className="navbar">
        <img
          src="https://s3-alpha-sig.figma.com/img/03e2/9685/10d4ea293d7a14946d8bd331c5e5055f?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BiFJ7Im-ugfrCQCSE~3SjxhCCUrU8ILuuOa4WOfQVinsu37HISJNgeMqdhCaBLMkIrBuSuFP093JDMTrnuQL6b0nJRSRM5~~3x9BMGR6dTOB8onPSlpX-S~mdz1Vv-y13FlIC~QaEdMgaZxxJns6Mv0b3mEmYtXBJI9YXz7mPn~ba0F28rvlCYUh0xbSEFKudKPkGX6g0NJJoHTdzFAAl0-jOOoC78Qm41RoO-paUY7tpmCmMPApSk~lmiuKTltl4-QIJST2MNmpOnOBkSS8ASdWemjmqgKKZf64IdrVgYkHzQqHvF4FXnh9yY1vmkMR3YwMmF1~TmYZnLAlJxQMvQ__"
          alt="logo"
          className="navbar-logo"
        />
        <IconButton onClick={logoutHandler}>
          <AccountCircle sx={{ color: "white", fontSize: "3rem" }} />
        </IconButton>
      </div>
      {logoutOpen && (
        <LogoutDialog isOpen={logoutOpen} onclose={closeLogoutDialog} />
      )}
    </div>
  );
};

export default Navbar;
