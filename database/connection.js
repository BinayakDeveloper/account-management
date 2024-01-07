const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://WebDeveloper:webdev@maincluster.cq4nipw.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database Connected");
  });

const schema = mongoose.Schema({
  name: String,
  contact: Number,
  imageUrl: String,
  imagePublicId: String,
  token: [
    {
      token: String,
    },
  ],
});

const userModel = mongoose.model("userModel", schema, "user");

module.exports = userModel;
