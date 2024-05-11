const JWT = require("jsonwebtoken");
const User = require("../model/authSchema");
const auth = async (req, res, next) => {
  const { token } = req.cookies;
  console.log(token);
  try {
    if (!token) {
      throw new Error("Please Login");
    }
    const decode = JWT.verify(token, process.env.SECRET_KEY);

    const userExist = await User.findOne({ email: decode.email });
    req.user = userExist;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      message: error.message,
    });
  }
};
module.exports = auth;
