import { Card } from "./Card"

export const BenefitsSection = () => {
    return (
        <div className="px-2 py-25  mx-auto  w-full sm:w-[600px] md:w-[700px] lg:w-[800px] xl:w-[900px] 2xl:w-[1000px]  ">
            <div className="p-2">
                <div id="benefits-section" className="text-center border-b-1 sm:mx-20 pb-10">
                    <h2 className="text-slate-800 text-3xl md:text-4xl 2xl:text-5xl font-semibold">Why use Super Agenda?</h2>
                </div>
                <div className=" grid grid-cols-12 gap-5 lg:gap-10 0 mt-15">
                    <div className="col-span-12 sm:col-span-6 md:col-span-4  flex justify-center mt-3">
                        <Card place={1} title="Complete Contact Info" description="Every contact includes a photo, name, address, phone, and email." />
                    </div>

                    <div className=" col-span-12 sm:col-span-6 md:col-span-4 flex justify-center mt-3">
                        <Card place={2} title="Instant Editing" description="Update or fix any contact in seconds." />
                    </div>
                    <div className=" col-span-12 md:col-span-4 flex justify-center  mt-3">
                            <Card place={3} title="Full Control" description="Add or remove contacts anytime, keeping your address book clean and organized." />
                    </div>
                </div>
            </div>
        </div >
    )
}