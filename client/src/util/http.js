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
		console.log(response.json());

	return response.json();

	} catch (error) {
		console.error("Error fetching topic of study:", error);
	}
	

}
