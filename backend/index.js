const express = require("express");
const dotenv = require("dotenv");
const db = require("./db/db");
const authRoute = require("./routes/authRoute");
const roleRoute = require("./routes/roleRoute");
const adminUserRoute = require("./routes/adminUserRoute");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary");
const expressUpload = require("express-fileupload");
const cors = require("cors");
dotenv.config();
db();
const app = express();
app.use(
  expressUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/api/v1", authRoute);
app.use("/api/v1/role", roleRoute);
app.use("/api/v1/admin", adminUserRoute);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
