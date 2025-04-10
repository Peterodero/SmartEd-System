import React from 'react';
import { Link } from 'react-router-dom';


const HomeHelp = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-10">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-stone-950">Help & Support</h1>
        
        <p className="text-gray-700 mb-4">
          Welcome to the SmartEd help page! Below are common questions and support options for users:
        </p>

        <div className="space-y-4 text-gray-800">
          <div>
            <h2 className="text-xl font-semibold text-blue-600">📚 For Students</h2>
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>Search and learn topics using the search bar.</li>
              <li>Take quizzes by clicking the “Start Quiz” button on your dashboard.</li>
              <li>View your results under the “View Results” tab.</li>
              <li>Check personalized course recommendations.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-green-600">👨‍🏫 For Lecturers</h2>
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>Monitor student performance.</li>
              <li>View student course recommendations.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-red-600">🛠 For Admins</h2>
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>View all registered users.</li>
              <li>Delete or register lecturers.</li>
              <li>View total number of lecturers and students.</li>
            </ul>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-700">Need more help?</h2>
            <p className="mt-2">
              Contact support at: <a href="mailto:scientistrockml@gmail.com" className="text-blue-500 underline">support@smarted.com</a>
            </p>
          </div>
          <Link to="/">Back</Link>
        </div>
      </div>
    </div>
  );
};

export default HomeHelp;

