
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../Header";
import Sider from "./Sidebar";
import { useState, useEffect } from "react";
import menuIcon from "./Icons/menu-icon.gif"
import profile from "../../assets/profile.png"



function AdminDashboard() {

    const [studentName, setStudentName] = useState("");
    const[userRole, setUserRole]= useState("")
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

useEffect(() => {
    const name = localStorage.getItem("userName"); // this gets name from localStorage
    const role = localStorage.getItem("role");
    if (name) setStudentName(name);
    if(role) setUserRole(role)
  }, []);
  
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };

    function handleLogout() {
      localStorage.removeItem("token"); // Remove token
      navigate("/signIn"); // Redirect to login
  }

  return (
 

    <>
        <Header/>
            <Sider isOpen={isOpen} toggleSidebar={toggleSidebar} />
          <header className={`transition-margin-left duration-300 flex flex-row justify-between items-center bg-gray-300 p-4 fixed top-0 right-0 ${isOpen ? 'left-64 justify-end' : 'left-0'} `}>
        
                {!isOpen && (
                    <div
                    onClick={toggleSidebar}
                    className="bg-gray-400 hover:bg-blue-600 text-white font-bold p-1 rounded"
                    style={{ width: '30px', height: '30px' }}
                    >
                    <img src={menuIcon} alt="Menu" style={{ width: '20px', height: '20px' }} />
                    </div>
                  )}
        
                <div className='studentInfo'>
                  <h2>{studentName}</h2>		
                  <img src={profile} alt="profile"/>		
                </div>
            </header>
      
        <div className={`transition-margin-left duration-300 transition-all flex flex-col right-0 p-6 ${isOpen ? ' ml-64' : 'ml-0'}`}>
          <Outlet/>
          <div className='studentLogout'>
                 <button onClick={handleLogout}>Logout</button>
                </div>
        </div>
    </>
  )
}

export default AdminDashboard;
