const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {ServerConfig} = require('../../config');

//check password
function checkPassword(plainPassword, encryptedPassWord){
    try {
     return bcrypt.compareSync(plainPassword, encryptedPassWord);
    } catch (error) {
     console.log(error);
     throw error;
    }
   }

   //Create Token
   function createToken(input){
    try {
         return jwt.sign(input,ServerConfig.JWT_Secret, {expiresIn: ServerConfig.JWT_Expires});
        
    } catch (error) {
        console.log(error);
     throw error;
    }
   }

   //Verify Token
  function verifyToken(Token){
    try {
        return jwt.verify(Token,ServerConfig.JWT_Secret);
    } catch (error) {
        console.log(error);
        throw error;
    }
  }
   module.exports = {
    checkPassword,
    createToken,
    verifyToken
   }
   