
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate()

  const[action, setAction] = useState();
  return (
    <>
    <div className="flex text-6xl font-bold text-center items-center content-center m-5 p-5">Welcome to the Smart Education System
    </div>
      <div className='flex text-center font-bold text-4xl items-center content-center m-4 p-6'>
        Where the future os every child is Shaped
      </div>
      <div className="flex  items-center content-center text-blue-600 text-2xl font-bold m-4 p-6">
        Sign up te access the System
        
      </div>
        <div className="flec items-center content-center text-blue-700 font-bold text-2xl m-b-6 p-5">Teachers Sign Up</div>
      <div className="flex items-center content-center w-auto h-auto">
        <button className='flex text-white bg-blue-700 m-8 p-5 rounded-full hover:bg-blue-400' onClick={()=>{
          navigate('/loginPage')
        }}>Continue to Sign Up</button>
      </div>
 

    </>
  )
}

export default LandingPage