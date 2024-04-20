const express = require('express');

const { InfoController } = require('../../controllers');

const {AuthValidationMiddleware} = require('../../middlewares')
const userRoutes = require('./user-Routes')
const router = express.Router();

router.get('/info',AuthValidationMiddleware.checkAuth, InfoController.info);

router.use('/user', userRoutes);
module.exports = router;