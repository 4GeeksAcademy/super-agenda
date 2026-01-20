import { useState } from 'react'
import { Link } from 'react-router'
import { InteractiveButton } from '../components/InteractiveButton'



function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
     <p className="bg-red-500">Welcome to Super Agenda, the fastest agenda around the world</p>
     <Link to="/user">
     <InteractiveButton color="red" text="Let's go!"/>
     </Link>
    </>
  )
}

export default Home
