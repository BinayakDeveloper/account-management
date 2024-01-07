const database = require("../database/connection");
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: "../secret.env" });

async function userInfo(req, res) {
  const { token } = req.body;

  try {
    let tokenVerify = await jwt.verify(token, process.env.JWT_SECRET);
    let userId = tokenVerify.id;
    let user = await database.findById(userId);
    if (user !== null) {
      res.json({
        status: true,
        imageUrl: user.imageUrl,
        name: user.name,
        contact: user.contact,
      });
    }
  } catch (e) {
    res.json({
      status: false,
      response: "Invalid Token",
    });
  }
}

module.exports = userInfo;
