import Post from "./post/Post";

const content = {
  user: "Janis Joplin" ,
  message: "World's most beautiful car in Curabitur #test drive booking ! the most beatuiful car available in america and the saudia arabia, you can book your test drive by our official website",
  files : [
    
  ]
}

export default function NewsfeedComponent() {
  return (
    <div className="max-w-[600px] bg-[#fdfdfd] shadow-sm shadow-zinc-300 p-[25px] flex justify-between rounded-md">
        <Post content={content}/>
    </div>
  )
}
