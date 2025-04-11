
import React from 'react';
import { Link } from 'react-router-dom';

const LecHelp = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-black-700">SmartEd Help Center</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🧭 Getting Started</h2>
        <p className="text-gray-700">To begin using SmartEd, click the icon at the top left corner to navigate the pages using the sidebar.</p>
      </section>


      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">📊 Viewing Recommendations</h2>
        <p className="text-gray-700">Click on the "View Recommendation page" page in the sidebar to view recommendations.</p>
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

export default LecHelp;
