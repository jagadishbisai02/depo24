const User = require("../models/usermodel");
const generateToken = require("../utils/jwt_token");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ message: "Invalid username or password" });
    } else {
      const isPasswordValid = await bcrypt.compare(
        password,
        user.password || ""
      );
      if (!isPasswordValid) {
        return res.json({ message: "Invalid username or password" });
      } else {
        generateToken(user._id, res);
        res.status(200).json({
          _id: user._id,
          fullName: user.fullName,
          username: user.username,
          avatarImage: user.avatarImage,
        });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.register = async (req, res) => {
  try {
    const { fullName, username, email, password, confirmPassword, gender } =
      req.body;

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ error: "password and confirm password do not matched" });
    } else {
      const user = await User.findOne({ username });
      if (user) {
        return res.status(400).json({ error: "username already exits" });
      } else {
        const emailCheck = await User.findOne({ email });
        if (emailCheck) {
          return res.json({ msg: "Email already used", status: false });
        } else {
          const hashedPassword = await bcrypt.hash(password, 10);
          const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
          const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
          const user = await User.create({
            fullName,
            username,
            email,
            password: hashedPassword,
            gender,
            avatarImage: gender === "male" ? boyProfilePic : girlProfilePic,
          });
          //Generate JWT token here
          generateToken(user._id, res);
          await user.save();
          res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            avatarImage: user.avatarImage,
          });
        }
      }
    }
  } catch (error) {
    res.status(404).json({ error: "Internal server error" });
  }
};

module.exports.logOut = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logged out successfully" });
  } catch (error) {
    res.status(404).json({ error: "Internal server error" });
  }
};
