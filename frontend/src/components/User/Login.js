import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import logo from "../../images/logo.png";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import ForgotPassword from "../Dialogue/ForgotPassword";
import { toast } from "react-toastify";
import axios from "axios";
import { UserContext } from "../../context/store";
import { server } from "../../constants";
import Loader from "../Layout/Loader";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [openDialog, setDialoge] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsloading] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((prev) => {
      return (prev = !prev);
    });
  };
  const navigate = useNavigate();
  const openDialogBox = () => {
    setDialoge(true);
  };
  const closeDialog = () => {
    setDialoge(false);
  };
  const submitDataHandler = async (e) => {
    e.preventDefault();
    console.log(email, password);

    if (password.trim().length !== 8) {
      toast.error("Password Must Be 8 Charactor");
    }
    if (email && password) {
      try {
        setIsloading(true);
        const res = await axios.post(
          `${server}/api/v1/login`,
          {
            password: password,
            email: email,
          },
          { withCredentials: true }
        );

        if (res.status === 200) {
          setIsloading(false);
          toast.success("Login Succesfully");
          setUser(res.data.user);
        }
      } catch (error) {
        setIsloading(false);
        toast.error(error.response?.data.message);
      }
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [navigate, user]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="login-container">
          <div className="form-container">
            <div className="logo-container">
              <img src={logo} alt="logo" className="logo" />
            </div>
            <h4 className="login-heading">Welcome to DigitalFlake admin</h4>
            <form className="form" onSubmit={submitDataHandler}>
              <TextField
                required
                id="email"
                label="Email id"
                className="input"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <FormControl variant="outlined" className="input">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        // onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <Button className="forgot-password" onClick={openDialogBox}>
                <Link>Forgot Password</Link>
              </Button>
              <Button variant="contained" className="loginBtn" type="submit">
                Login In
              </Button>
            </form>
          </div>
          {openDialog && (
            <ForgotPassword isOpen={openDialog} closeDialog={closeDialog} />
          )}
        </div>
      )}
    </>
  );
};

export default Login;
