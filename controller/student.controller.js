const fn = require('../functions');

const publish_token = async (req, res) => {
    let token = fn.publish_token('student');
    return res.status(200).json({
        access_token:token,
    });
}

const return_hello = async (req, res) => {
    return res.status(200).json({
        message: "Hello!"
    })
}

exports.publish_token = publish_token;
exports.return_hello  = return_hello;