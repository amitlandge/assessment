const express = require("express");
const { login, myProfile, logout } = require("../controllers/authController");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/login", login);

router.get("/myProfile", auth, myProfile);
router.get("/logout", auth, logout);
module.exports = router;
