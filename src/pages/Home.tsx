import { useState } from 'react'



function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
     <p className="bg-red-500">Soy home</p>
    </>
  )
}

export default Home
