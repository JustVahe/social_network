export default function PostLoading() {
    return (
        <div id="loader_div" className="w-full flex flex-col gap-[15px] bg-[rgb(253,253,253)] shadow-sm shadow-zinc-300 p-[25px] rounded-md">
            <div className="flex justify-between">
                <div className="w-[30px] h-[30px] bg-zinc-600 rounded-full">
                    <div className='w-full h-full bg-zinc-400 animate-pulse rounded-full'></div>
                </div>
                <div className="w-[90%] h-[30px] bg-zinc-600 rounded-md">
                    <div className='w-full h-full bg-zinc-400 animate-pulse rounded-md'></div>
                </div>
            </div>
            <div className="w-full h-[300px] bg-zinc-600 rounded-md">
                <div className='w-full h-full bg-zinc-400 animate-pulse rounded-md'></div>
            </div>
            <div className="w-full h-[50px] bg-zinc-600 rounded-md">
                <div className='w-full h-full bg-zinc-400 animate-pulse rounded-md'></div>
            </div>
        </div>
    )
}
