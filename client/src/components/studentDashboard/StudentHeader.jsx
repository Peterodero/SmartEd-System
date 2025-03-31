import React from 'react'
import menuIcon from "../studentDashboard/Icons/menu-icon.gif"
import profileLogo from '../../assets/profile.png';


const StudentHeader = ({sidebarOpen, toggleSidebar}) => {
  return (
    <header className={`transition-margin-left duration-300 flex flex-row justify-between items-center bg-gray-300 p-4 fixed top-0 right-0 ${sidebarOpen ? 'left-64 justify-end' : 'left-0'} `}>
    
        {!sidebarOpen && (
                <div
                onClick={toggleSidebar}
                className="bg-gray-400 hover:bg-blue-600 text-white font-bold p-1 rounded"
                style={{ width: '30px', height: '30px' }}
                >
                <img src={menuIcon} alt="Menu" style={{ width: '20px', height: '20px' }} />
                </div>
            )}

        <div className='studentInfo'>
            <h2>Peter</h2>		
            <img src={profileLogo} alt="profile"/>		
        </div>
    </header>
  )
}

export default StudentHeader