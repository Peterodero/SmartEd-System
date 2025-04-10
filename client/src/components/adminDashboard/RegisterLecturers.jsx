import React, { useState } from 'react';
import validator from 'validator';

const RegisterLecturer = () => {
  const [name, setName] = useState('');
  const [nameIsValid, setNameIsValid] = useState(true);
  const [email, setEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [password, setPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [department, setDepartment] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Add more common TLDs
  const validTLDs = [
    '.com', '.org', '.net', '.edu', '.gov', '.io', '.co', '.us',
    '.ac', '.ke', '.uk', '.ca', '.de', '.fr', '.jp', '.au',
    '.in', '.nz', '.za', '.it', '.br', '.cn', '.ru', '.mx',
    '.co.uk', '.ac.ke', '.gov.uk', '.edu.au', '.co.za', '.eu',
    '.ch', '.se', '.no', '.fi', '.dk', '.pl', '.be', '.es', '.pt',
    '.gr', '.hk', '.sg', '.tw', '.kr', '.ae', '.sa', '.eg', '.ng'
  ];

  const validateEmail = (email) => {
    if (!validator.isEmail(email)) return false;
    const domain = email.split('@')[1];
    return validTLDs.some(tld => domain.endsWith(tld));
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    return passwordRegex.test(password);
  };

  const validateFullName = (fullName) => {
    const namePattern = /^[A-Za-z]{2,}(?:\s+[A-Za-z]{2,})+$/;
    return namePattern.test(fullName.trim());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !department) {
      setError('All fields are required');
      return;
    }

    if (!validateFullName(name)) {
      setError('Please enter a valid full name');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters long and contain at least one number and one special character');
      return;
    }

    if (!department.trim()) {
      setError('Department cannot be empty');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/admin/registerLecturer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ name, email, password, department, role: 'lecturer' }),
      });

      if (!response.ok) {
        throw new Error('Failed to register lecturer');
      }

      const data = await response.json();
      setSuccess(true);
      setError(null);
      setName('');
      setEmail('');
      setPassword('');
      setDepartment('');
      alert(data.message);
    } catch (err) {
      setError('Failed to register lecturer');
      setSuccess(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 py-10">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Register Lecturer</h1>

        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">Lecturer registered successfully!</div>}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700" htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => {
                const value = e.target.value;
                setName(value);
                setNameIsValid(validateFullName(value));
              }}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
            {!nameIsValid && name && (
              <div className="text-red-500 text-sm">
                Please enter a valid full name (first and last name, letters only).
              </div>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                const value = e.target.value;
                setEmail(value);
                setEmailIsValid(validateEmail(value));
              }}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
            {!emailIsValid && email && (
              <div className="text-red-500 text-sm">Invalid email address</div>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                const value = e.target.value;
                setPassword(value);
                setPasswordIsValid(validatePassword(value));
              }}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
            {!passwordIsValid && password && (
              <div className="text-red-500 text-sm">
                Password must be at least 6 characters long and contain at least one number and one special character
              </div>
            )}
          </div>

          {/* Department */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700" htmlFor="department">Department</label>
            <input
              type="text"
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Register Lecturer
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterLecturer;
