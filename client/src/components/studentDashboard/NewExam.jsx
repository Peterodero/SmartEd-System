import { useState, useCallback, useRef } from "react";
import ResultModal from "./ResultModal";

// eslint-disable-next-line react/prop-types
export default function NewExam({questions}){


	const [score, setScore] = useState(null);
	const [answers, setAnswers] = useState({});
	const dialog = useRef();

    console.log({answers, questions})
	const handleAnswerChange = (index, answer) => {
        setAnswers({ ...answers, [index]: answer });
    };

    const submitExam = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:3000/evaluate-answers", {
				method:'POST',
				body: JSON.stringify({answers,questions}),
				headers: {
					"Content-Type": "application/json" 
				}
            
            });

			const responseData = await response.json()
            setScore(responseData.score);

			dialog.current.showModal()
			console.log(score)
			console.log(responseData)
        } catch (error) {
            console.error("Error submitting answers:", error);
        }

    },[]);


	return(
		<>
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
