import { useState, useCallback, useRef } from "react";
import * as jwtDecode from "jwt-decode";

import ResultModal from "./ResultModal";
import SelectedTopic from "./SelectTopic";


const topics = ['Calculus', 'Programming', 'Networking', 'Computer Hardware', 'Database'];
// eslint-disable-next-line react/prop-types
export default function NewExam(){

	const [questions, setQuestions] = useState([]);
	const [selectedTopic, setSelectedTopic] = useState(null);
	const [score, setScore] = useState(null);
	const [answers, setAnswers] = useState({});
	const dialog = useRef();

	const handleStartQuiz = useCallback(async()=>{

		try{
	
		  const response = await fetch("http://localhost:3000/questions",{
			method:'POST',
			body: JSON.stringify({selectedTopic}),
			headers: {
				"Content-Type": "application/json" 
			}
		
		});
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
	  
	
		
	},[selectedTopic]); 
	

    console.log(answers);

	const handleAnswerChange = (index, answer) => {
        setAnswers({ ...answers, [index]: answer });
    };

    const submitExam = useCallback(async () => {
        try {
			const token = localStorage.getItem("token");
			const studentId = localStorage.getItem('userId');
	
            const response = await fetch("http://localhost:3000/evaluate-answers", {
				method:'POST',
				body: JSON.stringify({ 
					answers,
					questions, 
					selectedTopic,
					studentId
				}),
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json" 
				}
            
            });

			if(response.ok){
				console.log(answers)
				const responseData = await response.json()
				setScore(responseData.score);

				dialog.current.showModal()
				console.log(score)
				console.log(responseData)
			}else{
				const data = await response.json()
				console.log(data)
			}

			
        } catch (error) {
            console.error("Error submitting answers:", error);
        }

    },[answers, questions, selectedTopic]);


	return(
	<>
		{/* <SelectedTopic handleStartQuiz={handleStartQuiz}/> */}
	<div className=" mx-auto pt-6 pb-6 pl-10 pr-10 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Select a Topic</h2>
      <div className=" flex gap-1.5">
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => setSelectedTopic(topic)}
            className={`block w-full text-left px-4 py-2 rounded-md transition-colors 
              ${
                selectedTopic === topic
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
          >
            {topic}
          </button>
          
        ))}
      </div>

      {selectedTopic && (
        <p className="mt-4 text-lg font-medium">
          Selected Topic: <span className="text-blue-600">{selectedTopic}</span>
        </p>
        
      )}
      {selectedTopic && <button onClick={handleStartQuiz}>Search</button>}
    </div>


		{questions.length<=0 && <p className="mt-10"><b>Loading questions.Please wait...</b></p>}

		{questions.length >0 && 
			<main className="newExamMain">

			<ResultModal finalScore = {score} ref={dialog}/>
			 <h2 className="text-xl text-stone-950 m-4"><b>Answer the questions below</b></h2>

		{

				questions.map((q, index) =>
					{
					return(        
				<div key={index} className="question-container p-4 w-4xl">
					
					<p><strong>Q{index + 1}: {q.question}</strong></p>
					<ul className="questions">


					{Object.entries(q.options).map(([key, value]) => (  
						<li key={key}>
						<label className="pl-1.5">
							<input 
							type="checkbox" 
							name={`question-${index}`} 
							value={key}
							className="mr-1.5"
							checked={answers[index] === key}
							onChange={() => handleAnswerChange(index, key)}
							/>
							{key}: {value}
						</label>
					</li>
					))}
					</ul>
				</div>
				)})
			 
			}

			<button onClick={submitExam} className="submit-button">Submit Exam</button> 

		 </main>
		}
		
		</>
	)
}
