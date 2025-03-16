import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [action, setAction] = useState('Login');
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleUserLogin = () => {
    setError('');
    setSuccess('');

    if (!name || !password) {
      setError('Please enter your name and password.');
      return;
    }

    console.log('Login:', { name, password });
    setSuccess('Login successful!');
    navigate('/dashboard');
  };

  const handleUserSignup = () => {
    setError('');
    setSuccess('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    console.log('Signup:', { name, email, password });
    setSuccess('Signup successful!');
    setAction('Login');
  };

  const handleForgotPassword = () => {
    setError('');
    setSuccess('');

    if (!email || !name) {
      setError('Please enter your name and email.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Simulate forgot password logic (replace with actual logic)
    console.log('Forgot Password:', { name, email });
    setSuccess('Password reset link sent to your email.');
    setAction('Login');
  };

  const handleSignUpClick = () => {
    setAction('Sign Up');
    setError('');
    setSuccess('');
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="relative bg-amber-50 p-6 md:p-10 lg:p-20 flex flex-col items-center justify-center min-h-screen">
      <div className="text-blue-700 text-2xl md:text-3xl font-bold mb-6 md:mb-8">
        {action}
      </div>

      {error && <div className="text-red-500 mb-2 md:mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-2 md:mb-4 flex m-3"><img src="src/icons/success.png" alt="" height={30} width={30}/>{success}</div>}

      <div className="flex flex-col w-full max-w-md">
        <div className="flex items-center bg-gray-100 p-3 md:p-4 rounded-full mb-3 md:mb-4">
          <img src="src/assets/user.png" alt="User" height={20} width={55} />
          <input
            type="text"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 p-2 ml-2 border-none bg-transparent focus:outline-none"
          />
        </div>

        {(action === 'Sign Up' || action === 'Forgot Password') && (
          <div className="flex items-center bg-gray-100 p-3 md:p-4 rounded-full mb-3 md:mb-4">
            <img src="src/assets/email.png" alt="Email" height={20} width={55} />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 p-2 ml-2 border-none bg-transparent focus:outline-none"
            />
          </div>
        )}

        {action !== 'Forgot Password' && (
          <div className="flex items-center bg-gray-100 p-3 md:p-4 rounded-full mb-3 md:mb-4">
            <img src="src/assets/padlock.png" alt="Password" height={20} width={55} />
            <input
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 p-2 ml-2 border-none bg-transparent focus:outline-none"
            />
          </div>
        )}

        {action === 'Sign Up' && (
          <div className="flex items-center bg-gray-100 p-3 md:p-4 rounded-full mb-3 md:mb-4">
            <img src="src/assets/padlock.png" alt="Confirm Password" height={20} width={55} />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="flex-1 p-2 ml-2 border-none bg-transparent focus:outline-none"
            />
          </div>
        )}
      </div>

      {action !== 'Forgot Password' && action !== 'Sign Up' && (
        <div
          className="text-blue-400 hover:text-blue-500 cursor-pointer mb-6 md:mb-8"
          onClick={() => setAction('Forgot Password')}
        >
          Forgot password? <span className="underline">Click here</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
        {action === 'Login' && (
          <>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors w-full md:w-auto"
              onClick={handleUserLogin}
            >
              Log in
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors w-full md:w-auto"
              onClick={handleSignUpClick}
            >
              Sign Up
            </button>
          </>
        )}

        {action === 'Sign Up' && (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors w-full md:w-auto"
            onClick={handleUserSignup}
          >
            Sign Up
          </button>
        )}

        {action === 'Forgot Password' && (
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full transition-colors w-full md:w-auto"
            onClick={handleForgotPassword}
          >
            Reset Password
          </button>
        )}

        {action !== 'Login' && (
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-full transition-colors w-full md:w-auto"
            onClick={() => setAction('Login')}
          >
            Back to Login
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginPage;