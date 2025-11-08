const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/mongoSchema");

const signup = async (req, res) => {
  const { name, mobilenumber, email, password } = req.body;
  try {
    const userExist = await User.find({ Email: email });
    if (userExist.length != 0) {
      return res.json({ data: "exist" });
    }
    const hashed = await bcrypt.hash(password, 10);
    await User.create({
      Name: name,
      Email: email.toLowerCase(),
      Mobilenumber: mobilenumber,
      Password: hashed,
    });
    return res.status(201).json({ data: "success" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ data: "failed" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExist = await User.find({ Email: email });
    if (userExist.length == 0) {
      return res.json({ data: "notexist" });
    }
    const decrypt = await bcrypt.compare(password, userExist[0].Password);
    if (decrypt) {
      const token = jwt.sign(
        { email: userExist[0].Email },
        "paruchurirajesh",
        { expiresIn: "3h" }
      );
      res.status(200).json({
        data: "success",
        token,
        Name: userExist[0].Name,
        Email:userExist[0].Email
      });
    } else {
      return res.json({ data: "wrongpassword" });
    }
  } catch (err) {
    console.log(err, err.message);
    return res.json({ data: "error" });
  }
};

module.exports = { signup, login };
