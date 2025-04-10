import { useEffect, useState } from "react";

export default function AdminProfile() {
  const [lecturer, setLecturer] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedData, setUpdatedData] = useState({});

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:3000/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setLecturer(data);
        setUpdatedData(data);
      } catch (error) {
        console.error("Failed to fetch lecturer profile", error);
      }
    };

    fetchProfile();
  }, [userId, token]);

  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:3000/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        const data = await res.json();
        setLecturer(data);
        setEditMode(false);
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  if (!lecturer) return <p className="text-center text-lg"><b>Loading...</b></p>;

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg w-1/2">
      <h2 className="text-2xl font-bold mb-4 text-center">Admin Profile</h2>

      <div className="space-y-4">
        <div>
          <label className="block font-medium">Name:</label>
          {editMode ? (
            <input
              name="name"
              value={updatedData.name}
              onChange={handleChange}
              className="input border p-2 w-full"
            />
          ) : (
            <p>{lecturer.name}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Email:</label>
          <p>{lecturer.email}</p>
        </div>

        <div>
          <label className="block font-medium">Role:</label>
          <p>{lecturer.role}</p>
        </div>

        {/* <div>
          <label className="block font-medium">Department:</label>
          {editMode ? (
            <input
              name="department"
              value={updatedData.department || ""}
              onChange={handleChange}
              className="input border p-2 w-full"
            />
          ) : (
            <p>{lecturer.department || "Not set"}</p>
          )}
        </div> */}

        {editMode ? (
          <button
            onClick={handleSave}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="mt-4 bg-gray-700 text-white px-4 py-2 rounded"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}
