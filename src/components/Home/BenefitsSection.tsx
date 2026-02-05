export const BenefitsSection = () => {
    return (
        <div className="px-2 py-25 bg-orange-300  mx-auto mx-auto w-full sm:w-[600px] md:w-[700px] lg:w-[800px] xl:w-[900px] 2xl:w-[1000px]  my-5">
            <div className="bg-emerald-300 p-2">
                <div className="bg-red-300 text-center">
                    <h2 className="text-slate-800 text-3xl md:text-4xl 2xl:text-5xl">Why use Super Agenda?</h2>
                </div>
                <div className="grid grid-cols-12 gap-5 bg-red-300 mt-3">

                    <div className="col-span-6 md:col-span-4  justify-center mt-3">
                        <div className="bg-slate-100 flex flex-col py-3">

                            <div className="w-50 lg:w-60 grid grid-cols-12 gap-2rounded-xl">
                                <div className="col-span-12 lg:col-span-4  text-center">
                                    <div className="p-3 inline-block bg-slate-300 rounded-2xl">
                                        <i className="py-2 text-4xl text-slate-600 fa-solid fa-user"></i>
                                    </div>
                                </div>
                                <div className="col-span-12 lg:col-span-8 p-1  flex items-center justify-center">
                                    <div className="mb-2 text-xl lg:text-2xl text-center" >Complete Contact Info</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-12">
                                <div className="lg:col-span-4"></div>
                                <div className="col-span-12 lg:col-span-8">
                                    <div className="text-[0.8rem] lg:text-sm text-center" >Every contact includes a name, address, phone, and email.</div>

                                </div>
                            </div>


                        </div>


                    </div>
                    <div className="col-span-6 md:col-span-4 flex justify-center mt-3">
                        <div className="bg-slate-100 flex flex-col py-3">

                            <div className="w-50 lg:w-60 grid grid-cols-12 gap-2rounded-xl">
                                <div className="col-span-12 lg:col-span-4  text-center">
                                    <div className="p-3 inline-block bg-slate-300 rounded-2xl">
                                        <i className="py-2 text-4xl text-slate-600 fa-solid fa-user"></i>
                                    </div>
                                </div>
                                <div className="col-span-12 lg:col-span-8 p-1  flex items-center justify-center">
                                    <div className="mb-2 text-xl lg:text-2xl  text-center" >Instant Editing</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-12">
                                <div className="lg:col-span-4"></div>
                                <div className="col-span-12 lg:col-span-8 flex items-center">
                                    
                                    <div className="text-[0.8rem] lg:text-sm text-center" > Update or fix any contact in seconds.</div>

                                </div>
                            </div>


                        </div>

                    </div>
                    <div className="col-span-12 md:col-span-4 flex justify-center mt-3">

                        <div className="bg-slate-100 flex flex-col py-3">

                            <div className="w-50 lg:w-60 grid grid-cols-12 gap-2rounded-xl">
                                <div className="col-span-12 lg:col-span-4  text-center">
                                    <div className="p-3 inline-block bg-slate-300 rounded-2xl">
                                        <i className="py-2 text-4xl text-slate-600 fa-solid fa-user"></i>
                                    </div>
                                </div>
                                <div className="col-span-12 lg:col-span-8 p-1  flex items-center justify-center">
                                    <div className="mb-2 text-xl lg:text-2xl text-center" >Full Control</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-12">
                                <div className="lg:col-span-4"></div>
                                <div className="col-span-12 lg:col-span-8">
                                    <div className="text-[0.8rem] lg:text-sm text-center  flex items-center" >Add or remove contacts anytime, keeping your address book clean and organized.</div>

                                </div>
                            </div>


                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}