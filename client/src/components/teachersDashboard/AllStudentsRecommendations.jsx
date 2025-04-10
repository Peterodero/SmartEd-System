import { useEffect, useState } from "react";

export default function AllStudentRecommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await fetch("http://localhost:3000/allRecommendations", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setRecommendations(data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendations();
  }, []);


  return (
    <div className="max-w-5xl mx-auto mt-6 p-4 w-2/3">
      <h2 className="text-2xl font-bold mb-4 text-center">All Student Recommendations</h2>

      {recommendations.length === 0 ? (
        <p className="text-center">Loading recommendations.Please wait...</p>
      ) : (
        <table className="w-full table-auto border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Student Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Recommended Course</th>
            </tr>
          </thead>
          <tbody>
            {recommendations.map((rec) => (
              <tr key={rec._id}>
                <td className="border p-2">{rec.studentId?.name || "Unknown"}</td>
                <td className="border p-2">{rec.studentId?.email || "Unknown"}</td>
                <td className="border p-2">{rec.recommendation || "No recommendation available"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
