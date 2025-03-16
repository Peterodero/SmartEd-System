
import profileLogo from '../../assets/profile.png';
import notificationLogo from '../../assets/notification.png';
import NoExam from './NoExam';
import { useState } from 'react';
import NewExam from './NewExam';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getSignInData } from '../../util/http';

export default function StudentDashboard(){

		
	const [questions, setQuestions] = useState([]);
	
	
	const [start, setStart] = useState(false);
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


	
	return(

		<div>
			<header className='studentDiv'>
			<div className='studentDivDetails'>
				{/* <button onClick={handleNavigate}>Home</button> */}
				{ !start && <button onClick={handleStartQuiz}>Start Quiz</button>}
				{!start && <button onClick={handleStartLearn}>Chatbot learn</button>}	
				<button>Check Recommendations</button>			
			</div>
			<div className='studentInfo'>
					<img src={notificationLogo} alt='notification'/>
				<h2>{data}</h2>		
				<img src={profileLogo} alt="profile"/>		
			</div>
			
		</header>
		
		{ start ? <NewExam questions={questions}/> : <NoExam/>}
			
			<div className='studentLogout'>
				<button>Logout</button>
			</div>
			
		</div>
		
	)
}