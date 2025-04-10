
import React from 'react';
import { Link } from 'react-router-dom';

const StudentHelp = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-black-700">SmartEd Help Center</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🧭 Getting Started</h2>
        <p className="text-gray-700">To begin using SmartEd, click the icon at the top left corner to navigate the pages using the sidebar.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">📝 Taking Quizzes</h2>
        <p className="text-gray-700">Go to the "Start Quiz" section. Enter a topic (e.g., Databases), and questions will be generated using AI. Submit answers and wait for your score.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">📊 Viewing Results</h2>
        <p className="text-gray-700">Click on the “Results” page in the sidebar to view past quizzes and scores. Scores are auto-calculated after submission.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🎯 Course Recommendations</h2>
        <p className="text-gray-700">SmartEd uses your quiz results to suggest IT specialization areas like Software Engineering or Cybersecurity. Visit the “Recommendations” tab to explore them.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🛠️ Troubleshooting</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Ensure you are connected to the internet</li>
          <li>Clear browser cache if pages don't load</li>
          <li>Contact support if results are missing</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">📞 Contact Support</h2>
        <p className="text-gray-700"><a href="mailto:scientistrockml@gmail.com" className="text-blue-500 underline">support@smarted.com</a></p>
        
      </section>
    </div>
  );
};

export default StudentHelp;
