const Role = require("../model/roleSchema");

const createRole = async (req, res) => {
  try {
    const { role, status } = req.body;

    const findRole = await Role.find({
      role: { $eq: role },
    });
    console.log(findRole);
    if (findRole.length > 0) {
      throw new Error("This Role is Already Defined");
    }
    if (!role) {
      throw new Error("Please Define the Role");
    }
    const createRole = await Role.create({
      role: role,
      isActive: status || false,
    });
    res.status(200).json({
      role: createRole,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const getAllRole = async (req, res) => {
  try {
    const roles = await Role.find({});
    res.status(200).json({
      roles: roles,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};
const getSingleRole = async (req, res) => {
  try {
    const { rid } = req.params;
    const role = await Role.findById(rid);
    res.status(200).json({
      role: role,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};
const deleteRole = async (req, res) => {
  try {
    const { rid } = req.params;
    const deleteRole = await Role.findByIdAndDelete(rid);
    if (deleteRole) {
      res.status(200).json({
        message: "Successfull",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const updateRole = async (req, res) => {
  try {
    const { rid } = req.params;
    const { role, status } = req.body;
    if (!role) {
      throw new Error("Please Insert New Role Name");
    }
    const updateRole = await Role.findByIdAndUpdate(rid, {
      role,
      isActive: status,
    });
    if (updateRole) {
      res.status(200).json({
        message: "Successfull",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const searchRole = async (req, res) => {
  try {
    const { keyword } = req.query;
    console.log(keyword);
    const findRole = await Role.find({
      $or: [
        {
          role: { $regex: keyword, $options: "i" },
        },
      ],
    });

    res.status(200).json({
      roles: findRole,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.createRole = createRole;
exports.getAllRole = getAllRole;
exports.deleteRole = deleteRole;
exports.updateRole = updateRole;
exports.getSingleRole = getSingleRole;
exports.searchRole = searchRole;
