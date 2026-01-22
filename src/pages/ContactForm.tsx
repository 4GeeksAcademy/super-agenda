import { useEffect, useState, type ChangeEvent } from "react"
import { useLocation } from "react-router"

export const ContactForm= () =>{

    const location = useLocation()

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address:""
    })

    const handleChange = (event: ChangeEvent<HTMLInputElement>) =>{
        setFormData({...formData, [event.target.name] : event.target.value})
    }

    useEffect(()=>{
        if(location.state?.item) setFormData(location.state.item)
        location.state.item = null
    },[location])

    return(
        <>
        <form className="flex flex-col ">
        <label htmlFor="name">Name</label>
        <input onChange={handleChange} value={formData.name} id="name" name="name" className="border-1 "></input>

        <label htmlFor="phone">Phone</label>
        <input onChange={handleChange} value={formData.phone} id="phone" name="phone" className="border-1 "></input>

        <label htmlFor="email">Email</label>
        <input onChange={handleChange} value={formData.email} id="email" name="email" className="border-1 "></input>

        <label htmlFor="address">Address</label>
        <input onChange={handleChange} value={formData.address} id="address" name="address" className="border-1 "></input>
        </form>
        </>
    )
}