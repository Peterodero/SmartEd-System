import { useEffect, useState } from "react";

export default function AdminProfile() {
  const [lecturer, setLecturer] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const [nameError, setNameError] = useState("");

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

  const validateName = (name) => {
    // Must have at least two words, letters only, each word starts with capital
    const namePattern = /^([A-Z][a-z]+)(\s[A-Z][a-z]+)+$/;
    return namePattern.test(name.trim());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({ ...prev, [name]: value }));

    if (name === "name") {
      if (!validateName(value)) {
        setNameError(
          "Name must have at least two words, only letters, and each start with a capital letter."
        );
      } else {
        setNameError("");
      }
    }
  };

  const handleSave = async () => {
    if (!validateName(updatedData.name)) {
      setNameError(
        "Name must have at least two words, only letters, and each start with a capital letter."
      );
      return;
    }

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
        setNameError("");
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
            <>
              <input
                name="name"
                value={updatedData.name}
                onChange={handleChange}
                className="input border p-2 w-full"
              />
              {nameError && (
                <p className="text-red-500 text-sm mt-1">{nameError}</p>
              )}
            </>
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
