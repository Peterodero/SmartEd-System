import { useState, useEffect } from "react";

export default function StudentProfile() {
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({ name: "", email: "" });

    const studentId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                console.log(`Fetching profile for student ID: ${studentId}`);
                const response = await fetch(`http://localhost:3000/profile/${studentId}`);

                if (!response.ok) throw new Error("Failed to fetch profile");

                const data = await response.json();
                setStudent(data);
                setFormData({ name: data.name, email: data.email });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [studentId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/profile/${studentId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Failed to update profile");

            const updatedStudent = await response.json();
            setStudent(updatedStudent);
            alert("Profile updated successfully!");
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4">Student Profile</h2>
            <form onSubmit={handleSubmit}>
                <label className="block mb-2">
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="border p-2 w-full rounded" />
                </label>
                <label className="block mb-2">
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="border p-2 w-full rounded" />
                </label>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Update Profile</button>
            </form>
        </div>
    );
}
