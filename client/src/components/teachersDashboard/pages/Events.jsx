import React, { useState } from 'react';
import Sider from './Sider';

const Events = () => {

  const liveEvents = [
    { id: 1, title: 'Object Oriented Programming', time: '10:00 AM - 12:00 PM' },
    { id: 2, title: 'Discrete Structures', time: '2:00 PM - 4:00 PM' },
  ];

  const upcomingClasses = [
    { id: 1, title: 'Differential Calculus', date: '2025-10-25', time: '9:00 AM' },
    { id: 2, title: 'Data Analysis Techniques ', date: '2025-10-26', time: '11:00 AM' },
  ];

  const ongoingClasses = [
    { id: 1, title: 'English Literature', time: 'Ongoing' },
    { id: 2, title: 'Computer Graphics', time: 'Ongoing' },
  ];

  const eventsToCome = [
    { id: 1, title: 'Field Industrial Trip', date: '2025-11-15' },
    { id: 2, title: 'Industrial Training', date: '2025-11-20' },
  ];

  return (
    <div className=" bg-gray-900">
   
      <div
        className={`transition-margin-left duration-300 ease-in-out  p-4`}
      >
       
        <div className="">
        <section className="bg-gray-800 p-6 m-7 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4 text-white">Live Events</h2>
          <div className="space-y-4">
            {liveEvents.map(event => (
              <div key={event.id} className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                <p className="text-white">{event.time}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Classes Section */}
        <section className="bg-gray-800 p-6 m-7 rounded-2xl text-white">
          <h2 className="text-3xl font-bold mb-4">Upcoming Classes</h2>
          <div className="space-y-4">
            {upcomingClasses.map(cls => (
              <div key={cls.id}>
                <h3 className="text-xl font-semibold">{cls.title}</h3>
                <p className="">{cls.date} at {cls.time}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ongoing Classes Section */}
        <section className="bg-gray-800 p-6 m-7 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4 text-white">Ongoing Classes</h2>
          <div className="space-y-4">
            {ongoingClasses.map(cls => (
              <div key={cls.id} className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-white">{cls.title}</h3>
                <p className="text-white">{cls.time}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Events to Come Section */}
        <section className="bg-gray-800 p-6 m-7 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4 text-white">Events to Come</h2>
          <div className="space-y-4">
            {eventsToCome.map(event => (
              <div key={event.id} className=" p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                <p className="text-white">{event.date}</p>
              </div>
            ))}
          </div>
        </section>
        </div>
      </div>
    </div>
  );
};

export default Events;