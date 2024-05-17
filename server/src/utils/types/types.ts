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
    posts : ID[],
    friends : ID[],
    requests : ID[]
}

export interface IComment {
    id : ID,
    replyTo : ID,
    from : ID,
    message : string,
    date: string
}

export interface IPost {
    id : ID,
    from: ID ,
    message: string,
    date: string,
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