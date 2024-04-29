export type ID = string | number;

export interface IUser {
    id : ID,
    name : string,
    surname : string,
    username : string,
    avatar : string,
    status : string,
    password : string, 
    posts : ID[],
    isLoggedIn : boolean,
    friends : ID[]
}

export interface IComment {
    id : ID,
    postId : ID,
    replyTo : ID,
    from : ID,
    message : string
}

export interface IPost {
    id : ID,
    userID: ID ,
    message: string,
    date: number,
    files : string[],
    likes : number,
    watches: number,
    dislikes : number
}

export interface IPhoto {
    id : ID,
    userId : ID,
    src : string
}