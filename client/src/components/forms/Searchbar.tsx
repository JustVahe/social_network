export default function Searchbar({searchToggle} : {searchToggle : boolean}) {
  return (
    <div className={"overflow-hidden -z-50 fixed w-full xl:w-[300px] left-0 xl:left-[900px] 2xl:left-[1100px] transition-all " + (searchToggle ? "top-[69px]" : "top-[-45px]")}>
        <div className="w-full bg-sky-600 p-1.5">
            <input type="text" placeholder="Search..." className="bg-transparent w-full outline-none text-white placeholder:text-white" />
        </div>
    </div>
    
  )
}
