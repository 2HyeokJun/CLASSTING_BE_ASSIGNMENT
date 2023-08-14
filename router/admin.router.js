const express = require('express');
const adminController = require('../controller/admin.controller');
const adminMiddleware = require('../middleware/admin.middleware');

const adminRouter = express.Router();

adminRouter.post('/token', adminController.publish_token);
adminRouter.use(adminMiddleware.check_token);
adminRouter.post('/enroll', adminController.enroll_school);
adminRouter.post('/newsfeed', adminController.write_newsfeed);
adminRouter.put('/newsfeed/:id', adminController.update_newsfeed);
adminRouter.delete('/newsfeed/:id', adminController.delete_newsfeed);

module.exports = adminRouter;