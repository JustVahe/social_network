import { Request } from "express"
import { JwtPayload } from "jsonwebtoken"

export interface ILoginParameters {
    email: string,
    password: string
}

export interface IRegisterParameters {
    name: string,
    surname: string,
    email: string,
    password: string
}

export interface IAuthorizationParameters {
    accessToken: string,
    refreshToken: string
}

export interface IJWTPayload extends JwtPayload {
    user_id : string
}

export interface IJWTRequest<T> extends Request {
    user_id: T
}
