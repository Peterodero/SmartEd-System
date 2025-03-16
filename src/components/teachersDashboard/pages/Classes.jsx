import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Classes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative h-screen bg-gray-900">

      <div
        className={`fixed top-0 left-0 h-full text-white transition-all duration-300 ease-in-out ${
          isOpen ? 'w-64' : 'w-0'
        } overflow-x-hidden`}
      >
        {/* Close Button */}
        <button onClick={toggleSidebar} className="absolute top-4 right-4 text-2xl">
          &times;
        </button>
    
        {/* Sidebar Content */}
        <div className="bg-gray-800 text-white min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-4">
        <div className="flex items-center mb-8">
          <div className="bg-purple-600 rounded-full w-10 h-10 flex items-center justify-center mr-2">
            
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Teacher</span>
            <span className="text-xs text-gray-400">Teacher Dashboard</span>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <img
            src="../icons/teachers-icon.webp"
            alt="Profile"
            className="rounded-full w-10 h-10 mr-2"
          />
          <div>
            <span className="text-sm font-semibold">teacher</span>
            <span className="text-xs text-gray-400">teacher</span>
          </div>
        </div>
        <nav>
         {/* Teachers elements */}

         <div className="mt-16 p-4">
         <a onClick={()=>{navigate('/dashboard')}} className="block py-2 px-4 hover:bg-gray-700 rounded-md">
           Dashboard
          </a>
          <a
            onClick={() => navigate('/subjects')}
            className="block py-2 px-4 hover:bg-gray-700 rounded-md cursor-pointer"
          >
            Subjects
          </a>
          <a
            onClick={() => navigate('/routine')}
            className="block py-2 px-4 hover:bg-gray-700 rounded-md cursor-pointer"
          >
            Routine
          </a>
          <a
            onClick={() => navigate('/exams')}
            className="block py-2 px-4 hover:bg-gray-700 rounded-md cursor-pointer"
          >
          Exams
          </a>
          <a
            onClick={() => navigate('/classes')}
            className="block py-2 px-4 hover:bg-gray-700 rounded-md cursor-pointer"
          >
            Classes
          </a>
          <a
            onClick={() => navigate('/students')}
            className="block py-2 px-4 hover:bg-gray-700 rounded-md cursor-pointer"
          >
            Students
          </a>
       
          <a
            onClick={() => navigate('/notice')}
            className="block py-2 px-4 hover:bg-gray-700 rounded-md cursor-pointer"
          >
            Notice Board
          </a>
          <a
            onClick={() => navigate('/liveclass')}
            className="block py-2 px-4 hover:bg-gray-700 rounded-md cursor-pointer"
          >
            Live Class
          </a>
          <a
            onClick={() => navigate('/events')}
            className="block py-2 px-4 hover:bg-gray-700 rounded-md cursor-pointer"
          >
            Events
          </a>
          <div className="mt-8">
          <span className="text-xs text-gray-400">Others</span>
          <ul className="space-y-2 mt-2">
            <li>
              <button className="flex items-center w-full p-2 rounded-md hover:bg-gray-700">
                <span className="mr-2">💵</span>
                <span>Finance</span>
              </button>
            </li>
            <li>
              <button className="flex items-center w-full p-2 rounded-md hover:bg-gray-700">
                <span className="mr-2">🍽️</span>
                <span>Food</span>
              </button>
            </li>
            <li>
              <button className="flex items-center w-full p-2 rounded-md hover:bg-gray-700">
                <span className="mr-2">⚙️</span>
                <span>Settings</span>
              </button>
            </li>
          </ul>
        </div>
          <a
            onClick={() => navigate('/loginpage')}
            className="block py-2 px-4 hover:bg-gray-700 rounded-md cursor-pointer"
          >
            Log Out
          </a>
        </div>
              {/* Sidebar Footer */}
              <div className="px-4 py-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">@onyangosoftwares</p>
        </div>
        </nav>
       
            </aside>
            <div className="flex-1 p-4">
              {/* Main content goes here */}
            </div>
          </div>
      </div>

      {/* Main Content */}
      <div
        className={`transition-margin-left duration-300 ease-in-out ${
          isOpen ? 'ml-64' : 'ml-0'
        } p-4`}
      >
        {!isOpen && (
          <button
            onClick={toggleSidebar}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold p-1 rounded"
            style={{ width: '30px', height: '30px' }}
          >
            <img src="src/icons/more.png" alt="onyangosoftwares" style={{ width: '20px', height: '20px' }} />
          </button>
        )}
        <section>
          <div className="bg-amber-200 p-6 m-7 rounded-2xl text-6xl flex justify-center items-center">
            <img
              className="rounded-full m-3 hover:shadow-2xl transition duration-500 ease-in-out"
              src="src/icons/web-logo.jpg"
              alt="web-logo"
              height={200}
              width={200}
            />
            Welcome Back Teacher !!
          </div>
          <div className="flex bg-amber-200 text-3xl p-3 m-3 rounded-2xl">
            <img src="src/icons/web-logo.jpg" alt="moreicon" height={20} width={50} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Classes;