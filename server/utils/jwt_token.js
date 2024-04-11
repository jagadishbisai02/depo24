const Jwt = require("jsonwebtoken");

const generateToken = (userId, res) => {
  const token = Jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("jwt_token", token, {
    maxAge: 1 * 24 * 60 * 60 * 1000, //MS
    httpOnly: true, //prevent XSS attacks cross-site scripting attacks
    sameSite: "strict", //CRPF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });
};

module.exports = generateToken;
