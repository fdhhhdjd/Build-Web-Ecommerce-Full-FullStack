const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
} = require("../Controllers/userController");

const router = express.Router();
//! Register User
router.route("/register").post(registerUser);
//! Login user
router.route("/login").post(loginUser);
//! logout user
router.route("/logout").get(logout);
//! Forgot password
router.route("/password/forgot").post(forgotPassword);

//! link reset password
router.route("/password/reset/:token").put(resetPassword);
module.exports = router;