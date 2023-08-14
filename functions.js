const jwt = require('jsonwebtoken');

const publish_token = (role) => {
    let user_info = {
        role: role,
    };
    let secret_key = process.env.JWT_SECRET_KEY;

    let token = jwt.sign(user_info, secret_key, {expiresIn: '1h'});
    return token;
}

const get_token = (headers) => {
    return headers.split('Bearer ')[1];
}

const get_role_from_token = (token) => {
    let secret_key = process.env.JWT_SECRET_KEY;
    try {
        let decode_result = jwt.verify(token, secret_key);
        return decode_result;
    }
    catch (error) {
        return error.message;
    }
}

exports.publish_token = publish_token;
exports.get_token       = get_token;
exports.get_role_from_token = get_role_from_token;