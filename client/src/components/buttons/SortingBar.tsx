export default function SortingBar() {
  return (
    <div className="w-full p-2.5 flex justify-between border border-sky-600/35 shadow-sm shadow-zinc-300 rounded-md bg-[#fdfdfd]">
        <p className="text-sky-600">Sort</p>
        <div className="flex gap-2.5 ">
            <p className="bg-zink-600">Newest</p>
            <p className="bg-zink-600">Oldest</p>
        </div>
    </div>
  )
}
