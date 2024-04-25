const statusCode = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/Error/app-error");

const { userService } = require("../services");
const authValidation = (req, res, next) => {
  if (!req.body.email) {
    ErrorResponse.error = new AppError(
      ["enter your valid email"],
      statusCode.BAD_REQUEST
    );
    return res.status(statusCode.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.password) {
    ErrorResponse.error = new AppError(
      ["set a password to move forward"],
      statusCode.BAD_REQUEST
    );
    return res.status(statusCode.BAD_REQUEST).json(ErrorResponse);
  }

  next();
};

//verify Auth;

const checkAuth = async (req, res, next) => {
  try {
    const response = await userService.isAuthenticated(
      req.headers["x-access-token"]
    );
    if (response) {
      req.user = response;
      next();
    }
  } catch (error) {
    return res.status(error.statusCode).json(error);
  }
};

//check is Admin or not

const isAdmin = async (req, res, next) => {
    const response = await userService.isAdmin(req.user);
    if(!response){
      return res.status(statusCode.UNAUTHORIZED).json({message : 'User is not authorized for the action'});
    }
    next();
}
module.exports = {
  authValidation,
  checkAuth,
  isAdmin
};
