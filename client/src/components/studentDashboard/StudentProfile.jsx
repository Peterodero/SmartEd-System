import { useState, useEffect } from "react";

// List of valid TLDs
const validTLDs = [
  '.com', '.org', '.net', '.edu', '.gov', '.io', '.co', '.us',
  '.ac', '.ke', '.uk', '.ca', '.de', '.fr', '.jp', '.au',
  '.in', '.nz', '.za', '.it', '.br', '.cn', '.ru', '.mx',
  '.co.uk', '.ac.ke', '.gov.uk', '.edu.au', '.co.za', '.eu',
  '.ch', '.se', '.no', '.fi', '.dk', '.pl', '.be', '.es', '.pt',
  '.gr', '.hk', '.sg', '.tw', '.kr', '.ae', '.sa', '.eg', '.ng'
];

export default function StudentProfile() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const studentId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
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

  const validateName = (name) => {
    const pattern = /^([A-Z][a-z]+)(\s[A-Z][a-z]+)+$/;
    return pattern.test(name.trim());
  };

  const validateEmail = (email) => {
    const isLowerCase = email === email.toLowerCase();
    const startsWithLetter = /^[a-z]/.test(email);
    const containsLetter = /[a-z]/.test(email);
    const emailPattern = /^[a-z][a-z0-9._%+-]*@[a-z0-9.-]+\.[a-z]{2,}$/;

    // Check if the email ends with a valid TLD from the list
    const endsWithValidTLD = validTLDs.some(tld => email.endsWith(tld));

    return emailPattern.test(email) && containsLetter && isLowerCase && startsWithLetter && endsWithValidTLD;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "name") {
      if (!validateName(value)) {
        setNameError("Name must have at least two words, only letters, each starting with a capital letter.");
      } else {
        setNameError("");
      }
    }

    if (name === "email") {
      if (!validateEmail(value)) {
        setEmailError("Email must be valid, lowercase, start with a letter, contain at least one letter, and end with a valid TLD.");
      } else {
        setEmailError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isNameValid = validateName(formData.name);
    const isEmailValid = validateEmail(formData.email);

    if (!isNameValid || !isEmailValid) {
      if (!isNameValid) {
        setNameError("Name must have at least two words, only letters, each starting with a capital letter.");
      }
      if (!isEmailValid) {
        setEmailError("Email must be valid, lowercase, start with a letter, contain at least one letter, and end with a valid TLD.");
      }
      return;
    }

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
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
        </label>
        <label className="block mb-2">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
