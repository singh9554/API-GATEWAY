const {userService} = require('../services');

const statusCode = require("http-status-codes");

const { SuccessResponse, ErrorResponse } = require("../utils/common");

/*
create Sign Up;
post -> req.body.email = abc@mail.com, req.body.password = 12345;
*/
async function signUp(req, res) {
    try {
      const user = await userService.createUser({
        email: req.body.email,
        password: req.body.password,
      });
      SuccessResponse.message = "singed up successfully";
      SuccessResponse.data = user;
      return res.status(statusCode.CREATED).json(SuccessResponse);
    } catch (error) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);  
    }
  }

  async function signIn(req, res){
    try {
      const user = await userService.signIn({
        email: req.body.email,
        password: req.body.password,
      });
      SuccessResponse.message = "singed In successfully";
      SuccessResponse.data = user;
      return res.status(statusCode.CREATED).json(SuccessResponse);
    } catch (error) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);  
    }
  }
module.exports = {
    signUp,
    signIn
}