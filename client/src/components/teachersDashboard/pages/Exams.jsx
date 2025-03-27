import React, { useState } from "react";
import Sider from "./Sider"; // Assuming you have a sidebar component

const Exams = () => {
  const [exams, setExams] = useState([
    {
      code: "BCS 301",
      title: "Fundaental of Database Systems",
      date: new Date("2024-03-15"),
      status: "Scheduled",
      score: null,
    },
    {
      code: "BCS 302",
      title: "Computer Networks",
      date: new Date("2024-03-22"),
      status: "Scheduled",
      score: null,
    },
    {
      code: "BCS 303",
      title: "Sorftware Engineering",
      date: new Date("2024-04-05"),
      status: "Completed",
      score: 85,
    },
    {
        code: "BCS 304",
        title: "Design Analysis of Algorithms",
        date: new Date("2024-03-10"),
        status: "Completed",
        score: 92,
    },
  ]);



  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleAddExam = () => {
    // Implement adding a new exam (e.g., using a modal)
    const newExam = {
        id: exams.length +1,
        title: "New Exam",
        date: new Date(),
        status: "Scheduled",
        score: null,

    };
    setExams([...exams, newExam]);
  };

  return (
    <div className="bg-gray-800 text-white min-h-screen flex">
    
      <div
        className={`transition-margin-left duration-300 ease-in-out p-4 w-full`}
      >
      
        <main className="flex flex-col p-8">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-semibold">Exam Dashboard</h1>
            <button
              onClick={handleAddExam}
              className="bg-purple-700 rounded-md p-2 flex items-center"
            >
              <img src="src/icons/plus-icon.png" alt="add-exam" /> Add Exam
            </button>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Exam Schedule */}
            <div className="bg-gray-900 rounded-md p-4">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <img src="src/icons/calendar-icon.png" alt="calendar-icon" /> Exam Schedule
              </h2>
              <ul>
                {exams.map(
                  (exam) =>
                    exam.status === "Scheduled" && (
                      <li key={exam.id} className="mb-2">
                        <span className="font-semibold">{exam.title}</span> -{" "}
                        {formatDate(exam.date)}
                      </li>
                    )
                )}
              </ul>
            </div>

            {/* Exam Results */}
            <div className="bg-gray-900 rounded-md p-4">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
               <img src="src/icons/document-icon.png" alt="document-icon" /> Exam Results
              </h2>
              <ul>
                {exams.map(
                  (exam) =>
                    exam.status === "Completed" && (
                      <li key={exam.id} className="mb-2">
                        <span className="font-semibold">{exam.title}</span> -{" "}
                        {exam.score}
                      </li>
                    )
                )}
              </ul>
            </div>

            {/* Performance Overview (Placeholder) */}
            <div className="bg-gray-900 rounded-md p-4">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
               <img src="src/icons/bar-icon.png" alt="performance" />Performance Overview
              </h2>
              <p>
                (Placeholder for charts or detailed performance analysis)
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Exams;