const express = require("express");
const {
  createRole,
  getAllRole,
  deleteRole,
  updateRole,
  getSingleRole,
  searchRole,
} = require("../controllers/roleController");
const auth = require("../middleware/auth");

const router = express.Router();
router.post("/create", auth, createRole);
router.get("/", auth, getAllRole);
router.get("/search", auth, searchRole);
router.delete("/:rid", auth, deleteRole);
router.put("/:rid", auth, updateRole);
router.get("/:rid", auth, getSingleRole);

module.exports = router;
