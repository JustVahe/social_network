export type ID = string | number;

export interface IUser {
    name?: string,
    surname: string,
    email: string,
    imageSrc: string,
    status: string
}
export interface IComment {
    id : ID,
    message : string,
    from : ID,
    replyedTo : string,
    replies? : IComment[]
}

export interface IPost {
    id : string,
    user: IUser ,
    message: string
    date: number,
    files : string[]
    comments : IComment[]
    likes : number,
    watches: number,
    dislikes : number,
  }