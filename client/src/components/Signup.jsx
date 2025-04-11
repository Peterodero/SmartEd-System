import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import FormInput from "./FormInput";
import useInput from "../hooks/useInput";
import { sendSignUpData } from "../util/http";

export default function SignUp() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    handleSignUpChange,
    handleSignUpBlur,
    signUpFormData,
    signUpEmailIsInvalid: emailIsInvalid,
    nameIsInvalid,
    firstPasswordIsInvalid,
    secondPasswordIsInvalid,
    passWordNotMatch,
    content,
    handleValidateSignUp,
  } = useInput();

  const { mutate } = useMutation({
    mutationFn: sendSignUpData,
    onSuccess: () => {
      setLoading(false);
      navigate("/signIn");
    },
    onError: (error) => {
      setLoading(false);
      setErrorMessage(error.message || "Account already exists. Please try again.");
    },
  });

  function handleSubmit(event) {
    event.preventDefault();
    handleValidateSignUp();

    if (
      nameIsInvalid ||
      emailIsInvalid ||
      firstPasswordIsInvalid ||
      secondPasswordIsInvalid ||
      passWordNotMatch
    ) {
      return;
    }

    const signUpData = {
      name: signUpFormData.name,
      email: signUpFormData.email,
      password: signUpFormData.firstPassword,
      role: signUpFormData.role,
    };

    setErrorMessage("");
    setLoading(true);
    mutate(signUpData);
  }

  return (
    <div className="sign mt-1">
      <h1><b>Welcome to SmartEd</b></h1>
      <h2 className="mt-1 text-lg"><b>Fill in the details to create an account</b></h2>

      <form className="loginForm w-full mt-2" onSubmit={handleSubmit}>
        <FormInput 
          type="text" 
          name="name" 
          placeholder="Student/Employer name"
          className="inputs"
          id="name"
          label="Enter Username:"
          onChange={handleSignUpChange}
          onBlur={() => handleSignUpBlur("name")}
          value={signUpFormData.name}
          error={nameIsInvalid && "Name must contain at least two words, each starting with a capital letter, using only alphabetic characters"}
        />

        <FormInput 
          type="email" 
          name="email" 
          placeholder="Student/Employer email"
          className="inputs"
          id="email"
          label="Enter Email:"
          onChange={handleSignUpChange}
          onBlur={() => handleSignUpBlur("email")}
          value={signUpFormData.email}
          error={emailIsInvalid && "Email must be lowercase, valid format, and not start with a number"}
        />

        <FormInput
          type="password" 
          name="firstPassword" 
          placeholder="Enter Password"
          className="inputs"
          id="firstPassword"
          label="Enter Password:"
          onChange={handleSignUpChange}
          onBlur={() => handleSignUpBlur("firstPassword")}
          value={signUpFormData.firstPassword}
          error={firstPasswordIsInvalid && "Password must be at least 6 characters"}
        />

        <FormInput
          type="password" 
          name="secondPassword" 
          placeholder="Confirm Password"
          className="inputs"
          id="secondPassword"
          label="Confirm Password:"
          onChange={handleSignUpChange}
          onBlur={() => handleSignUpBlur("secondPassword")}
          value={signUpFormData.secondPassword}
          error={
            secondPasswordIsInvalid
              ? "Password must be at least 6 characters"
              : passWordNotMatch
              ? "Passwords do not match"
              : ""
          }
        />	

        <div className="flex justify-end mt-1">
          <select name="role" value={signUpFormData.role} onChange={handleSignUpChange} className="mb-2 p-1">
            <option value="student">Student</option>
          </select>
        </div>

        <p className="inputError">{content}</p>
        {errorMessage && <p className="text-red-600">Failed! Try signing in</p>}
        
        <div>
          <button type="submit" className="submit flex items-center justify-center gap-2">
            {loading ? (
              <>
                <svg className="w-5 h-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
        </div>
      </form>

      <p className="mt-6">
        Already have an account? <Link to="/signIn">Sign In</Link> Or Proceed <Link to="/">Home</Link>
      </p>
    </div>
  );
}
