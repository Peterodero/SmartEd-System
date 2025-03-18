
import profileLogo from '../../assets/profile.png';
import notificationLogo from '../../assets/notification.png';
import NoExam from './NoExam';
import { useState } from 'react';
import NewExam from './NewExam';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getSignInData } from '../../util/http';
import Sidebar from './Sidebar';

import menuIcon from "../studentDashboard/Icons/menu-icon.gif"

export default function StudentDashboard(){

		
	const [questions, setQuestions] = useState([]);
	const [start, setStart] = useState(false);
	const [sidebarOpen,setSidebarOpen] = useState(false);

	const navigate = useNavigate();

	const {data} = useQuery({
		queryKey:['signIn'],
		queryFn: getSignInData
	})
	

	const GEMINI_API_KEY =" AIzaSyBsm7086P-LUdJ61s07sIR-v7PApUAJqjI"
	
	const handleStartLearn = async () => {
		setStart(true);

		try {

			const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					contents: [
						{ parts: [{ text: "Generate 10 different questions on JavaScript. Each question should have four options (A, B, C, D) with one correct answer. Format the response as JSON.Please be consistent every time I ask you to generate questions" }] }
					]
				})
			});
		
			const data = await response.json();
			console.log(data);

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			if (data.candidates && data.candidates.length > 0) {
				let textResponse = data.candidates[0].content.parts[0].text.trim();
				textResponse = textResponse.replace(/```json/g, "").replace(/```/g, "").trim();


				if (!textResponse.startsWith("{") && !textResponse.startsWith("[")) {
					throw new Error("Invalid JSON format: Response does not start with '{' or '['");
				}

				const questions = JSON.parse(textResponse); // Convert JSON string to object

				const newQuestions = questions.questions

				console.log("Extracted Questions:", questions);

		
			setQuestions(newQuestions || []);


				return newQuestions;
			} else {
				console.error("No valid response from API");
			}

		} catch (error) {
			console.error("Error fetching questions:", error);
		}
	};

	async function handleStartQuiz(){
		setStart(true);

	  try{

		const response = await fetch("http://localhost:5000/questions");
		const data = await response.json();
		console.log(data);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		if (data.candidates && data.candidates.length > 0) {
			let textResponse = data.candidates[0].content.parts[0].text.trim();
			textResponse = textResponse.replace(/```json/g, "").replace(/```/g, "").trim();


			if (!textResponse.startsWith("{") && !textResponse.startsWith("[")) {
				throw new Error("Invalid JSON format: Response does not start with '{' or '['");
			}

			const questions = JSON.parse(textResponse); // Convert JSON string to object

			const newQuestions = questions.questions

			console.log("Extracted Questions:", questions);

	
		setQuestions(newQuestions || []);


			return newQuestions;
		} else {
			console.error("No valid response from API");
		}

	 }
	 catch(error){
		console.error("Error fetching the questions")
	 }
}

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
					<h2>{data}</h2>		
					<img src={profileLogo} alt="profile"/>		
				</div>
			</header>
			

		<div className=" p-6 m-7 rounded-2xl flex justify-center items-center">
			{ start ? <NewExam questions={questions}/> : <NoExam/>}

		</div>
		
			
			<div className='studentLogout'>
				<button>Logout</button>
			</div>
			
		</div>
	</div>
		
	)
}