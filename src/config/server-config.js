const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    SALT_ROUNDS : process.env.SALT_ROUNDS,
    JWT_Secret : process.env.JWT_Secret,
    JWT_Expires : process.env.JWT_Expires
}