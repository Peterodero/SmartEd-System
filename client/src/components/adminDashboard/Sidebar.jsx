import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sider = ({ isOpen, toggleSidebar }) => {
  const [activeItem, setActiveItem] = useState(''); // Default active item
  const navigate = useNavigate();

  const handleItemClick = (itemName, path) => {
    setActiveItem(itemName); // Set the active item
    navigate(path); // Navigate to the specified path
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full text-white transition-all duration-300 ease-in-out ${
        isOpen ? 'w-64' : 'w-0'
      } overflow-x-hidden bg-gray-800`}
    >
      {/* Close Button */}
      <div onClick={toggleSidebar} className="bg-red-400 w-8 h-8 p-1 absolute top-4 right-4 text-2xl text-white font-bold  rounded">
        &times;
      </div>

      {/* Sidebar Content */}
      <div className="p-4">
        <div className="flex items-center mb-8">
          <div className="bg-purple-600 rounded-full w-10 h-10 flex items-center justify-center mr-2"></div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Admin</span>
            <span className="text-xs text-gray-400">Admin Dashboard</span>
          </div>
        </div>

        <nav className='m-5 '>  
          {[
            { name: 'Dashboard', path: 'adDashboard' },
            { name: 'Registered Students', path: 'students' },
            {name: "Register Lecturers", path: 'registerLecturers'},
            { name: 'Add Admin', path: 'addAdmin' },
            { name: 'Remove Users', path: 'removeUsers' },
            { name: 'Profile Settings', path: 'adminProfile' },

          ].map((item) => (
            <div
              key={item.name}
              onClick={() => handleItemClick(item.name, item.path)}
              className={`block py-2 px-4 rounded-md cursor-pointer transition-colors duration-200 ${
                activeItem === item.name
                  ? 'bg-purple-600 text-white' // Active item style
                  : 'hover:bg-gray-700 text-gray-300' // Inactive item style
              }`}
            >
              {item.name}
            </div>
          ))}
        </nav>

          <div className='studentLogout'>
              <button onClick={()=>{
                 localStorage.removeItem("token");
                 navigate("/signIn"); 
              }}>Logout</button>
          </div>
      </div>
    </div>
  );
};

export default Sider;