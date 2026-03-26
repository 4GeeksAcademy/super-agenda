import { Link } from "react-router"

export const BannerSection = () => {
    return (
        <div className="relative bg-slate-700">
            <div className="text-slate-50 text-center mt-25 mb-7 mx-auto sm:w-[430px] md:w-[540px] lg:w-[570px] xl:w-[600px] 2xl:w-[900px] ">
                <div className=" flex flex-col justify-between gap-10 min-h-[30vh]">
                    <div>
                        <h1 className="mb-5 text-5xl sm:text-5xl md:text-6xl 2xl:text-7xl font-bold">All Your Contacts in One Place</h1>
                        <div><p className="px-13 text-sm sm:text-md md:text-lg 2xl:text-xl">Never lose touch! Each contact has a photo, name, address, phone, and email. Add, edit, or delete effortlessly and keep your contacts perfectly organized</p></div>
                    </div>
                    <div className="flex justify-center items-center h-full">
                        <Link to="/agendas">
                            <button className="text-orange-100 bg-orange-500 px-5 py-3 rounded-full hover:bg-orange-400 active:bg-orange-600 hover:cursor-pointer transform hover:scale-120  transition hover:duration-500">
                                GET STARTED
                            </button>
                        </Link>
                    </div>
                    <div className="flex justify-center">
                        <a href="#benefits-section" className="mb-3 border-2 border-slate-50 text-slate-50 rounded-full w-15 h-15 flex items-center
                 justify-center hover:cursor-pointer transform hover:translate-y-3 transition hover:duration-500 
                  animate-heartbeat">
                            <i className="text-3xl fa-solid fa-angle-down"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}