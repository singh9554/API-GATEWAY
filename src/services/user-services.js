const statusCode = require('http-status-codes');

const {Auth} = require('../utils/common');

const AppError = require('../utils/Error/app-error');

const { UserRepository } = require('../repositories');

const userRepository = new UserRepository();

//create sign Up
async function createUser(data) {
  try {
    const user = await userRepository.create(data);
    return user;
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
        explanation.push(err.value);
      });
      throw new AppError(explanation, statusCode.BAD_REQUEST);
    }

    throw new AppError(
      "Entered the required details to get sign up",
      statusCode.INTERNAL_SERVER_ERROR
    );
  }
}

//create sign in function;
async function signIn(data){
try {
   const user = await userRepository.findUserByEmail(data.email);
   
   if(!user){
    throw new AppError('User not found', statusCode.NOT_FOUND);
   }
   const passWordMatch = Auth.checkPassword(data.password, user.password);

   if(!passWordMatch){
    throw new AppError('Invalid password', statusCode.BAD_REQUEST);
   }
   const jwt = Auth.createToken({id : user.id, email : user.email});
   
   return jwt;
} catch (error) {
  if(error instanceof AppError) throw error;
  console.log(error);
  throw new AppError('Something went wrong', statusCode.INTERNAL_SERVER_ERROR);
}
}

//validate Auth Request;
async function isAuthenticated(Token){
 try {
  if(!Token){
    throw new AppError('Jwt Token is missing', statusCode.BAD_REQUEST);
  }

  const response = Auth.verifyToken(Token);

  const user = await userRepository.get(response.id);
  if(!user){
    throw new AppError('No User Found', statusCode.NOT_FOUND);
  }
  return user.id;
 } catch (error) {
  if(error instanceof AppError) throw error;

  if(error.name === 'JsonWebTokenError'){
    throw new AppError('Invalid Jwt Token', statusCode.BAD_REQUEST);
  }
  console.log(error);
  throw new AppError('Something went wrong', statusCode.INTERNAL_SERVER_ERROR);
 }
}

module.exports = {
  createUser,
  signIn,
  isAuthenticated
}

