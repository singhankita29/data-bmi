const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../Models/user.model");
const { Bmi } = require("../Models/bmi.model");

const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  const present = await User.findOne({ email });
  if (present) {
    res.send("User already exists");
  } else {
    bcrypt.hash(password, 6, async function (err, hash) {
      if (err) {
        res.send("Something went wrong.Please try again!");
      } else {
        const user = new User({ name, email, password: hash });
        await user.save();
        res.send("User registerd successfully");
      }
    });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user === null) {
    res.status(401).send("Wrong credentials");
  } else {
    const hash = user.password;
    const name = user.name;
    const email = user.email;
    const userId = user._id;
    bcrypt.compare(password, hash, function (err, result) {
      if (result) {
        const token = jwt.sign({ id: userId }, process.env.SECRET_KEY);
        res.send({ msg: "Login Successfull!!", name, email, token: token });
      } else {
        res.status(401).send("Wrong credentials");
      }
    });
  }
};

const bmiCal = async (req, res) => {
  const { weight, height } = req.body;
  const bmi = weight / (height * height);
  await bmi.save();
  res.send("BMI calculated");
};

module.exports = { userRegister, userLogin, bmiCal };