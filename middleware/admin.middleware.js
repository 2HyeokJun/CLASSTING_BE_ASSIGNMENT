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

const check_enroll_school = async (req, res, next) => {
    let {school_region, school_name} = req.body;
    if (!school_region) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'school_region required',
        })
    };

    if (!school_name) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'school_name required',
        })
    }
}

exports.check_token = check_token;
exports.check_enroll_school = check_enroll_school;