export class BaseService {
    response({ status = true, statusCode = 200, data = {} }) {
        return { status, statusCode, data };
    }
    serverErrorResponse(error) {
        return {
            status: false,
            statusCode: 500,
            data: { error, message: "Internal server error: " + error.message }
        };
    }
}
