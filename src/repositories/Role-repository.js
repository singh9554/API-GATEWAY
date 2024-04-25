const crudRepository = require('./CURD-repository');
const { Role } = require('../models');

class RoleRepository extends crudRepository {
    constructor() {
        super(Role);
    }

    async getRoleByName(name){
        const role = await Role.findOne({ where: { name: name } });
        return role;
    }
}

module.exports = RoleRepository;
