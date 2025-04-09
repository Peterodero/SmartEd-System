import { useEffect, useState } from "react";

export default function AllStudentResults() {
  const [results, setResults] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch("http://localhost:3000/students/results", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setResults(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResults();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-6 p-4 w-2/3 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">All Student Results</h2>

      {results.length === 0 ? (
        <p className="text-center">Loading results.Please wait...</p>
      ) : (
        <table className="w-full table-auto border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Student Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Topic</th>
              <th className="border p-2">Score (%)</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) =>
              Object.entries(result.scores).map(([topic, score]) => (
                <tr key={`${result.studentId._id}-${topic}`}>
                  <td className="border p-2">{result.studentId?.name || "Unknown"}</td>
                  <td className="border p-2">{result.studentId?.email || "Unknown"}</td>
                  <td className="border p-2">{topic}</td>
                  <td className="border p-2">{score}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
