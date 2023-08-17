const fn = require('../functions');
const db = require('../models/index');

const check_token = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(400).json({
            error: 'MissingParamError',
            message: 'access_token missing',
        });
    }
    let access_token =  fn.get_token(req.headers.authorization);
    let access_token_info = fn.get_token_info(access_token);

    if (access_token_info === 'jwt expired') {
        return res.status(400).json({
            error: 'UnauthorizedError',
            message: 'token expired',
        });
    }
    
    if (access_token_info === 'invalid token') {
        return res.status(400).json({
            status: 'InvalidParamError',
            message: 'invalid token',
        });
    }

    if (access_token_info.role !== 'student') {
        return res.status(401).json({
            status: 'Unauthorized',
            message: 'token has wrong role',
        });
    }

    if (!access_token_info.student_id) {
        return res.status(400).json({
            status: 'InvalidParamError',
            message: 'invalid token',
        });
    }

    req.student_id = access_token_info.student_id;

    next();
}

const check_get_school_news_list = async (req, res, next) => {
    let school_id = req.params.school_id;
    if (!school_id) {
        return res.status(400).json({
            error: 'MissingParamError',
            message: 'school_id missing',
        });
    }

    if (isNaN(Number(school_id))) {
        return res.status(400).json({
            error: 'InvalidParamError',
            message: 'school_id must be number',
        });
    }

    let student_id = req.student_id;
    let is_student_subscribes_school = await db.models.student_subscription_school.findOne({
        attributes: ['is_subscribed'],
        where: {
            student_id: student_id,
            school_id: school_id,
        }
    });

    if (!is_student_subscribes_school) {
        return res.status(401).json({
            status: 'Unauthorized',
            message: 'you did not subscribe that school',
        });
    }

    next();
}

const check_subscription_history = async (req, res, next) => {
    let school_id = req.params.school_id;
    let student_id = req.student_id;

    if (!school_id) {
        return res.status(400).json({
            error: 'MissingParamError',
            message: 'school_id missing',
        });
    }

    if (isNaN(Number(school_id))) {
        return res.status(400).json({
            error: 'InvalidParamError',
            message: 'school_id must be number',
        });
    }

    let subscription_history = await db.models.student_subscription_school.findOne({
        attributes: ['is_subscribed'],
        where: {
            student_id: student_id,
            school_id: school_id,
        }
    });

    let subscription_checker = {
        before_subscribed: false,
        now_subscribes: false,
    }
    if (subscription_history) {
        subscription_checker.before_subscribed = true;
        subscription_checker.now_subscribes = subscription_history.dataValues.is_subscribed;
    }
    req.subscription_history = subscription_checker;

    next();
}

exports.check_token = check_token;
exports.check_get_school_news_list = check_get_school_news_list;
exports.check_subscription_history = check_subscription_history;