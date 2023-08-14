const express = require('express');
const adminController = require('../controller/admin.controller');
const adminMiddleware = require('../middleware/admin.middleware');

const adminRouter = express.Router();

adminRouter.post('/token', adminController.publish_token);
adminRouter.get('/', adminMiddleware.check_token, adminController.return_hello);

module.exports = adminRouter;