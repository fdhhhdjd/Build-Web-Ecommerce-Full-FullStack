const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
} = require("../Controllers/userController");
const { isAuthenticatedUser } = require("../middleware/auth");
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
//!Get User Detail Login Take account Login or Register
router.route("/me").get(isAuthenticatedUser, getUserDetails);
//!update password
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
//!upload Profile
router.route("/me/update").put(isAuthenticatedUser, updateProfile);
module.exports = router;
