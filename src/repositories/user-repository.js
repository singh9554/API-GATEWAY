const crudRepository = require('./CURD-repository');
const { User } = require('../models');

class UserRepository extends crudRepository {
    constructor() {
        super(User);
    }

    async findUserByEmail(email){
        const user = await User.findOne({ where: { email: email } });
        return user;
    }
}

module.exports = UserRepository;
