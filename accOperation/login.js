const database = require("../database/connection");

require("dotenv").config({ path: "../secret.env" });

async function login(req, res) {
  let { name, contact } = req.body;

  let user = await database.findOne({ name, contact });

  if (user !== null) {
    res.json({
      status: true,
      token: user.token[0].token,
    });
  } else {
    res.json({
      status: false,
      response: "Invalid Login Credentials",
    });
  }
}

module.exports = login;
