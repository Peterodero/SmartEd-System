import React, { useState } from 'react';

const Subjects = () => {


  return (
    <div className="bg-gray-900 text-white min-h-screen flex">
    
      <div
        className={`transition-margin-left duration-300 ease-in-out p-4`}
      >
       

      <main className='flex-1 p-8'>
        <header className='flex justify-between items-center mn-8 '>
          <h1 className='text-2xl font-semibold text-white'>Data Mining and Warehousing</h1>
          <div className="flex place-items-center">
            <input type="text" placeholder='Search...' className="bg-gray-700 rounded-md p-2 mr-4 text-white" />
            <button className='bg-purple-600 rounded-md p-2 gap-4 ml-8'> + Add Assignment</button>
          </div>
        </header>

        {/* Overview section */}
        <div className="text-white">
        <div className="grid grid-col-1 md:grid-cols-4 gap-4 mb-8 mt-15">
          <div className="bg-gray-800 rounded-md p-4 ">
          <h3 className='text-lg font-semibold'>Students</h3>
          <p className='text-2xl '>35</p>
        </div>
        
          <div className="bg-gray-800 rounded-md p-4 ">
          <h3 className='text-lg font-semibold'>Assignments</h3>
          <p className='text-2xl '>12</p>
        </div>
       
          <div className="bg-gray-800 rounded-md p-4 ">
          <h3 className='text-lg font-semibold'>Average grades</h3>
          <p className='text-2xl '>82%</p>
        </div>

          <div className="bg-gray-800 rounded-md p-4 ">
          <h3 className='text-lg font-semibold'>Upcomming Due</h3>
          <p className='text-2xl '> 11/22/2025</p>
        </div>
        </div>
        </div>

        {/* Student Lists */}
        <div className="bg-gray-800 text-white rounded-md p-4 mb-8 mt-5">
          <h2 className='text-3xl font-semibold mb-4 '>Students</h2>
          {/* Table List of Students  */}
          <table className='w-full'>
            <thead>
              <tr className='text-left'>
                <th>Name</th>
                <th>Grade </th>
                <th>Attendace</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Shadrack Onyango</td>
                <td>A</td>
                <td>80%</td>
              </tr>
              <tr>
                <td>Boniace Mainye</td>
                <td>A</td>
                <td>86%</td>
              </tr>
              <tr>
                <td>Peter Odero</td>
                <td>A</td>
                <td>90%</td>
              </tr>
              <tr>
                <td>Kennedy Onyango</td>
                <td>A</td>
                <td>88%</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Assignments and Activities */}
        <div className="bg-gray-800 text-white rounded-md p-4">
          <h2 className='text-lg font-semibold mb-4'>Assignments</h2>
          {/* list of assignments and details */}
          <ul>
            <li>CAT 1 - Due 11/22/2025 Grade /20</li>
            <li>CAT 2 - Due 11/22/2025 Grade /20</li>
          </ul>
        </div>
      </main>
    </div>
    </div>
  );
};

export default Subjects;