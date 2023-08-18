const express = require('express');
const adminController = require('../controller/admin.controller');
const adminMiddleware = require('../middleware/admin.middleware');

const adminRouter = express.Router();

adminRouter.post('/token', adminController.publish_token);
adminRouter.use(adminMiddleware.check_token);
adminRouter.post('/enroll', adminMiddleware.check_enroll_school, adminController.enroll_school);
adminRouter.post('/news/:school_id?', adminMiddleware.check_write_school_news, adminController.write_school_news);
adminRouter.put('/news/:news_id?', adminMiddleware.check_update_school_news, adminController.update_school_news);
adminRouter.delete('/news/:news_id?', adminMiddleware.check_delete_school_news, adminController.delete_school_news);

module.exports = adminRouter;