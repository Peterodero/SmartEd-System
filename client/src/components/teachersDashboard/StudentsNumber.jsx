import React, { useState, useEffect } from 'react';

const StudentCount = () => {
  const [studentCount, setStudentCount] = useState(null); // To hold the student count
  const [loading, setLoading] = useState(true); // To show loading state

  useEffect(() => {
    // Fetch the number of students from the backend (API endpoint)
    const fetchStudentCount = async () => {
      try {
        const response = await fetch('http://localhost:3000/students/count'); // Make sure this API endpoint exists in your backend
        if (response.ok) {
          const data = await response.json();
          setStudentCount(data.count); // Assuming the backend responds with { count: <number> }
        } else {
          throw new Error('Failed to fetch student count');
        }
      } catch (error) {
        console.error('Error fetching student count:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentCount();
  }, []); 

  if (loading) {
    return <p className="text-center text-lg p-4"><b>Loading...</b></p>; 
  }

  return (
    <div className="bg-gray-500 p-4 rounded-lg text-white shadow-md flex flex-col items-center mt-10 w-1/2 ml-65">
      <h3 className="text-lg font-semibold">Total Registered Students</h3>
      <p className="text-2xl font-bold">{studentCount}</p>
    </div>
  );
};

export default StudentCount;
