const statusCode = require('http-status-codes');

const {Auth,Enum} = require('../utils/common');

const AppError = require('../utils/Error/app-error');

const { UserRepository, RoleRepository } = require('../repositories');

const userRepository = new UserRepository();
const roleRepository = new RoleRepository();

//create sign Up
async function createUser(data) {
  try {
    const user = await userRepository.create(data);
    const role = await roleRepository.getRoleByName(Enum.USER_ROLES_ENUM.Customer);
    user.addRole(role);
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
  if(error.name === 'TokenExpiredError'){
    throw new AppError('Jwt Token Expired', statusCode.BAD_REQUEST);
  }
  console.log(error);
  throw new AppError('Something went wrong', statusCode.INTERNAL_SERVER_ERROR);
 }
}

//add role to user 
async function addRoleToUser(data){
 try {
  const user = await userRepository.get(data.id);
  if(!user){
    throw new AppError('No User Found for the given id', statusCode.NOT_FOUND);
  }
    const role = await roleRepository.getRoleByName(data.role);
    if(!role) {
      throw new AppError('No role Found for the given id', statusCode.NOT_FOUND);
    }
    user.addRole(role);
    return user;
 } catch (error) {
  if(error instanceof AppError) throw error;
  console.log(error);
  throw new AppError('Something went wrong', statusCode.INTERNAL_SERVER_ERROR);
 }
}

//Is Admin
async function isAdmin(id){
  try {
    const user = await userRepository.get(id);
    if(!user){
      throw new AppError('No User Found for the given id', statusCode.NOT_FOUND);
    }
    const adminRole = await roleRepository.get(Enum.USER_ROLES_ENUM.Admin);
    if(!adminRole) {
      throw new AppError('No role Found for the given id', statusCode.NOT_FOUND);
    }
      return user.hasRole(adminRole);
  } catch (error) {
    
  }
}
module.exports = {
  createUser,
  signIn,
  isAuthenticated,
  addRoleToUser,
  isAdmin
}

