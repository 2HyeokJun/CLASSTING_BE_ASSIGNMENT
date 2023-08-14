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
    let now = new Date().getTime() / 1000;

    if (access_token_info.role !== 'student') {
        return res.status(401).json({
            status: 'Unauthorized',
            message: 'token has wrong role',
        });
    }
    if (access_token_info.exp < now) {
        return res.status(401).json({
            status: 'Unauthorized',
            message: 'token is expired',
        });
    }
    
    next();
}

exports.check_token = check_token;