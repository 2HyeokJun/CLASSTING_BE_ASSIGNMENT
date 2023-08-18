const jwt = require('jsonwebtoken');

const publish_token = (role, student_id = 0) => {
    let user_info = {
        role: role,
    };
    if (role === 'student') {
        user_info.student_id = student_id;
    }

    let secret_key = process.env.JWT_SECRET_KEY;

    let token = jwt.sign(user_info, secret_key, {expiresIn: '1d'});
    return token;
}

const get_token = (headers) => {
    if (headers.split('Bearer ').length > 1) {
        return headers.split('Bearer ')[1];
    }
    else {
        return null;
    }
    
}

const get_token_info = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
        return error;
    }
    
}

exports.publish_token = publish_token;
exports.get_token = get_token;
exports.get_token_info = get_token_info;