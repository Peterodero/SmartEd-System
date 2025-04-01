
import { useState, useEffect } from 'react';
import axios from 'axios';

import Sidebar from './Sidebar';

import { Outlet, useNavigate } from 'react-router-dom';
import StudentHeader from './StudentHeader';

export default function StudentDashboard({handleStartQuiz}){

		
	const [startLearning,setStartLearning] = useState(false)
	const [sidebarOpen,setSidebarOpen] = useState(false);
	const navigate = useNavigate();
	const [data, setData] = useState(null);

	const token = localStorage.getItem("token");

	useEffect(() => {
        axios.get("http://localhost:3000/student", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => setData(res.data))
        .catch((err) => console.error("Unauthorized", err));
    }, []);
	
		const handleStartLearn = async () => {
			setStartLearning(true);
			navigate('learn')
		};


	function toggleSidebar(){
		setSidebarOpen(!sidebarOpen);
	}
	
	function handleLogout() {
        localStorage.removeItem("token"); // Remove token
        navigate("/./signIn"); // Redirect to login
    }


	return(

	<div className='student-dashboard mt-0 '>
		
			<Sidebar 
			sidebarOpen={sidebarOpen}
			toggleSidebar={toggleSidebar} 
			handleStartQuiz={()=>{
				navigate('newExam')
				handleStartQuiz()}}
			handleStartLearn={handleStartLearn}
			/>

		<div  className={`transition-margin-left duration-300 ease-in-out mt-0 ${
          sidebarOpen ? 'ml-64' : 'ml-0'
       		 } p-4`}>

			<StudentHeader sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}/>
		
			<div className=" p-6 m-7 rounded-2xl flex flex-col justify-center items-center">
				<Outlet/>

				<div className='studentLogout'>
					<button onClick={handleLogout}>Logout</button>
				</div>
			</div>
		</div >
			
	</div>
		
	)
}
