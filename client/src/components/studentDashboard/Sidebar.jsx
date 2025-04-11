import {useNavigate, Link} from 'react-router-dom'
export default function Sidebar({sidebarOpen, toggleSidebar, handleDirectQuiz, handleStartLearn}){

  const navigate = useNavigate()

  function handleViewResults(){
    navigate('viewResults')
  }

  function handleViewProfile(){
    navigate('viewProfile')
  }
  function handleCheckRecommendations(){
    navigate('courseRecommendations')
  }

      let sideButtonsStyle = "hover:bg-gray-500 hover:text-black transition duration-300 rounded p-1"

    return(
        <div  className={`flex flex-col  gap-4 fixed top-0 left-0 h-full text-white transition-all duration-300 ease-in-out ${
            sidebarOpen ? 'w-64' : 'w-0'
          } overflow-x-hidden bg-gray-700`}>

           <div className="flex flex-row">
              <main>
                    <div className="flex flex-col gap-1 p-1 mt-2">
                        <span className="text-sm font-semibold">Student</span>
                        <span className="text-xs text-gray-400">Student Dashboard</span>  
                    </div>
              </main>
               
                <div onClick={toggleSidebar} 
                    className=" bg-red-400 w-8 h-8 pb-4 hover:cursor-pointer absolute top-4 right-4 text-xl text-white text-center font-bold  rounded">
                    &times;
                </div>
           </div>
           

            <div  className={`flex flex-col gap-3 block py-2 px-4 rounded-md cursor-pointer transition-colors duration-200 sidebarDiv1`}>
              <div onClick={handleDirectQuiz} 
              className={sideButtonsStyle}>Start Quiz</div>
              
{/* 
              <div onClick={handleStartLearn} 
              className={sideButtonsStyle}>Learn </div> */}

              <div className={sideButtonsStyle} onClick={handleViewResults}>View Results</div>
              
              <div className={sideButtonsStyle} onClick={handleCheckRecommendations}>Recommended Courses </div>

              <div className={sideButtonsStyle} onClick={handleViewProfile}>Profile Settings</div>

              <p className='ml-1.5 mt-8'>
                  Back to <Link to="/student" className="text-blue-400">start page</Link>
              </p>

              <div className='studentLogout' style={{colour: 'blue'}}>
                <button onClick={()=>{
                  localStorage.removeItem("token");
                  navigate("/signIn"); 
                }}>Logout</button>
               </div>
            </div>

        </div>
    )
}