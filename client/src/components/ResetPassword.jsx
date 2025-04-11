import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

function ResetPassword() {
  const [formData, setFormData] = useState({
    firstPassword: "",
    secondPassword: ""
  });

  const [didEdit, setDidEdit] = useState({
    firstPassword: false,
    secondPassword: false
  });

  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  function handleBlur(identifier) {
    setDidEdit(prevEdit => ({
      ...prevEdit,
      [identifier]: true
    }));
  }

  function hasMinLength(value, minLength) {
    return value.length >= minLength;
  }

  function handleChange(event) {
    setFormData(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMsg('');

    if (formData.firstPassword !== formData.secondPassword) {
      setMsg("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: formData.firstPassword,
          token: token
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid or expired token');
      }

      setMsg('Password updated successfully!');
      localStorage.removeItem('token');
      setTimeout(() => navigate('/signIn'), 2000);
    } catch (err) {
      setMsg("Failed to update password.Contact an Admin at scientistrockml@gmail.com");
    } finally {
      setLoading(false);
    }
  }

  const firstPasswordIsInvalid = !hasMinLength(formData.firstPassword, 6) && didEdit.firstPassword;
  const secondPasswordIsInvalid = !hasMinLength(formData.secondPassword, 6) && didEdit.secondPassword;

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-xl font-semibold mb-4">Fill the form to change password</h2>
      <form className="resetform w-1/2 flex flex-col gap-4" onSubmit={handleFormSubmit}>
        <div className="resetform-div">
          <label className="block mb-1">Enter New Password</label>
          <input 
            type="password" 
            name="firstPassword" 
            value={formData.firstPassword} 
            onBlur={() => handleBlur('firstPassword')}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
          {firstPasswordIsInvalid && <p className="text-red-500 text-sm mt-1">Password must be at least 6 characters</p>}
        </div>
        <div className="resetform-div">
          <label className="block mb-1">Confirm New Password</label>
          <input 
            type="password" 
            name="secondPassword" 
            value={formData.secondPassword}
            onBlur={() => handleBlur('secondPassword')} 
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
          {secondPasswordIsInvalid && <p className="text-red-500 text-sm mt-1">Password must be at least 6 characters</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
      <p className="mt-4 text-red-600">{msg}</p>
      <p className="mt-2">Back to <Link className="text-blue-600 underline" to="/signIn">login</Link></p>
    </div>
  );
}

export default ResetPassword;
