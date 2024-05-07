const User = require("../modles/userModle");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWTSECRET;
const catchAsync = require("../utils/catchAsynch");
const AppError = require("../utils/appError");
const jwtToken = (id) => {
  return jwt.sign({ id: id }, jwtSecret);
};
const signupPost = catchAsync(async (req, res, next) => {
  const data = req.body;
  const userName = data.userName;
  const password = data.password;
  const confirmPass = data.confirmPass;
  //first make sure the passwords match | the user exists
  // other wise redirect to sing-up/GET with error messge
  const userExists = await User.findOne({ userName: userName });
  if (userExists) {
    return next(
      new AppError("There is already a user with the same Handel", 400)
    );
  }
  if (password !== confirmPass) {
    return next(new AppError("Passwords Do not match", 400));
  }

  //here everything is valid you've to rendr the /overview/userID
  const user = await User.create({
    userName,
    password,
  });
  //here we will redirect this user to his overview
  //GET /overview/userID
  const token = jwtToken(user._id);
  res.cookie("token", token);
  res.redirect(`/overview/${user._id}`);
});

const signinPost = catchAsync(async (req, res, next) => {
  const userName = req.body.userName;
  const passWord = req.body.password;
  const user = await User.findOne({ userName: userName, password: passWord });
  if (!user || user.length === 0) {
    return next(new AppError("Invalid Email or Password", 401));
  }
  const token = jwtToken(user._id);
  res.cookie("token", token);
  res.redirect(`/overview/${user._id}`);
});

const protect = catchAsync(async (req, res, next) => {
  //1) validate the token is exist
  const { token } = req.cookies;
  if (!token) {
    return next(
      new AppError("Your Token is not valid. Please Login again", 403)
    );
  }
  const decoded = await promisify(jwt.verify)(token, jwtSecret);
  const logedUserId = req.params.id;

  //check if the current user is the logged one already
  if (!decoded.id === logedUserId) {
    return next(
      new AppError("Your Token is not valid. Please Login again", 403)
    );
  }
  next();
});
const logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.redirect("/overview/home");
  } catch (err) {
    res.redirect("/blackHole");
  }
};
module.exports = {
  signupPost,
  signinPost,
  protect,
  logout,
};
// module.exports = autMiddleWare;
