const express = require('express');

const router = express.Router();

const {UserController} = require('../../controllers');
const {AuthValidationMiddleware} = require('../../middlewares');
router.post('/signUp',AuthValidationMiddleware.authValidation,UserController.signUp);

router.post('/signIn',AuthValidationMiddleware.authValidation, UserController.signIn);

router.post('/role',AuthValidationMiddleware.checkAuth, AuthValidationMiddleware.isAdmin ,UserController.addRoleToUser);
module.exports = router;