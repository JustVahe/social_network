interface BaseParams {
    status?: boolean,
    statusCode?: number,
    data?: Object | null,
    message?: string
}

export class BaseService {

    response({
        status = true,
        statusCode = 200,
        data = {},
        message = ""
    } : BaseParams) : BaseParams {
        return { status, statusCode, data, message };
    }

    serverErrorResponse(error : Error) : BaseParams {
        return { 
            status : false, 
            statusCode : 500, 
            data : error, 
            message : "Internal server error: " + error.message 
        };
    }

}