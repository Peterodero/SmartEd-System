
export default function Sidebar({sidebarOpen, toggleSidebar, handleStartQuiz, handleStartLearn}){

      let sideButtonsStyle = "hover:bg-gray-500 hover:text-black transition duration-300 rounded p-1"

    return(
        <div  className={`flex flex-col  gap-4 fixed top-0 left-0 h-full text-white transition-all duration-300 ease-in-out ${
            sidebarOpen ? 'w-64' : 'w-0'
          } overflow-x-hidden bg-gray-800`}>

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
              <div onClick={handleStartQuiz} 
              className={sideButtonsStyle}>Start Quiz</div>

              <div onClick={handleStartLearn} 
              className={sideButtonsStyle}>Learn </div>

             <div className={sideButtonsStyle}>Overview of Progress</div>

              <div className={sideButtonsStyle}>View Results</div>
              
              <div className={sideButtonsStyle}>Recommended Courses </div>

              <div className={sideButtonsStyle}>Profile Settings</div>

            </div>

        </div>
    )
}