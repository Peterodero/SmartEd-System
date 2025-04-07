import { useState, useEffect } from "react";

export default function StudentRecommendations() {
  const [recommendation, setRecommendation] = useState("");
  const studentId = localStorage.getItem("userId");

  useEffect(() => {
    async function fetchRecommendation() {
      try {
        const response = await fetch(`http://localhost:3000/recommendation/${studentId}`);
        const data = await response.json();
        if (response.ok) {
          setRecommendation(data.recommendation);
        } else {
          setRecommendation("No recommendation available.");
        }
      } catch (error) {
        console.error("Error fetching recommendation:", error);
        setRecommendation("Failed to get recommendation.");
      }
    }

    fetchRecommendation();
  }, [studentId]);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg mt-8 text-lg">
      <h2 className="text-xl font-bold">Your Course Recommendation</h2>
      <p className="mt-2">{recommendation}</p>
    </div>
  );
}
