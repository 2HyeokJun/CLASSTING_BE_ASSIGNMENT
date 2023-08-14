const fn = require('../functions');

const check_token = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'there is no access token',
        });
    }
    let access_token =  fn.get_token(req.headers.authorization);
    let access_token_info = fn.get_role_from_token(access_token);

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

    if (access_token_info.role !== 'admin') {
        return res.status(401).json({
            status: 'Unauthorized',
            message: 'token has wrong role',
        });
    }
    
    
    next();
}

exports.check_token = check_token;