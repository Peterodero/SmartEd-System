import { Link, useNavigate } from "react-router-dom";
import FormInput from "./FormInput";
import { useState } from "react";

// import { isEmail, /*isNotEmpty,*/ hasMinLength } from '../util/validation.js';
import useInput from "../hooks/useInput.js";
import { useMutation } from "@tanstack/react-query";
import { sendSignInData } from "../util/http.js";


export default function Login() {

	const navigate = useNavigate();
 
	const { mutate } = useMutation({
		mutationFn: sendSignInData,
		onSuccess: (data) => {
			localStorage.setItem("token", data.token);
			localStorage.setItem('userId', data.userId);
			localStorage.setItem("userName", data.name);
			localStorage.setItem("role", data.role)
			if (data.role === "student") {
				navigate("/student");
			} else if (data.role === "lecturer") {
				navigate("/lecturer");
			}
		},
		onError: (error) => {
		console.error("failed to sign In", error);
		// Handle errors (e.g., show a message)
		}
	})

	const {  handleLoginChange,
		  handleLoginBlur,
		  loginFormData,
		  loginEmailIsInvalid: emailIsInvalid ,
		  loginPasswordIsInvalid: passwordIsInvalid,
		   handleValidateSignIn,
		   content } = useInput()

	function handleSubmitLogin(event) {
		event.preventDefault();

		handleValidateSignIn()

		const signInData = {
			email: loginFormData.email,
			password: loginFormData.password,
		  };

		console.log(signInData) 
		mutate(signInData)

		const haveAccount = sendSignInData();

	}

	return (
		<div className="sign flex flex-column gap-2 mt-2">
			<h1><b>Hi, Welcome back to SmartEd</b></h1>
			{/* <h2 className="text-xl"><b>Login to Continue</b></h2> */}
			<p className="text-lg"><b>Please fill in your details to log in!</b></p>
			<form className='loginForm w-full' onSubmit={handleSubmitLogin}>

				<FormInput
					type="email"
					name="email"
					placeholder="Student Email"
					id="email"
					label="Username:"
					onChange={handleLoginChange}
					onBlur={() => handleLoginBlur('email')}
					value={loginFormData.email}
					error={emailIsInvalid && 'Please enter a valid email address'}
				
				/>
				<FormInput
					type="password"
					name="password"
					placeholder="Password"
					id="password"
					label="Password:"
					onChange={handleLoginChange}
					onBlur={() => handleLoginBlur('password')}
					value={loginFormData.password}
					error={passwordIsInvalid && 'Please enter a valid password'}
				
				/>

				<p className="inputError">{content}</p>

				<div>
					<button  className="submit">Sign In</button>
				</div>

			</form>
			<Link to='/forgotPassword'>Forgot Password?</Link>
			<p>Do not have an account?  <Link to='/signUp'> Sign Up</Link> Or Proceed <Link to="/">Home</Link></p>
		</div>
	)
}