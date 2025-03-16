import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import Dashboard from "./pages/Dashboard"
import Events from "./pages/Events"
import Subjects from "./pages/Subjects"
import Exams from "./pages/Exams"
import Messages from "./pages/Messages"
import NoticeBoard from "./pages/NoticeBoard"
import Classes from "./pages/Classes"
import Routine from "./pages/Routine"
import LiveClass from "./pages/DashboardMain"
import Students from "./pages/Students"



function TeachersDashboard() {

  return (
    // <Router>
    // <Routes >
    // <Route path ="/" element ={<LandingPage/>}/>
    // <Route path = "/loginPage" element ={<LoginPage/>}/>
    // <Route path = "/dashboard" element ={<Dashboard/>}/>
    // <Route path = "/events" element ={<Events/>}/>
    // <Route path = "/subjects" element ={<Subjects/>}/>
    // <Route path = "/liveClass" element ={<LiveClass/>}/>
    // <Route path = "/messages" element ={<Messages/>}/>
    // <Route path = "/routine" element ={<Routine/>}/>
    // <Route path = "/notice" element ={<NoticeBoard/>}/>
    // <Route path = "/classes" element ={<Classes/>}/>
    // <Route path = "/exams" element ={<Exams/>}/>
    // <Route path = "/students" element ={<Students/>}/>
    // </Routes>
    // </Router>

    <>
      <Dashboard/>
    </>
  )
}

export default TeachersDashboard;
