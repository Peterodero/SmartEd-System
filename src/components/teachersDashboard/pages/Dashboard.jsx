import React, { useState } from 'react';
import Sider from './Sider';

import menuIcon from "../../teachersDashboard/Icons/menu-icon.gif"


const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative h-screen bg-gray-250"> 
      {/* Sidebar */}
      <Sider isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div
        className={`transition-margin-left duration-300 ease-in-out ${
          isOpen ? 'ml-64' : 'ml-0'
        } p-4`}
      >
        {!isOpen && (
          <div
            onClick={toggleSidebar}
            className="bg-gray-400 hover:bg-blue-600 text-white font-bold p-1 rounded"
            style={{ width: '30px', height: '30px' }}
          >
            <img src={menuIcon} alt="Menu" style={{ width: '20px', height: '20px' }} />
          </div>
        )}

        <section>
          <div className="bg-gray-300 p-6 m-7 rounded-2xl text-6xl flex justify-center items-center">
            {/* <img
              className="rounded-full m-3 hover:shadow-2xl transition duration-500 ease-in-out"
              src="../icons/web-logo.jpg"
              alt="web-logo"
              height={200}
              width={200}
            /> */}
            Welcome Back Teacher !!
          </div>
          {/* <div className="flex bg-amber-200 text-3xl p-3 m-3 rounded-2xl">
            <img src="../icons/web-logo.jpg" alt="moreicon" height={20} width={50} />
          </div> */}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;