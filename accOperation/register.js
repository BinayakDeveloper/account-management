const cloud = require("../database/cloudinary");
const database = require("../database/connection");
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: "../secret.env" });

async function register(req, res) {
  let { file } = req;
  let { name, contact } = req.body;

  if (file.mimetype.startsWith("image") === false || file.size > 10485759) {
    res.json({
      status: false,
      response: "Upload Images Under 10MB",
    });
  } else {
    let userExistance = await database.findOne({ name, contact });

    if (userExistance === null) {
      let cloudResponse = await cloud.uploader.upload(file.path, {
        folder: "userData",
      });

      let user = await database.create({
        name,
        contact,
        imageUrl: cloudResponse.secure_url,
        imagePublicId: cloudResponse.public_id,
      });

      let jwtToken = await jwt.sign({ id: user.id }, process.env.JWT_SECRET);

      user.token[0] = { token: jwtToken };

      await user.save();

      res.json({
        status: true,
        response: "User Registered",
      });
    } else {
      res.json({
        status: false,
        response: "User Already Exists",
      });
    }
  }
}

module.exports = register;
