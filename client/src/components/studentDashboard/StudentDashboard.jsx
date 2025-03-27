import profileLogo from '../../assets/profile.png';
import notificationLogo from '../../assets/notification.png';
import NoExam from './NoExam';
import { useCallback, useState } from 'react';
import NewExam from './NewExam';
// import { getSignInData } from '../../util/http';
import Sidebar from './Sidebar';

import menuIcon from "../studentDashboard/Icons/menu-icon.gif"
import LearnOnline from './LearnOnline';

export default function StudentDashboard(){

		
	const [questions, setQuestions] = useState([]);
	const [startExam, setStartExam] = useState(false);
	const [startLearning,setStartLearning] = useState(false)
	const [sidebarOpen,setSidebarOpen] = useState(false);

	
		const handleStartLearn = async () => {
			setStartLearning(true);

		};

		const handleStartQuiz = useCallback(async()=>{
			setStartExam(true);
	
			try{
	
				const response = await fetch("http://localhost:3000/questions");
				const data = await response.json();
				console.log("Data is" + data);
		
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
		
	
			if (data.candidates && data.candidates.length > 0) {
				let textResponse = data.candidates[0].content.parts[0].text.trim();
				textResponse = textResponse.replace(/```json/g, "").replace(/```/g, "").trim();
	
	
				if (!textResponse.startsWith("{") && !textResponse.startsWith("[")) {
					throw new Error("Invalid JSON format: Response does not start with '{' or '['");
				}
	
				const questions = JSON.parse(textResponse); 
	
				const newQuestions = questions.questions
	
				console.log("Extracted Questions:", newQuestions);
	
		
			setQuestions(newQuestions || []);

	
				return newQuestions;
			} else {
				console.error("No valid response from API");
			}
	
		}
		// eslint-disable-next-line no-unused-vars
		catch(error){
		   console.error("Error fetching the questions")
		}
		

		  
	},[]); 

	function toggleSidebar(){
		setSidebarOpen(!sidebarOpen);
	}
	
	return(

	<div className='student-dashboard mt-0 '>
		
			<Sidebar 
			sidebarOpen={sidebarOpen}
			toggleSidebar={toggleSidebar} 
			handleStartQuiz={handleStartQuiz}
			handleStartLearn={handleStartLearn}
			/>

		<div  className={`transition-margin-left duration-300 ease-in-out mt-0 ${
          sidebarOpen ? 'ml-64' : 'ml-0'
       		 } p-4`}>

			<header className={`transition-margin-left duration-300 flex flex-row justify-between items-center bg-gray-300 p-4 fixed top-0 right-0 ${sidebarOpen ? 'left-64 justify-end' : 'left-0'} `}>

				{!sidebarOpen && (
						<div
						onClick={toggleSidebar}
						className="bg-gray-400 hover:bg-blue-600 text-white font-bold p-1 rounded"
						style={{ width: '30px', height: '30px' }}
						>
						<img src={menuIcon} alt="Menu" style={{ width: '20px', height: '20px' }} />
						</div>
					)}

				<div className='studentInfo'>
						<img src={notificationLogo} alt='notification'/>
					<h2>Peter</h2>		
					<img src={profileLogo} alt="profile"/>		
				</div>
			</header>
			

		<div className=" p-6 m-7 rounded-2xl flex justify-center items-center">
			{startExam ? <NewExam questions={questions}/> : <NoExam/>}
		</div>
			
			<div className='studentLogout'>
				<button>Logout</button>
			</div>
			
		</div>
	</div>
		
	)
}


















//if (quizData.candidates && quizData.candidates.length > 0) {
	// 	let textResponse = quizData.candidates[0].content.parts[0].text.trim();
	// 	textResponse = textResponse.replace(/```json/g, "").replace(/```/g, "").trim();


	// 	if (!textResponse.startsWith("{") && !textResponse.startsWith("[")) {
	// 		throw new Error("Invalid JSON format: Response does not start with '{' or '['");
	// 	}

	// 	const questions = JSON.parse(textResponse); // Convert JSON string to object

	// 	const newQuestions = questions.questions

	// 	console.log("Extracted Questions:", questions);


	// setQuestions(newQuestions || []);


	// 	return newQuestions;
	// } else {
	// 	console.error("No valid response from API");
	// }
