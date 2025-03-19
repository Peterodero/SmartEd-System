import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../styles/Login.css';

const Login = ({ onLogin }) => {
  const [loginError, setLoginError] = useState('');

  const initialValues = {
    email: '',
    password: '',
  };
  //This will be an API call to authenticate from our
/*
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      setLoginError(''); // Clear previous errors

      const response = await fetch('/api/login', { // Will Replace '/api/login' with our backend endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setLoginError(errorData.message || 'Login failed'); // Handle error messages from the backend
        return;
      }

      const data = await response.json();
      const { token, user } = data; // Assuming the backend returns a token and user data

      // Store the JWT (e.g., in local storage)
      localStorage.setItem('authToken', token);

      // Call the onLogin function with the user data
      onLogin(user);
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('An unexpected error occurred');
    } finally {
      setSubmitting(false);
    }
  };*/
  //after backend will comment this out
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    // In a real application, this would be an API call to authenticate
    setTimeout(() => {
      // Mock authentication - this would check credentials against a backend in real thing
      if (values.email === 'kennah@ceo.com' && values.password === 'password123') {
        const userData = {
          id: '1',
          name: 'Kennah',
          email: values.email,
          studentReg: 'ST1',
          studentName: 'Shaddy',
          studentGrade: '7th',
        };
        onLogin(userData);
      } else {
        setLoginError('Invalid email or password');
      }
      setSubmitting(false);
    }, 500);
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1>Parent Dashboard</h1>
        <h2>Login</h2>
        {loginError && <div className="error-message">{loginError}</div>}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field type="email" name="email" id="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field type="password" name="password" id="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="error-message" />
                
              </div>

              <button type="submit" className="login-button" disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </Form>
          )}
        </Formik>
        <div className="login-help">
          <p>Use these credentials for testing with the army:</p>
          <p>Email: kennah@ceo.com</p>
          <p>Password: password123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;