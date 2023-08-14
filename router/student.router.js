const express = require('express');
const studentController = require('../controller/student.controller');
const studentMiddleware = require('../middleware/student.middleware');

const studentRouter = express.Router();

studentRouter.post('/token', studentController.publish_token);
studentRouter.get('/', studentMiddleware.check_token, studentController.return_hello);

module.exports = studentRouter;