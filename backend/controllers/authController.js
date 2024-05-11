const bcryptjs = require("bcryptjs");
const User = require("../model/authSchema");
const jwt = require("jsonwebtoken");

const options = {
  expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  httpOnly: true,
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(email)) {
      throw new Error("Please Enter Valid Email");
    }
    if (!password.trim()) {
      throw new Error("Please Enter Password");
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("User is not Available");
    }
    const bcryptPassword = await bcryptjs.compare(password, user.password);
    if (!bcryptPassword) {
      throw new Error("Password dosen't match");
    }
    if (bcryptPassword && user) {
      const jwtToken = jwt.sign({ email: email }, process.env.SECRET_KEY, {
        expiresIn: "2d",
      });
      user.password = undefined;
      user.token = jwtToken;
      res.status(200).cookie("token", jwtToken, options).json({
        success: true,
        user: user,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const myProfile = (req, res) => {
  try {
    if (req.user === undefined) {
      throw new Error("User Is Not Available");
    }
    res.status(200).json({
      user: req.user,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const logout = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    message: "Success",
  });
};
exports.login = login;
exports.myProfile = myProfile;
exports.logout = logout;
