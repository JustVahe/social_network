export type ID = string | number;

export interface IUser {
    id: ID,
    name: string,
    surname: string,
    username: string,
    email: string,
    avatar: string,
    headerImg: string,
    status: string,
    password: string,
    description: string,
    posts?: IPost[],
    files?: IPhoto[],
    friends?: IFriend[],
    requests?: IRequest[],
    createdAt?: string,
    updatedAt?: string
}

export interface IReply {
    id: ID,
    user_id: ID,
    comment_id: ID,
    message: string,
    user: IUser,
    comment: IComment,
    createdAt?: string,
    updatedAt?: string
}

export interface IRoom {
    id: ID,
    type: "user" | "chat",
    name: string,
    avatar: string,
    user_a: IUser,
    user_b: IUser,
    messages?: IMessage[],
    createdAt?: string,
    updatedAt?: string
}

export interface IConnection {
    id: ID,
    chat_id: ID,
    user_id: ID,
    chat: IChat,
    user: IUser,
    createdAt?: string,
    updatedAt?: string
}

export interface IFriend {
    id: ID,
    user_a_id: ID,
    user_b_id: ID,
    user_a: IUser,
    user_b: IUser,
    status: string,
    createdAt?: string,
    updatedAt?: string
}

export interface IComment {
    id: ID,
    user_id: ID,
    post_id: ID,
    message: string,
    user: IUser,
    post: IPost,
    replies?: IReply[],
    createdAt?: string,
    updatedAt?: string
}

export interface IReaction {
    id: ID,
    type: "like" | "dislike",
    post_id: ID,
    user_id: ID,
    createdAt?: string,
    updatedAt?: string
}

export interface IPost {
    id: ID,
    message: string,
    files?: IPhoto[],
    reactions?: IReaction[] | undefined,
    comments?: IComment[],
    user_id: ID,
    createdAt?: string,
    updatedAt?: string
}

export interface IPhoto {
    id: ID,
    user_id: ID,
    post_id: ID,
    type: string,
    path: string,
    createdAt?: string,
    updatedAt?: string
}

export interface IMessage {
    id: ID,
    from: IUser,
    from_id: ID
    message: string,
    date: string,
    createdAt?: string,
    updatedAt?: string
}

export interface IChat {
    id: ID,
    name: string,
    avatar: string,
    description: string,
    connections?: IConnection[],
    createdAt?: string,
    updatedAt?: string,
    messages?: IMessage[]
}

export interface ITokenBody {
    accessToken: string | undefined,
    refreshToken: string | undefined
}

export interface IRequest {
    id: ID,
    from_id: ID,
    to_id: ID,
    status: "approved" | "pending" | "rejected",
    createdAt?: string,
    updatedAt?: string,
    from: IUser,
    to: IUser
}
