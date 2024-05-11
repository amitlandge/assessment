const express = require("express");

const auth = require("../middleware/auth");
const {
  createUser,
  getAllUSers,
  getSingleUser,
  deleteUser,
  updateUser,
  searchUser,
} = require("../controllers/adminUserController");

const router = express.Router();

router.post("/create", auth, createUser);
router.get("/search", auth, searchUser);
router.get("/", auth, getAllUSers);
router.get("/:uid", auth, getSingleUser);
router.delete("/:uid", auth, deleteUser);
router.put("/update/:uid", auth, updateUser);

module.exports = router;
