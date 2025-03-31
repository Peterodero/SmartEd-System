import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import {useMutation} from "@tanstack/react-query";

import FormInput from "./FormInput";
import useInput from "../hooks/useInput";
import { sendSignUpData } from "../util/http";

export default function SignUp(){
	
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState("");
	
	const {handleSignUpChange,
		handleSignUpBlur,
		signUpFormData,
		signUpEmailIsInvalid: emailIsInvalid,
		firstPasswordIsInvalid,
		secondPasswordIsInvalid,
		passWordNotMatch,
		content,
		handleValidateSignUp} = useInput();
	
	const {mutate} = useMutation({
		mutationFn: sendSignUpData,
		onSuccess: () => {
			// Navigate to login page after successful signup
			navigate('/signIn');
		  },
		onError: (error) => {
			setErrorMessage(error.message || "Account already exist. Please try again.");
		// Handle errors (e.g., show a message)
		}
	})
	
	
	 function handleSubmit(event){
		event.preventDefault(); 
		
		handleValidateSignUp()
		if(passWordNotMatch){
			return;
		}

		const signUpData = {
			email: signUpFormData.email,
			password: signUpFormData.firstPassword,
		  };
		  console.log(signUpData)

		  setErrorMessage("");
		mutate(signUpData);
		
	 }
	 
	 
	return(
		<div className="sign mt-2"> 
			<h1><b>Welcome to SmartEd</b></h1>
			<h2 className="mt-1.5 text-lg"><b>Fill in the details to create an account</b></h2>
			
			<form className="loginForm w-full mt-3" onSubmit={handleSubmit}>
				
				<FormInput 
					type="email" 
					name="email" 
					placeholder="Student/Employer email"
					className="inputs"
					id="email"
					label="Enter Username:"
					onChange={handleSignUpChange}
					onBlur={() => handleSignUpBlur('email')}
					value={signUpFormData.signUpEmail}
					error={emailIsInvalid && "Please input the correct email address"}
				
				 />
				<FormInput
					type="password" 
					name="firstPassword" 
					placeholder="Enter Password"
					className="inputs"
					id="firstPassword"
					label="Enter Password:"
					onChange={handleSignUpChange}
					onBlur={() => handleSignUpBlur('firstPassword')}
					value={signUpFormData.firstPassword}
					error={firstPasswordIsInvalid && "Please input the correct password"}
					
				/>
					
				<FormInput
					type="password" 
					name="secondPassword" 
					placeholder="Confirm Password"
					className="inputs"
					id="secondPassword"
					label="Confirm Password:"
					onChange={handleSignUpChange}
					onBlur={() => handleSignUpBlur('secondPassword')}
					value={signUpFormData.secondPassword}
					error={secondPasswordIsInvalid && "Please input the correct password"}
					/>	
				
				<p className="inputError">{content}</p>
				 {errorMessage && <p className="text-red-600">{errorMessage}</p>}
				<div>
					<button type="submit" className="submit">Register</button>
				</div>
				
			</form>

			<p className="mt-6">Already have an account? <Link to="/signIn">Sign In</Link> Or Proceed <Link to="/">Home</Link></p>
		</div>
	)
}