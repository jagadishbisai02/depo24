const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");

const Auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    } else {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) {
        return res.status(401).json({ error: "Unauthorized" });
      } else {
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
          return res.status(404).json({ error: "user not foud" });
        } else {
          req.user = user;
          next();
        }
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
// const isLogin = async (req, res, next) => {
//   try {
//     if (req.session.user) {
//     } else {
//       res.redirect("/");
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const isLogout = async (req, res, next) => {
//   try {
//     if (req.session.user) {
//       res.redirect("/dashboard");
//     }
//     next();
//   } catch (error) {
//     console.log(error.message);
//   }
// };

module.exports = {
  Auth
};
