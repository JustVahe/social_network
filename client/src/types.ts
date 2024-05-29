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
    files : ID[],
    likes : number,
    watches: number,
    dislikes : number
    user: IUser,
    comments: IComment[]
}

export interface IPhoto {
    id : ID,
    userId : ID,
    src : string
}

export interface IMessage{
    id: ID,
    from: ID,
    to: ID,
    message: string,
    date: string
}