import axios from "axios";
import { useEffect } from "react";
const API_URL = 'http://localhost:3000'

export async function sendSignUpData(data){
	const response = await fetch(`${API_URL}/signUp`, {
		method:'POST',
		headers:{
			"Content-Type":"application/json"
		},
		body:JSON.stringify(data)
	})
	
	const resData = await response.json();
	
	return resData;
}


export async function sendSignInData(data) {
	const response = await fetch(`${API_URL}/signIn`, {
		method:'POST',
		headers:{
			"Content-Type":"application/json"
		},
		body:JSON.stringify(data)
	})
	
	const resData = await response.json();

	console.log(resData)
	
	return resData;
}
// export async  function fetchQuestions(){
// 	const response = await fetch("http://localhost:3000/questions");
// 		const data = await response.json();
// 		console.log(data);

// 		if (!response.ok) {
// 			throw new Error(`HTTP error! Status: ${response.status}`);
// 		}

// 		return data;
	
// }

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


// export async function getSignInData() {
// 	const response = await fetch(`${API_URL}/retrieve`)

// 	if (!response.ok) {
// 		const error = new Error('An error occurred while fetching the events');
// 		error.code = response.status;
// 		error.info = await response.json();
// 		throw error;
// 	  }
	  
// 	const data = await response.json();
// 	return data; 
	  
// }