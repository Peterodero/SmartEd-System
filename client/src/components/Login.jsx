import { Link, useNavigate } from "react-router-dom";
import FormInput from "./FormInput";
import useInput from "../hooks/useInput.js";
import { useMutation } from "@tanstack/react-query";
import { sendSignInData } from "../util/http.js";

let contentLog;

export default function Login() {
  const navigate = useNavigate();

  const {
    mutate,
    isLoading,
  } = useMutation({
    mutationFn: sendSignInData,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("userName", data.name);
      localStorage.setItem("role", data.role);

      if (data.role === "student") {
        navigate("/student");
      } else if (data.role === "lecturer") {
        navigate("/lecturer");
      } else if (data.role === "admin") {
        navigate("/admin");
      }
    },
    onError: (error) => {
      contentLog = <p className="text-red-600">Wrong credentials. Try creating an account</p>;
      console.error("failed to sign In", error);
    },
  });

  const {
    handleLoginChange,
    handleLoginBlur,
    loginFormData,
    loginEmailIsInvalid,
    loginPasswordIsInvalid,
    content,
    handleValidateSignIn,
  } = useInput();

  function handleSubmitLogin(event) {
    event.preventDefault();

    // Check for email validation error
    if (loginEmailIsInvalid) {
      setContent("Please enter a valid email");
      return;
    }

    handleValidateSignIn();

    const signInData = {
      email: loginFormData.email,
      password: loginFormData.password,
    };

    console.log(signInData);
    mutate(signInData);
  }

  return (
    <div className="sign flex flex-column gap-2 mt-2">
      <h1><b>Hi, Welcome back to SmartEd</b></h1>
      <p className="text-lg"><b>Please fill in your details to log in!</b></p>

      <form className="loginForm w-full" onSubmit={handleSubmitLogin}>
        <FormInput
          type="email"
          name="email"
          placeholder="User Email"
          id="email"
          label="Email:"
          onChange={handleLoginChange}
          onBlur={() => handleLoginBlur("email")}
          value={loginFormData.email}
          error={loginEmailIsInvalid && "Please enter a valid email"} 
        />

        <FormInput
          type="password"
          name="password"
          placeholder="Password"
          id="password"
          label="Password:"
          onChange={handleLoginChange}
          onBlur={() => handleLoginBlur("password")}
          value={loginFormData.password}
          error={loginPasswordIsInvalid && "Please enter a valid password"}
        />

        <p className="inputError">{content}</p>

        {contentLog}

        <div>
          <button className="submit" type="submit" disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="loader w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </div>
      </form>

      <Link to="/forgotPassword">Forgot Password?</Link>
      <p>
        Do not have an account? <Link to="/signUp"> Sign Up</Link> Or Proceed <Link to="/">Home</Link>
      </p>
    </div>
  );
}
