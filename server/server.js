const express = require("express");
const app = express();

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,           
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.get("/api/users", (req,res) => {
    res.json([
        {
            "id" : "hgbfdcxvbzsf",
            "name" : "Janis",
            "surname" : "Joplin",
            "e-mail" : "jjoplin@gmail.com",
            "username" : "itsjoplin",
            "avatar" : "/demo/janisJoplin/avatar.jpg",    
            "headerImg" : "/demo/janisJoplin/header_img.jpg",
            "status" : "online",
            "password" : "test", 
            "posts" : [
                "itsjoplin-post1"
            ],
            "isLoggedIn" : "false",
            "friends" : [
                "gghnhfghhnr",
                "oiujkjhmg"
            ],"requests" : [
                "bfvbfgdvbbfcfdv"
            ]
        },
        {
            "id" : "gghnhfghhnr",
            "name" : "Amy",
            "surname" : "Winehouse",
            "e-mail" : "amymusic@gmail.com",
            "username" : "winehouse",
            "avatar" : "/demo/amyWinehouse/avatar.webp",
            "headerImg" : "/demo/amyWinehouse/header_img.jpg",
            "status" : "online",
            "password" : "gfgbgbhgfg=", 
            "posts" : [],
            "isLoggedIn" : "false",
            "friends" : [
                "hgbfdcxvbzsf",
                "oiujkjhmg",
                "bfvbfgdvbbfcfdv"
            ],
            "requests" : []
        },
        {
            "id" : "oiujkjhmg",
            "name" : "Jimi",
            "surname" : "Hendricks",
            "e-mail" : "jimiguitartutor@gmail.com",
            "username" : "jimishere",
            "avatar" : "/demo/jimiHendrix/avatar.jpg",
            "headerImg" : "/demo/jimiHendrix/header_img.webp",
            "status" : "offline",
            "password" : "hfgdfgdfsbgffh=", 
            "posts" : [],
            "isLoggedIn" : "false",
            "friends" : [
                "hgbfdcxvbzsf",
                "gghnhfghhnr",
                "bfvbfgdvbbfcfdv"
            ],
            "requests" : []
        },
        {
            "id" : "bfvbfgdvbbfcfdv",
            "name" : "Ray",
            "surname" : "Charles",
            "e-mail" : "proffessorCharles@gmail.com",
            "username" : "raycharles",
            "avatar" : "/demo/rayCharles/avatar.webp",
            "headerImg" : "/demo/rayCharles/header_img.jpg",
            "status" : "online",
            "password" : "cGllY2VvZm15aGVhcnQ=", 
            "posts" : [],
            "isLoggedIn" : "false",
            "friends" : [
                "hgbfdcxvbzsf",
                "gghnhfghhnr",
                "oiujkjhmg"
            ],
            "requests" : []
        }
    ])
})

app.get("/api/posts", (req,res) => {
    res.json([
        {
            "id" : "itsjoplin-post1",
            "userID": "hgbfdcxvbzsf" ,
            "message": "The night in Woodstock was amazing!",
            "date": "1714245536551",
            "files" : [
                "/demo/janisJoplin/post-images/post1.jpg"
            ],
            "likes" : "357000",
            "watches": "24567800",
            "dislikes" : "50"
        }
    ])
})

app.get("/api/comments", (req,res) => {
    res.json([
        {
            "id" : "uytggmhgfhgffgbgf",
            "postId" : "itsjoplin-post1",
            "replyTo" : "itsjoplin-post1",
            "from" : "bfvbfgdvbbfcfdv",
            "message" : "Let's go!!"
        },{
            "id" : "poljnmhvhhj",
            "postId" : "itsjoplin-post1",
            "replyTo" : "itsjoplin-post1",
            "from" : "oiujkjhmg",
            "message" : "Janis i love you. Please let's date."
        },{
            "id" : "aasxadsxxsdf",
            "postId" : "itsjoplin-post1",
            "replyTo" : "itsjoplin-post1",
            "from" : "gghnhfghhnr",
            "message" : "It's was nice to meet you!"
        },{
            "id" : "kogjfnbrinbib",
            "postId" : "itsjoplin-post1",
            "replyTo" : "aasxadsxxsdf",
            "from" : "hgbfdcxvbzsf",
            "message" : "Same!"
        }
    ])
})

app.get("/api/photos", (req,res) => {
    res.json([
        {
            "id" : "rdgfbfdg",
            "userId" : "hgbfdcxvbzsf",
            "src" : "/demo/janisJoplin/userPhotoes/janis1.webp"
        },{
            "id" : "fvffvbfdfvbfdv",
            "userId" : "hgbfdcxvbzsf",
            "src" : "/demo/janisJoplin/userPhotoes/janis2.jpg"
        },{
            "id" : "kyukukjhgvbf",
            "userId" : "hgbfdcxvbzsf",
            "src" : "/demo/janisJoplin/userPhotoes/janis3.jpg"
        },{
            "id" : "fvffvbfdfvbfdv",
            "userId" : "hgbfdcxvbzsf",
            "src" : "/demo/janisJoplin/userPhotoes/janis4.webp"
        },{
            "id" : "tewghthbffd",
            "userId" : "hgbfdcxvbzsf",
            "src" : "/demo/janisJoplin/userPhotoes/janis5.jpg"
        },{
            "id" : "vzcxbvcv",
            "userId" : "hgbfdcxvbzsf",
            "src" : "/demo/janisJoplin/userPhotoes/janis6.avif"
        }
    ])
})

app.listen(8000, () => console.log("server started..."));