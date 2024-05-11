const User = require("../model/adminUserSchema");
const cloudinary = require("cloudinary");
const createUser = async (req, res) => {
  try {
    const { name, email, mobile, role, status } = req.body;

    if (req.files === null) {
      throw new Error("Image is Required");
    }
    if (mobile.trim().length !== 10) {
      throw new Error("Mobile Number must be 10 digit");
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(email)) {
      throw new Error("Please Enter Valid Email");
    }
    const { image } = req.files;
    const myCloud = await cloudinary.v2.uploader.upload(image.tempFilePath, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
    if (!name.trim()) {
      throw new Error("Name is Required");
    } else if (!role.trim()) {
      throw new Error("Role is required");
    }
    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      throw new Error("Email is already exist");
    }
    const user = await User.create({
      name,
      email,
      mobile,
      status,
      role,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });
    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const getAllUSers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      users: users,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};
const getSingleUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await User.findById(uid);
    res.status(200).json({
      user: user,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const deleteUser = await User.findByIdAndDelete(uid);
    if (deleteUser) {
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
const updateUser = async (req, res) => {
  try {
    const { name, email, mobile, role, status } = req.body;

    const { uid } = req.params;
    const findUser = await User.findById(uid);
    if (!name.trim()) {
      throw new Error("Please Enter Name");
    }
    if (mobile.trim().length !== 10) {
      throw new Error("Mobile Number Must be 10 digit");
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    console.log(emailRegex.test(email));
    if (!emailRegex.test(email)) {
      throw new Error("Please Enter Valid Email");
    }
    if (req.files === null || req.files === undefined) {
      const user = await User.findByIdAndUpdate(uid, {
        email: email,
        name: name,
        avatar: {
          public_id: findUser.avatar.public_id,
          url: findUser.avatar.url,
        },
        mobile,
        role,
        isActive: status || findUser.isActive,
      });
      await user.save();
      res.status(200).json({
        user,
      });
    } else {
      const { image } = req.files;
      await cloudinary.v2.uploader.destroy(findUser.avatar.public_id);
      const myCloud = await cloudinary.v2.uploader.upload(image.tempFilePath, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });

      const user = await User.findByIdAndUpdate(uid, {
        name,
        email,
        mobile,
        status,
        role,
        avatar: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
      });
      await user.save();
      res.status(200).json({
        user,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const searchUser = async (req, res) => {
  try {
    const { keyword } = req.query;

    const findUsers = await User.find({
      $or: [
        {
          name: { $regex: keyword, $options: "i" },
        },
      ],
    });

    res.status(200).json({
      users: findUsers,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
exports.createUser = createUser;
exports.getAllUSers = getAllUSers;
exports.getSingleUser = getSingleUser;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;
exports.searchUser = searchUser;
