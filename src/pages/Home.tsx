import { Link } from 'react-router'
import { InteractiveButton } from '../components/InteractiveButton'



function Home() {

  return (
    <>
     <p className="bg-red-500">Welcome to Super Agenda, the fastest agenda around the world</p>
     <Link to="/agendas">
     <InteractiveButton tone="normal" color="red" text="Let's go!"/>
     </Link>
    </>
  )
}

export default Home
