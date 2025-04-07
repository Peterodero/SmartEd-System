import { useState } from "react"
import { hasMinLength, isEmail, isEqualsToOtherValue } from "../util/validation";

export default function useInput(){
	
	const [loginFormData, setLoginFormData] = useState({
		email: "",
		password: ""
	});
	const [signUpFormData, setSignUpFormData] = useState({	
			name:"",
			email:"",
			firstPassword:"",
			secondPassword:"",	
			role: "student"
		},
		)
	const [content, setContent] = useState('');
	
	const [didEdit,setDidEdit] = useState({
		email: false,
		password: false
	})
	const [signUpEdit, setSignUpEdit] = useState({
		name: false,
		email: false,
		firstPassword: false,
		secondPassword:false
	})
	
	// const setContent = defaultValue.setContent


	function handleLoginChange(event){
		setContent("")
		
		setLoginFormData((prevState)=> {
			return{
				...prevState,
				[event.target.name]: event.target.value
			}
		})
		
	}

	
	function handleSignUpChange(event){
		setContent("")
		
		setSignUpFormData((prevState)=> {
			return{
				...prevState,
				[event.target.name]: event.target.value 
			}
		})
		
	}

	function handleLoginBlur(identifier){
		setDidEdit(prevEdit => ({
			...prevEdit,
			[identifier]:true
		}))
	}

	function handleSignUpBlur(identifier){
		setSignUpEdit(prevEdit => ({
			...prevEdit,
			[identifier]:true
		}))
	}

	const nameIsInvalid = !hasMinLength(signUpFormData.name,3) && signUpEdit.name

	const loginEmailIsInvalid = !isEmail(loginFormData.email) && didEdit.email //isNotEmpty(formData.email)
	const signUpEmailIsInvalid = !isEmail(signUpFormData.email) && signUpEdit.email

	const loginPasswordIsInvalid = !hasMinLength(loginFormData.password, 6) && didEdit.password;
	
	const firstPasswordIsInvalid = signUpEdit.firstPassword && !hasMinLength(signUpFormData.firstPassword,6) 
	const secondPasswordIsInvalid = signUpEdit.secondPassword && !hasMinLength(signUpFormData.secondPassword,6)

	let passWordNotMatch =  !isEqualsToOtherValue(signUpFormData.firstPassword, signUpFormData.secondPassword);

	
	function handleValidateSignIn(){
		if (loginEmailIsInvalid || loginPasswordIsInvalid) {
			setContent("Invalid login details")
			return;
		}
	}

	function handleValidateSignUp(){
		if(passWordNotMatch){
			setContent("Passwords do not match")

			// return;
		}
		
	}
	
	return{
		handleLoginChange,
		handleSignUpChange,
		handleLoginBlur,
		handleSignUpBlur,
		loginFormData,
		signUpFormData,
		didEdit,
		content,
		loginEmailIsInvalid,
		nameIsInvalid,
		signUpEmailIsInvalid,
		loginPasswordIsInvalid,
		firstPasswordIsInvalid,
		secondPasswordIsInvalid,
		passWordNotMatch,
		handleValidateSignIn,
		handleValidateSignUp,
	}
}