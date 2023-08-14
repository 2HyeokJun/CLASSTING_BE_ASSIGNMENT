const express = require('express');
const studentController = require('../controller/student.controller');
const studentMiddleware = require('../middleware/student.middleware');

const studentRouter = express.Router();

studentRouter.post('/token', studentController.publish_token);
studentRouter.use(studentMiddleware.check_token);
studentRouter.get('/subscription_list', studentController.get_subscription_list);
studentRouter.get('/newsfeed:school_id', studentController.get_newsfeed_list);
studentRouter.post('/subscribe', studentController.subscribe_school);
studentRouter.put('/subscribe', studentController.unsubscribe_school);

module.exports = studentRouter;