import { useEffect } from "react";
const API_URL = 'http://localhost:3000'

export async function sendSignUpData(data){
	const response = await fetch(`${API_URL}/auth/signUp`, {
		method:'POST',
		headers:{
			"Content-Type":"application/json"
		},
		body:JSON.stringify(data)
	})

	if (!response.ok) {
        throw new Error("Signup failed");
    }
	
	const resData = await response.json();
	
	return resData.data;
}


export async function sendSignInData(data) {
	const response = await fetch(`${API_URL}/auth/signIn`, {
		method:'POST',
		headers:{
			"Content-Type":"application/json"
		},
		body:JSON.stringify(data)
	})

	if (!response.ok) {
        throw new Error("failed to sign in");
    }
	
	const resData = await response.json();

	if(resData.token){
		console.log(resData.token)

	}

	return resData;
}

	export async function usefetchQuestions(){

		useEffect(()=>{
			async function fetchQuestions(){
				try{

					const response = await fetch("http://localhost:3000/questions");
					const data = await response.json();
					console.log("Data is" + data);
			
					if (!response.ok) {
						throw new Error(`HTTP error! Status: ${response.status}`);
					}
			
					return data;
			
				
			
				 }
				 // eslint-disable-next-line no-unused-vars
				 catch(error){
					console.error("Error fetching the questions")
				 }
			}
			fetchQuestions()
			
		},[]) 
		
		}

export async function fetchTopic(topic) {
	try {
    
		const response = await fetch(`${API_URL}/learn`, {
			method:'POST',
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify(topic)
		})
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
	  
		// const data = response.json();
		// console.log(data);

	
	// 	if (data.candidates && data.candidates.length > 0) {
	// 	  let textResponse = data.candidates[0].content.parts[0].text.trim();
	// 	  textResponse = textResponse.replace(/```json/g, "").replace(/```/g, "").trim();
	
	
	// 	  if (!textResponse.startsWith("{") && !textResponse.startsWith("[")) {
	// 		throw new Error("Invalid JSON format: Response does not start with '{' or '['");
	// 	  }
	
	// 	  const questions = JSON.parse(textResponse); 
	
	// 	  const newQuestions = questions.questions
	
	// 	  console.log("Extracted Questions:", newQuestions)

	// 	console.log(response.json());
	// 	return newQuestions;
    // } else {
    //   console.error("No valid response from API");
    // }

	} catch (error) {
		console.error("Error fetching topic of study:", error);
	}
	

}
