export const BenefitsSection = () => {
    return (
        <div className="px-2 py-25 bg-orange-300  mx-auto mx-auto w-full sm:w-[600px] md:w-[700px] lg:w-[800px] xl:w-[900px] 2xl:w-[1000px]  my-5">
            <div className="bg-emerald-300 p-2">
                <div className="bg-red-300 text-center">
                    <h2 className="text-slate-800 text-3xl md:text-4xl 2xl:text-5xl">Why use Super Agenda?</h2>
                </div>
                <div className="grid grid-cols-12 gap-2 bg-red-300 mt-3">
                    <div className="col-span-4">
                        <div className="grid grid-cols-12">
                            <div className="col-span-4 bg-blue-300">s</div>
                            <div className="col-span-8 bg-violet-300 p-1">
                                <div className="mb-2 bg-orange-300" >d</div>
                                <div  className="bg-orange-300" >f</div>
                            </div>

                        </div>
                    </div>
                    <div className="col-span-4">Carta 2</div>
                    <div className="col-span-4">Carta 3</div>
                </div>
            </div>
        </div>
    )
}