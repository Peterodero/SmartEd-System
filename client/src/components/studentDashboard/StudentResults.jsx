import { useState, useEffect } from "react";

export default function StudentResults() {
  const [scores, setScores] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const studentId = localStorage.getItem("userId"); 

  console.log("Retrieved student ID:", studentId);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch(`http://localhost:3000/student-scores/${studentId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch scores");
        }
        const data = await response.json();
        setScores(data.scores);
      } catch (err) {
        console.log("Error occurred")
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, [studentId]);

  if (loading) return <p className="mt-6">Loading scores...</p>;
  if (error) return <p>It seems like you have not done any quiz</p>;

  return (
    <div className="mx-auto mt-6 p-6 bg-white shadow-lg rounded-lg w-2/3">
      <h2 className="text-xl font-bold mb-4">Student Results</h2>
      {Object.keys(scores).length === 0 ? (
        <p>No scores available</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border border-gray-300 px-4 py-2">Topic</th>
              <th className="border border-gray-300 px-4 py-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(scores).map(([topic, score]) => (
              <tr key={topic} className="bg-gray-100 text-center">
                <td className="border border-gray-300 px-4 py-2">{topic}</td>
                <td className="border border-gray-300 px-4 py-2">{score}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
