import React, { useEffect, useState } from 'react';

const RemoveAllUsers = () => {
  const [students, setStudents] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/admin/getAllUsers', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        // Separate users into students and lecturers
        const studentList = data.filter(user => user.role === 'student');
        const lecturerList = data.filter(user => user.role === 'lecturer');

        setStudents(studentList);
        setLecturers(lecturerList);
        console.log(lecturers)
      } catch (err) {
        setError('Failed to fetch users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId, role) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/admin/deleteUser/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      const data = await response.json();
      alert(data.message);

      // Update the UI to remove the deleted user from the correct list
      if (role === 'student') {
        setStudents(prevStudents => prevStudents.filter(user => user._id !== userId));
      } else if (role === 'lecturer') {
        setLecturers(prevLecturers => prevLecturers.filter(user => user._id !== userId));
      }
    } catch (err) {
      console.error('Failed to delete user', err);
      alert('Failed to delete user');
    }
  };

  if (loading) {
    return <div className="text-center text-xl">Loading users...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 py-10">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">All Registered Users</h1>

        {/* Students Table */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Students</h2>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-gray-600">User Name</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-600">Email Address</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-700">{user.name}</td>
                  <td className="px-4 py-2 text-gray-700">{user.email}</td>
                  <td className="px-4 py-2 text-gray-700">
                    <button
                      onClick={() => handleDeleteUser(user._id, 'student')}
                      className="text-red-600 hover:text-red-800 font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Lecturers Table */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Lecturers</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-gray-600">User Name</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-600">Email Address</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {lecturers.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-700">{user.name}</td>
                  <td className="px-4 py-2 text-gray-700">{user.email}</td>
                  <td className="px-4 py-2 text-gray-700">
                    <button
                      onClick={() => handleDeleteUser(user._id, 'lecturer')}
                      className="text-red-600 hover:text-red-800 font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RemoveAllUsers;
