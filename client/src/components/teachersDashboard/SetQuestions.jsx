import React, { useState, useEffect } from "react";
import axios from "axios";

const SetQuestions = () => {
  const [subjectsData, setSubjectsData] = useState({
    questions: {},
    selectedSubjects: [],
    loading: false,
    error: null
  });

  const computerScienceSubjects = [
    "Algorithms",
    "Data Structures",
    "Operating Systems",
    "Computer Networks",
    "Database Systems",
    "Software Engineering",
    "Computer Architecture",
    "Artificial Intelligence",
    "Machine Learning",
    "Web Development",
    "Cybersecurity",
    "Cloud Computing"
  ];

  const handleSubjectToggle = (subject) => {
    setSubjectsData(prev => ({
      ...prev,
      selectedSubjects: prev.selectedSubjects.includes(subject)
        ? prev.selectedSubjects.filter(s => s !== subject)
        : [...prev.selectedSubjects, subject]
    }));
  };

  const handleGenerate = async () => {
    if (subjectsData.selectedSubjects.length === 0) {
      setSubjectsData(prev => ({ ...prev, error: "Please select at least one subject" }));
      return;
    }

    setSubjectsData(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await axios.get('http://localhost:3000/api/questions', {
        params: {
          subjects: subjectsData.selectedSubjects
        },
        paramsSerializer: params => {
          return params.subjects.map(subject => `subjects=${encodeURIComponent(subject)}`).join('&');
        }
      });

      setSubjectsData(prev => ({
        ...prev,
        questions: response.data.questions,
        loading: false
      }));
    } catch (err) {
      setSubjectsData(prev => ({
        ...prev,
        error: err.response?.data?.error || "Failed to fetch questions",
        loading: false
      }));
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Computer Science Exam Generator</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Select Subjects</h2>
        <div className="flex flex-wrap gap-3 mb-4">
          {computerScienceSubjects.map(subject => (
            <button
              key={subject}
              onClick={() => handleSubjectToggle(subject)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                subjectsData.selectedSubjects.includes(subject)
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {subject}
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            {subjectsData.selectedSubjects.length} subject(s) selected
          </p>
          <button
            onClick={handleGenerate}
            disabled={subjectsData.loading || subjectsData.selectedSubjects.length === 0}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {subjectsData.loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </span>
            ) : (
              `Generate Exam (${subjectsData.selectedSubjects.length} Subjects)`
            )}
          </button>
        </div>
        {subjectsData.error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
            {subjectsData.error}
          </div>
        )}
      </div>

      {Object.keys(subjectsData.questions).length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Generated Exam Paper</h2>
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-600">
              Subjects: {subjectsData.selectedSubjects.join(", ")}
            </p>
            <p className="text-sm text-gray-500">
              Generated at: {new Date().toLocaleString()}
            </p>
          </div>
          
          {subjectsData.selectedSubjects.map(subject => (
            <div key={subject} className="mb-8">
              <h3 className="text-xl font-semibold mb-4 border-b pb-2">{subject} Questions</h3>
              <div className="space-y-4">
                {subjectsData.questions[subject]?.map((question, index) => (
                  <div key={index} className="flex">
                    <span className="font-medium mr-2">{index + 1}.</span>
                    <p>{question}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SetQuestions;