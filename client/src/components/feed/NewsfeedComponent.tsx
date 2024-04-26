import Post from "./post/Post";
import admin from "../../assets/admin.jpg"
import userPost from "../../assets/user-post.jpg"
import { IPost } from "../../types";

const postData : IPost = {
  id : "kovnOHUBC",
  user: {
    imageSrc : admin,
    status : "online",
    name: "Bucky",
    surname: "Barnes",
    email: "wintersolder@gmail.com",
  },
  message: "World's most beautiful car in Curabitur #test drive booking ! the most beatuiful car available in america and the saudia arabia, you can book your test drive by our official website",
  date: Date.now(),
  files : [
    userPost
  ],
  comments : [
    {
      id : "jkjdjd",
      from : "James Folkson",
      message : "we are working for the dance and sing songs. this car is very awesome for the youngster. please vote this car and like our post",
      replyedTo : "kovnOHUBC",
      replies : [
        {
          id : "gdfdgejoljn,",
          from : "Ievan Toivonen",
          message : "Kill Yourself!",
          replyedTo : "jkjdjd"
        },
      ],
    },
    
  ],
  likes : 1200,
  watches: 14500,
  dislikes : 400,
}

export default function NewsfeedComponent() {
  return (
    <div className="max-w-[600px] flex flex-col gap-[20px]">
        <Post postData={postData}/>
    </div>
  )
}
