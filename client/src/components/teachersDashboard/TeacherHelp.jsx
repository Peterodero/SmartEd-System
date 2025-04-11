import React from 'react';
import { Link } from 'react-router-dom';
import { FaQuestionCircle, FaBook, FaUsers, FaChartBar, FaPencilAlt } from 'react-icons/fa'; // Import relevant icons

const TeacherHelp = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        <FaQuestionCircle className="inline-block mr-2" />
        SmartEd Teacher Help Center
      </h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          <FaBook className="inline-block mr-2" />
          Creating Assessments
        </h2>
        <p className="text-gray-700">
          To create a new assessment:
        </p>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Navigate to the "<Link to="/lecturer/setQuestions" className="text-blue-500 underline">Set Question </Link>" section.</li>
          <li>Select the subjects (e.g., one or two exams).</li>
          <li>Click Generate exams to view them.</li>
          <li>Scroll through.</li>
          <li>Publish the assessment for students to access.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          <FaUsers className="inline-block mr-2" />
          Managing Students
        </h2>
        <p className="text-gray-700">
          The "Manage Students" section allows you to:
        </p>
        <ul className="list-disc pl-6 text-gray-700">
          <li>View the list of enrolled students.</li>
          <li>Track student progress and participation.</li>
        
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          <FaChartBar className="inline-block mr-2" />
          Viewing and Analyzing Results
        </h2>
        <p className="text-gray-700">
          To analyze student performance:
        </p>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Go to the "<Link to="/lecturer/studentsResults" className="text-blue-500 underline">Student Results</Link>" page.</li>
          <li>Generate reports on student performance.</li>
          <li>You can also navigate "STUDENTS RECOMENDATIONS" to see terecomended courses for students.</li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          🛠️ Troubleshooting
        </h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Ensure you have a stable internet connection.</li>
          <li>Clear your browser's cache and cookies if you encounter display issues.</li>
          <li>If you experience problems with assessment creation or student data, contact support.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          📞 Contact Support
        </h2>
        <p className="text-gray-700">
          For further assistance, please contact us at:
        </p>
      </section>
    </div>
  );
};

export default TeacherHelp;