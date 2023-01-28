const express = require("express");
const connection = require("./config/db");
const PORT = process.env.PORT || 9000;

require("dotenv").config();


const { userRegister, userLogin } = require("./Controllers/user.controller");

const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/register", userRegister);
app.post("/login", userLogin);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to db");
  } catch (error) {
    console.log("Error in connecting", error.message);
  }
  console.log(`Listening on port ${PORT}`);
});