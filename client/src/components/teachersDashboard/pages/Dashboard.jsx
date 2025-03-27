import React, { useState } from 'react';
import Sider from './Sider';
import menuIcon from "../../teachersDashboard/Icons/menu-icon.gif"


const Dashboard = () => {

  return (
    <div className="bg-gray-900 mb-0 border-b-amber-50 border">
 
      <div>
    

<div className="bg-gray-900 text-white font-sans p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-800 rounded-full px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
          <i className="fas fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-lg font-semibold">Total Students</h2>
          <p className="text-3xl font-bold">2350</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-lg font-semibold">Total Courses</h2>
          <p className="text-3xl font-bold">12</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-lg font-semibold">Average Rating</h2>
          <p className="text-3xl font-bold">4.7</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-lg font-semibold">Total Classes</h2>
          <p className="text-3xl font-bold">10</p>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Overal Performance </h2>
          <div className="flex justify-center">
            <canvas id="studentChart" width="250" height="250"></canvas>
          </div>
          <div className="flex justify-around mt-4">
            <p>School Chart</p>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Class Perormance</h2>
          <div className="flex justify-around mt-68">
            <p>Students Chart</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Course Stats</h2>
          <table className="table-auto w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-2">Course</th>
                <th className="text-left p-2">Category</th>
                <th className="text-left p-2">Ratings</th>
                <th className="text-left p-2">Visits</th>
                <th className="text-left p-2">Classes</th>
                <th className="text-left p-2">Students</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700">
                <td className="p-2">Artificial Intelligence</td>
                <td className="p-2">Computer Science</td>
                <td className="p-2">4.7</td>
                <td className="p-2">25,300</td>
                <td className="p-2">6</td>
                <td className="p-2">100</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="p-2">Robotics</td>
                <td className="p-2">Computer Science</td>
                <td className="p-2">4.5</td>
                <td className="p-2">22,800</td>
                <td className="p-2">4</td>
                <td className="p-2">20</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="p-2">Cyber Security</td>
                <td className="p-2">Computer Science</td>
                <td className="p-2">4.2</td>
                <td className="p-2">18,160</td>
                <td className="p-2">4</td>
                <td className="p-2">60</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-gray-800 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Top Students</h2>
   
        </div>
      </section>
    </div>
      </div>
    </div>
  );
};

export default Dashboard;