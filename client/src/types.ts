export type ID = string | number;

export interface IUser {
    id : ID,
    name : string,
    surname : string,
    username : string,
    email: string,
    avatar : string,
    headerImg : string,
    status : string,
    password : string, 
    description: string,
    posts : IPost[],
    friends : IFriend[],
    requests : []
}

export interface IReply {
    id : ID,
    user_id : ID,
    comment_id : ID,
    message : string,
    user: IUser,
    comment: IComment,
}

export interface IFriend {
    id: ID,
    user_a_id: ID,
    user_b_id: ID,
    user_a: IUser,
    user_b: IUser,
    status: string
}

export interface IComment {
    id : ID,
    user_id : ID,
    post_id : ID,
    message : string,
    user: IUser,
    post: IPost,
    replies: IReply[]
}

export interface IPost {
    id : ID,
    from: ID ,
    message: string,
    files : IPhoto[],
    likes : number,
    watches: number,
    dislikes : number
    user: IUser,
    comments: IComment[]
}

export interface IPhoto {
    id : ID,
    userId : ID,
    postId: ID,
    type: string,
    path : string
}

export interface IMessage{
    id: ID,
    from: ID,
    to: ID,
    message: string,
    date: string
}

export interface ITokenBody {
    accessToken: string | undefined,
    refreshToken: string | undefined
}