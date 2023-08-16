const fn = require('../functions');

const check_token = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'there is no access token',
        });
    }
    let access_token =  fn.get_token(req.headers.authorization);
    let access_token_info = fn.get_token_info(access_token);

    if (access_token_info === 'jwt expired') {
        return res.status(401).json({
            status: 'Unauthorized',
            message: 'token is expired',
        });
    }
    
    if (access_token_info === 'invalid token') {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'invalid token',
        });
    }

    if (access_token_info.role !== 'student') {
        return res.status(401).json({
            status: 'Unauthorized',
            message: 'token has wrong role',
        });
    }

    req.student_id = access_token_info.student_id;

    next();
}

exports.check_token = check_token;