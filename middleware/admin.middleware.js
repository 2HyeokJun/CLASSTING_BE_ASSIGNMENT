const fn = require('../functions');

const check_token = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(400).json({
            status: 'MissingParamError',
            message: 'access_token missing',
        });
    }
    let access_token =  fn.get_token(req.headers.authorization);
    let access_token_info = fn.get_token_info(access_token);

    if (access_token_info.message === 'jwt expired') {
        return res.status(400).json({
            status: 'UnauthorizedError',
            message: 'token expired',
        });
    }

    if (access_token_info.message === 'invalid token') {
        return res.status(400).json({
            status: 'InvalidParamError',
            message: 'invalid token',
        });
    }

    if (access_token_info.role !== 'admin') {
        return res.status(401).json({
            status: 'Unauthorized',
            message: 'token has wrong role',
        });
    }

    next();
}

const check_enroll_school = async (req, res, next) => {
    let {school_region, school_name} = req.body;
    if (!school_region) {
        return res.status(400).json({
            status: 'MissingParamError',
            message: 'school_region missing',
        });
    };

    if (!school_name) {
        return res.status(400).json({
            status: 'MissingParamError',
            message: 'school_name missing',
        });
    }

    next();
}

const check_write_school_news = async (req, res, next) => {
    let school_id = req.params.school_id;
    let news_content = req.body.news_content;
    if (!school_id) {
        return res.status(400).json({
            status: 'MissingParamError',
            message: 'school_id missing',
        });
    };

    if (isNaN(Number(school_id))) {
        return res.status(400).json({
            status: 'InvalidParamError',
            message: 'school_id must be number',
        });
    }

    if (!news_content) {
        return res.status(400).json({
            status: 'MissingParamError',
            message: 'news_content missing',
        });
    }

    next();
}

const check_update_school_news = async (req, res, next) => {
    let news_id = req.params.news_id;
    if (!news_id) {
        return res.status(400).json({
            status: 'MissingParamError',
            message: 'news_id missing',
        });
    }

    let {school_id, news_content} = req.body;
    if (!school_id) {
        return res.status(400).json({
            status: 'MissingParamError',
            message: 'school_id missing',
        });
    }

    if (isNaN(Number(school_id))) {
        return res.status(400).json({
            status: 'InvalidParamError',
            message: 'school_id must be number',
        });
    }

    if (!news_content) {
        return res.status(400).json({
            status: 'MissingParamError',
            message: 'news_content missing',
        });
    }

    next();
}

const check_delete_school_news = async (req, res, next) => {
    let news_id = req.params.news_id;
    if (!news_id) {
        return res.status(400).json({
            status: 'MissingParamError',
            message: 'news_id missing',
        });
    }

    next();
}

exports.check_token = check_token;
exports.check_enroll_school = check_enroll_school;
exports.check_write_school_news = check_write_school_news;
exports.check_update_school_news = check_update_school_news;
exports.check_delete_school_news = check_delete_school_news;