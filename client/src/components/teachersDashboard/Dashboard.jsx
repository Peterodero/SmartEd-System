import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FaChalkboardTeacher, FaBookOpen, FaUsers, FaChartBar, FaHome } from 'react-icons/fa';
//import AllStudentResults from './StudentsResults';
//import SetQuestions from './SetQuestions';

const Dashboard = () => {
  return (
    <main className='teacherDashboardMain' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2em' }}>
      <div style={{ textAlign: 'center', marginBottom: '3em' }}>
        <h1 style={{ fontSize: '2.8em', fontWeight: 'bold', color: '#3498db', marginBottom: '0.7em' }}>
          <FaChalkboardTeacher style={{ marginRight: '0.5em' }} /> Empowering Educators, Inspiring Futures!
        </h1>
        <p style={{ fontSize: '1.8em', color: '#555', lineHeight: '1.7' }}>
          Welcome to your dedicated dashboard, the central hub for shaping the next generation. Here, you have the tools to guide, assess, and inspire your students. Let's make learning impactful together!
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2em', width: '80%', maxWidth: '900px' }}>
        <Link to='/lecturer/setQuestions' style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ backgroundColor: '#e6f7ff', padding: '20px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <FaBookOpen style={{ fontSize: '2.5em', color: '#2980b9', marginBottom: '0.5em' }} />
            <h3 style={{ fontWeight: 'bold', color: '#2980b9', marginBottom: '0.3em' }}>Create Assessment</h3>
            <p style={{ fontSize: '1.1em', color: '#777' }}>Design and deploy new exams and quizzes to evaluate student understanding.</p>
            <button style={{ marginTop: '1em', padding: '0.8em 1.5em', borderRadius: '5px', border: 'none', backgroundColor: '#2980b9', color: 'white', cursor: 'pointer', fontSize: '1em' }}>Get Started</button>
          </div>
        </Link>

        <Link to='/lecturer/studentsResults' style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ backgroundColor: '#f0f8ea', padding: '20px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <FaChartBar style={{ fontSize: '2.5em', color: '#2ecc71', marginBottom: '0.5em' }} />
            <h3 style={{ fontWeight: 'bold', color: '#2ecc71', marginBottom: '0.3em' }}>Review Results</h3>
            <p style={{ fontSize: '1.1em', color: '#777' }}>Access and analyze student performance data to gain insights and tailor your teaching.</p>
            <button style={{ marginTop: '1em', padding: '0.8em 1.5em', borderRadius: '5px', border: 'none', backgroundColor: '#2ecc71', color: 'white', cursor: 'pointer', fontSize: '1em' }}>View Now</button>
          </div>
        </Link>
        {}
        <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <FaHome style={{ fontSize: '2.5em', color: '#333', marginBottom: '0.5em' }} />
            <h3 style={{ fontWeight: 'bold', color: '#333', marginBottom: '0.3em' }}>Back to Homepage</h3>
            <p style={{ fontSize: '1.1em', color: '#777' }}>Return to the main platform interface.</p>
            <button style={{ marginTop: '1em', padding: '0.8em 1.5em', borderRadius: '5px', border: 'none', backgroundColor: '#333', color: 'white', cursor: 'pointer', fontSize: '1em' }}>Go Back</button>
          </div>
        </Link>
      </div>

      <p className="mt-4" style={{ fontSize: '1.1em', color: '#777' }}>
        Need assistance? Visit our <Link to="/lecturer/teacherHelp" style={{ color: '#3498db' }}>Help Center</Link> for guidance and support.
      </p>
    </main>
  );
}

export default Dashboard;