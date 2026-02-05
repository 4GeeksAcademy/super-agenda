import { Link } from "react-router"

export const BannerSection = () => {
    return (
        <div className="relative bg-slate-700">
            <div className="text-slate-50 text-center my-25 mx-auto sm:w-[430px] md:w-[540px] lg:w-[570px] xl:w-[600px] 2xl:w-[900px] ">
                <div className=" flex flex-col justify-between h-[30vh]">
                    <div><h1 className="text-4xl sm:text-4xl md:text-5xl 2xl:text-6xl font-bold">All Your Contacts in One Place</h1></div>
                    <div><p className="px-13 text-sm sm:text-md md:text-lg 2xl:text-xl">Never lose touch! Each contact has a photo, name, address, phone, and email. Add, edit, or delete effortlessly and keep your contacts perfectly organized</p></div>
                    <div>
                        <Link to="/agendas">
                        <button className="text-slate-800 bg-slate-50 px-5 py-3 rounded-full hover:bg-white active:bg-slate-100 hover:cursor-pointer transform hover:scale-120  transition hover:duration-500">
                            GET STARTED
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-2 inset-x-0  flex justify-center">
                <a href="#benefits-section"className="mb-3 border-2 border-slate-50 text-slate-50 rounded-4xl w-10 h-10 flex items-center
                 justify-center hover:cursor-pointer transform hover:translate-y-3 transition hover:duration-500 
                 animate-pulse
                 ">
                  <i className="text-xl fa-solid fa-angle-down"></i>
                </a>
            </div>
        </div>
    )
}