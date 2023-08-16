const check_request_body = async (error, req, res, next) => {
    if (error.name === 'SyntaxError') {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Wrong JSON format'
        })
    }
    next();
};

exports.check_request_body = check_request_body;