import { TfiApple, TfiMap, TfiMobile } from "react-icons/tfi";
import { FaAndroid, FaFacebookSquare, FaGooglePlus, FaInstagram, FaPinterest, FaTwitterSquare, FaWindows } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className='w-full bg-white relative mt-[40px]before:w-full before:h-[5px] before:block before:bg-gradient-to-r before:from-transparent before:via-sky-600 before:to-transparent before:top-0'>
        <div className="container sm:grid sm:grid-cols-4 lg:flex lg:justify-between lg:gap-[30px] pt-[70px] pb-[100px] mb-0 ">
            <div className="p-[30px] sm:w-full mb-[50px] sm:col-span-4 sm:p-0 lg:mb-0 lg:w-[300px] flex flex-col gap-[30px]">
                <img className="w-[100px]" src="/logo.webp" alt="logo"/>
                <p className="text-zinc-500 text-sm-13">
                    The trio took this simple idea and built it into the world’s leading carpooling platform.
                </p>
                <div className="flex items-center gap-[10px] text-zinc-500">
                    <TfiMap />
                    <p className="text-sm-13">33 new montgomery st.750 san francisco, CA USA 94105.</p>
                </div>
                <div className="flex items-center gap-[10px] text-zinc-500">
                    <TfiMobile />
                    <p className="text-sm-13">33 new montgomery st.750 san francisco, CA USA 94105.</p>
                </div>
            </div>
            <div className="w-[175px] col-span-4 p-[30px] sm:p-0 sm:col-span-1">
                <h1 className="font-bold text-md text-zinc-700 after:w-[35px] after:h-[2px] after:bg-sky-600 after:block">Follow</h1>
                <ul className="mt-[40px]">
                    <li className="text-zinc-600 mt-[10px]">
                        <div className="inline-flex gap-[10px] ">
                            <FaFacebookSquare />
                            <p className="text-sm-13">
                                Facebook
                            </p>
                        </div>
                    </li>
                    <li className="text-zinc-600 mt-[10px]">
                        <div className="flex gap-[10px] ">
                            <FaTwitterSquare />
                            <p className="text-sm-13">
                                Twitter
                            </p>
                        </div>
                    </li>
                    <li className="text-zinc-600 mt-[10px]">
                        <div className="flex gap-[10px] ">
                            <FaInstagram />
                            <p className="text-sm-13">
                                Instagram
                            </p>
                        </div>
                    </li>
                    <li className="text-zinc-600 mt-[10px]">
                        <div className="flex gap-[10px] ">
                            <FaGooglePlus />
                            <p className="text-sm-13">
                                Google Plus
                            </p>
                        </div>
                    </li>
                    <li className="text-zinc-600 mt-[10px]">
                        <div className="flex gap-[10px] ">
                            <FaPinterest />
                            <p className="text-sm-13">
                                Pinterest
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="w-[175px] col-span-4 p-[30px] sm:p-0 sm:col-span-1">
                <h1 className="font-bold text-md text-zinc-700 after:w-[35px] after:h-[2px] after:bg-sky-600 after:block">Navigate</h1>
                <ul className="mt-[40px]">
                    <li className="text-zinc-600 mt-[10px] text-sm-13">
                        About Us
                    </li>
                    <li className="text-zinc-600 mt-[10px] text-sm-13">
                        Contact Us
                    </li>
                    <li className="text-zinc-600 mt-[10px] text-sm-13">
                        Terms & Conditions
                    </li>
                    <li className="text-zinc-600 mt-[10px] text-sm-13">
                        RSS Syndication
                    </li>
                    <li className="text-zinc-600 mt-[10px] text-sm-13">
                        Sitemap
                    </li>
                </ul>
            </div>
            <div className="w-[175px] col-span-4 p-[30px] sm:p-0 sm:col-span-1">
                <h1 className="font-bold text-md text-zinc-700 after:w-[35px] after:h-[2px] after:bg-sky-600 after:block">Useful Links</h1>
                <ul className="mt-[40px]">
                    <li className="text-zinc-600 mt-[10px] text-sm-13">
                        Leasing
                    </li>
                    <li className="text-zinc-600 mt-[10px] text-sm-13">
                        Submit Route
                    </li>
                    <li className="text-zinc-600 mt-[10px] text-sm-13">
                        How does it work?
                    </li>
                    <li className="text-zinc-600 mt-[10px] text-sm-13">
                        Agent Listings
                    </li>
                    <li className="text-zinc-600 mt-[10px] text-sm-13">
                        View all
                    </li>
                </ul>
            </div>
            <div className="w-[175px] col-span-4 p-[30px] sm:p-0 sm:col-span-1">
                <h1 className="font-bold text-md text-zinc-700 after:w-[35px] after:h-[2px] after:bg-sky-600 after:block">Download App</h1>
                <div className="mt-[40px] flex flex-col gap-[10px]">
                    <button className="w-full rounded-md border flex justify-center items-center gap-[10px] border-zinc-600 p-[10px] transition-all hover:bg-sky-600 hover:text-white">
                        <FaAndroid /> <p>Android</p>
                    </button>
                    <button className="w-full rounded-md border flex justify-center items-center gap-[10px] border-zinc-600 p-[10px] transition-all hover:bg-sky-600 hover:text-white">
                        <TfiApple /> <p>IOS</p>
                    </button>
                    <button className="w-full rounded-md border flex justify-center items-center gap-[10px] border-zinc-600 p-[10px] transition-all hover:bg-sky-600 hover:text-white">
                        <FaWindows /> <p>Windows</p>
                    </button>
                </div>
            </div>
        </div>
        <div className="w-full bg-zinc-50 p-[20px]">
            <div className="container my-0 flex justify-between">
                <p className="text-sm-12 text-zinc-500">© Winku 2018. All rights reserved.</p>
                <img src="/credit-cards.webp" alt="Visa, Mastercard"  />
            </div>
        </div>
    </footer>
  )
}
