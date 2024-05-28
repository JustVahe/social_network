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
    friends : [],
    requests : []
}

export interface IComment {
    id : ID,
    replyTo : ID,
    from : ID,
    message : string,
}

export interface IPost {
    id : ID,
    from: ID ,
    message: string,
    files : ID[],
    likes : number,
    watches: number,
    dislikes : number
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