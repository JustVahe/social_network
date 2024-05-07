interface IUser {
    id: string,
    name: string,
    surname: string,
    username: string,
    password: string,
    email: string,
    avatar: string,
    headerImg: string,
    status: string,
    friends: string[],
    requests: string[],
    accountCreationDate: number,
    birthDate: number,
    gender: string,
    title: string
}

interface IPost {
    id: string,
    userId: string,
    content: string,
    files: string[],
    likes: number,
    views: number,
    dislikes: number,
}

interface IComment {
    id: string,
}






