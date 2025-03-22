import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './domain/Navbar';
import Dashboard from './domain/Dashboard1';
import StudentResults from './domain/StudentResults';
import MessageTeacher from './domain/Talks';
import './ParentDashboard.css';

function ParentDashboard() {
  
  return (
    <>
     <Navbar/>
    <Dashboard/>

  </>
  )
}

export default ParentDashboard;