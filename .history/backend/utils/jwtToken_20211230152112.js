// Tạo mã thông báo và lưu trong cookie

const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  // tùy chọn cho cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode,message);.cookie("token", token, options).json({
    success: true,
    message,
    user,
    token,
  });
};

module.exports = sendToken;