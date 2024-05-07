const AppError = require("../utils/appError");

const sendErrorDev = (err, res) => {
  res.render("404", {
    statusCode: err.statusCode,
    status: err.status,
    message: err.message,
  });
};
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    //do something
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    //do something
  }
};
