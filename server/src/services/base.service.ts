interface BaseParams {
    status?: boolean,
    statusCode?: number,
    data?: Object | null | string,
}

export class BaseService {

    response({
        status = true,
        statusCode = 200,
        data = {}
    }: BaseParams): BaseParams {
        return { status, statusCode, data };
    }

    serverErrorResponse(error: Error): BaseParams {
        return {
            status: false,
            statusCode: 500,
            data: {error, message: "Internal server error: " + error.message}
        };
    }

}