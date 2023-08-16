const MissingParamError = require('../error/missing_param_error');
const InternalServerError = require('../error/interval_server_error');
const UnauthorizedError = require('../error/unauthorized_error');
const InvalidParamError = require('../error/invalid_param_error');

module.exports = class HttpResponse {
    static Ok (data) {
        return {
            statusCode: 200,
            body: data,
        }
    }

    static BadRequestError (paramName) {
        return {
            statusCode: 400,
            body: new MissingParamError(paramName)
        };
    }

    static InvalidParamError (paramName) {
        return {
            statusCode: 401,
            body: new InvalidParamError(paramName),
        };
    }

    static UnauthorizedError () {
        return {
            statusCode: 401,
            body: new UnauthorizedError(),
        }
    }

    static InternalServerError () {
        return {
            statusCode: 500,
            body: new InternalServerError(),
        
        };
    }
}