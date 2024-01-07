const express = require("express");
const app = express();
const cors = require("cors");
const env = require("dotenv");
const index = require("./accOperation/index");
const login = require("./accOperation/login");
const register = require("./accOperation/register");
const userInfo = require("./accOperation/userInfo");

const multer = require("multer");
const upload = multer({ storage: multer.diskStorage({}) });

// ENV FILES
env.config({
  path: "./secret.env",
});
const { SECRET } = process.env;

// MIDDLEWARES
app.use(cors());
app.use(express.json());
const auth = (req, res, next) => {
  let { secret } = req.body;
  if (secret === SECRET) {
    next();
  } else {
    res.json({
      status: false,
      response: "Invalid Secret",
    });
  }
};

// ENDPOINTS
app.get("/", auth, index);
app.post("/login", auth, login);
app.post("/register", upload.single("image"), register);
app.post("/userInfo", auth, userInfo);

app.listen(500);
