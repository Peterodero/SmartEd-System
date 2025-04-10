// src/components/AdminDashboard.jsx
import React, { useEffect, useState } from "react";

const AdminLandingPage = () => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adminName, setAdminName] = useState("");
  const[userRole, setUserRole]= useState("")

  const token = localStorage.getItem("token"); 
  useEffect(() => {
      const name = localStorage.getItem("userName"); 
      const role = localStorage.getItem("role");
      if (name) setAdminName(name);
      if(role) setUserRole(role)
    }, []);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await fetch("http://localhost:3000/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch admin data");
        }

        const data = await res.json();
        setAdminData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [token]);

  if (loading) return <p className="text-center"><b>Loading...</b></p>;
  if (error) return <p className="text-center text-red-500">Failed to load.Refresh again!</p>;

  return (
    <div className=" flex flex-col justify-start items-center bg-gray-100 py-10">
       <h1 className="mb-6 mt-0">Welcome back {adminName}</h1> 

      {adminData && (
        <div>
          <h3 className="text-xl"><b>Admin Dashboard Overview:</b></h3>
          <p className="mt-4">
            <strong>Total Registered Lecturers:</strong> {adminData.lecturerCount}
          </p>

          <h3 className="text-xl mt-6"><b>List of Students:</b></h3>
          <ul>
            {adminData.students.map((student) => (
              <li key={student._id}>
                {student.name} - {student.email}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminLandingPage;
