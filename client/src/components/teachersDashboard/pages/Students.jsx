import React, { useState } from 'react';
import Sider from './Sider'; // Assuming you have a Sider component

const Students = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [students, setStudents] = useState([
   
  ]);
  const [newStudent, setNewStudent] = useState({ name: '', grade: '', email: '' });
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [editedStudent, setEditedStudent] = useState({ name: '', grade: '', email: '' });

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e, field) => {
    setNewStudent({ ...newStudent, [field]: e.target.value });
  };

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.grade && newStudent.email) {
      setStudents([...students, { id: Date.now(), ...newStudent }]);
      setNewStudent({ name: '', grade: '', email: '' });
    }
  };

  const handleRemoveStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  const handleEditStudent = (id) => {
    const studentToEdit = students.find((student) => student.id === id);
    setEditedStudent({ ...studentToEdit });
    setEditingStudentId(id);
  };

  const handleSaveEdit = () => {
    setStudents(students.map((student) =>
      student.id === editingStudentId ? { ...editedStudent } : student
    ));
    setEditingStudentId(null);
    setEditedStudent({ name: '', grade: '', email: '' });
  };

  const handleCancelEdit = () => {
    setEditingStudentId(null);
    setEditedStudent({ name: '', grade: '', email: '' });
  };

  return (
    <div className="bg-gray-800 text-white min-h-screen flex">
    
      <div
        className={`transition-margin-left duration-300 ease-in-out  p-4 w-full`}
      >
       
        <main className="flex flex-col p-8">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-semibold">Student Dashboard</h1>
            <button
              onClick={handleAddStudent}
              className="bg-purple-700 rounded-md p-2 flex items-center"
            >
             <img src="src/icons/plus-icon.png" alt="plus-icon" /> Add Student
            </button>
          </header>

          {/* Add Student Form */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Add New Student</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Name"
                value={newStudent.name}
                onChange={(e) => handleInputChange(e, 'name')}
                className="bg-gray-700 rounded-md p-2"
              />
              <input
                type="text"
                placeholder="Grade"
                value={newStudent.grade}
                onChange={(e) => handleInputChange(e, 'grade')}
                className="bg-gray-700 rounded-md p-2"
              />
              <input
                type="email"
                placeholder="Email"
                value={newStudent.email}
                onChange={(e) => handleInputChange(e, 'email')}
                className="bg-gray-700 rounded-md p-2"
              />
            </div>
          </div>

          {/* Student List */}
          <div className="bg-gray-900 rounded-md p-4">
            <h2 className="text-lg font-semibold mb-4">Student List</h2>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left ">Name</th>
                  <th className="text-left">Grade</th>
                  <th className="text-left">Email</th>
                  <th className="text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>
                      {editingStudentId === student.id ? (
                        <input
                          type="text"
                          value={editedStudent.name}
                          onChange={(e) => setEditedStudent({ ...editedStudent, name: e.target.value })}
                          className="bg-gray-700 rounded-md p-1 w-full"
                        />
                      ) : (
                        student.name
                      )}
                    </td>
                    <td>
                      {editingStudentId === student.id ? (
                        <input
                          type="text"
                          value={editedStudent.grade}
                          onChange={(e) => setEditedStudent({ ...editedStudent, grade: e.target.value })}
                          className="bg-gray-700 rounded-md p-1 w-full"
                        />
                      ) : (
                        student.grade
                      )}
                    </td>
                    <td>
                      {editingStudentId === student.id ? (
                        <input
                          type="email"
                          value={editedStudent.email}
                          onChange={(e) => setEditedStudent({ ...editedStudent, email: e.target.value })}
                          className="bg-gray-700 rounded-md p-1 w-full"
                        />
                      ) : (
                        student.email
                      )}
                    </td>
                    <td className="flex space-x-2">
                      {editingStudentId === student.id ? (
                        <>
                          <button onClick={handleSaveEdit} className="text-green-500">Save</button>
                          <button onClick={handleCancelEdit} className="text-red-500">Cancel</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleEditStudent(student.id)} className="text-blue-500">
                            <img src="src/icons/pen-icon.webp" alt="penIcon" 
                            height={20}
                            width={20}/>
                          </button>
                          <button onClick={() => handleRemoveStudent(student.id)} className="text-red-500">
                        <img src="src/icons/trash-icon.png" alt="trashIcon" />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Students;