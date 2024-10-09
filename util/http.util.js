class HttpResponse {

    constructor(success, statusCode, message, data) {
        this.success = success;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }

}

class Http {

    static Status = {
        SUCCESS: 200,
        CREATED: 201,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN_ACCESS: 403,
        INTERNAL_SERVER_ERROR: 500,
        NOT_FOUND: 404,
        SUCCESS_TRUE: true,
        SUCCESS_FALSE: false
    }

    static sendResponse(res, statusCode, success, message = '', data = {}) {
        const response = new HttpResponse(success, statusCode, message, data);
        return res.status(statusCode).json(response);
    }

}

module.exports = { HttpResponse, Http };