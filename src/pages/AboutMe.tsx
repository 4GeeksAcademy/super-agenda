import { useNavigate } from "react-router"

export const AboutMe = () => {

    const navigate = useNavigate()

    return (
        <div className="p-2 min-h-250">
            <div className="mb-3">
                <button onClick={() => navigate(-1)} className="pr-6 pl-3 py-2 shadow-md shadow-slate-400  rounded-full hover:cursor-pointer bg-slate-400 text-slate-50 hover:bg-slate-300 active:bg-slate-500"><i className="fa-solid fa-angle-left pr-1"></i>Return</button>
            </div>
            <div className="relative group p-3 flex flex-col  gap-4">

                <div className="z-3  p-2 bg-slate-900 rounded-4xl  flex justify-center">
                    <div className="p-2 w-130  flex flex-col gap-4 text-center">
                        <div className=" flex justify-center">
                            <img className="w-1/2 border-4 border-slate-800 rounded-full " src="https://res.cloudinary.com/dra2cr3uw/image/upload/v1770591241/Foto_Facu_Linkedin_mbczsv.jpg" />
                        </div>
                        <div className="text-slate-50 flex flex-col gap-3">
                            <h2 className="text-5xl font-semibold">Facundo Bravo Scrollini</h2>
                            <h4 className="text-lg">FullStack Developer</h4>
                        </div>
                        <div className="p-2">
                            <div>

                                <a target="_blank" href="https://es.linkedin.com/in/facundoscrollini">
                                    <button className="px-4 py-2 bg-blue-500 hover:bg-blue-400 transform hover:scale-115 transition hover:duration-300 
                           active:bg-blue-500 text-blue-100 border-3 border-blue-500 
                           hover:border-blue-100 hover:cursor-pointer  rounded-3xl ">
                                        <i className="fa-brands fa-linkedin"></i>
                                        Linkedin</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute w-140 px-10 min-h-100 z-1 bg-slate-500 border-2 shadow-2xl text-slate-50  left-1/2 
                -translate-x-1/2 flex flex-col 
                justify-end group-hover:translate-y-110
                transition-transform
                duration-1200
                rounded-3xl
                ">
                    <p className="text-center">
                        With experience in JavaScript, Python, and SQL, I focus on building functional, well-structured web applications.
                        <br />I’m known for a collaborative, responsible, and approachable way of working,
                        combining strong technical skills with a human-centered mindset.
                        <br/>
                        <br/> Let's talk!
                    </p>
                    <div className="flex justify-center pb-4  pt-6">
                        <div className="p-3 flex gap-3">
                            <div>
                                <a target="_blank" href="mailto:facuscrollinic@gmail.com">
                                    <button className="px-4 py-2 bg-red-500 hover:bg-red-400 transform hover:scale-115 transition hover:duration-300 
                           active:bg-red-500 text-red-100 border-3 border-red-500 
                           hover:border-red-100 hover:cursor-pointer  rounded-3xl ">
                                        <i className="fa-solid fa-at"></i>
                                        Email
                                    </button>
                                </a>
                            </div>
                            <div> <a target="_blank" href="https://wa.me/34692916064">
                                <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 transform hover:scale-115 transition hover:duration-300 
                           active:bg-emerald-500 text-emerald-100 border-3 border-emerald-500 
                           hover:border-emerald-100 hover:cursor-pointer  rounded-3xl ">
                                    <i className="fa-brands fa-whatsapp"></i>
                                    Whatsapp
                                </button>
                            </a></div>
                        </div>
                    </div>
                </div>
                           <div className="absolute z-2 w-140 bg-black h-10 left-1/2 -translate-x-1/2 bottom-3 translate-transformation duration-1400 group-hover:translate-y-6"></div>

            </div>
        </div>
    )
}