import { useRef, useState } from "react";
import FormInput from "./FormInput";
import useInput from "../hooks/useInput";
import { Link } from "react-router-dom";

export default function ForgotPassword(){

    const [enteredEmail, setEnteredEmail] = useState(null);

    const userEmail = useRef()

    const { handleChange: handleLoginChange, handleBlur: handleLoginBlur, formData, didEdit } = useInput({
            email: "",
         
        },
            {
                email: false,
                password: false
            }
        )

    function handleSubmit(event){
        event.preventDefault();
        setEnteredEmail(userEmail.current.value)
    }

    return(
        <div className="flex flex-col items-center gap-4 mt-10">
            <h1><b>Forgot Password</b></h1>
            <p>Please enter your email to reset your password</p>
           <form onSubmit={handleSubmit} className="flex flex-col gap-3 items-center bg-gray-100 mb-3 rounded p-3 w-1/2">

            <label htmlFor="email" className="text-xl"><b>Username</b></label>
			<input
				id="email"
				className={`p-3 bg-transparent  border border-gray-400 rounded w-2/3`}
				placeholder=" Enter your username or email"
				type="email"
				name="email"
                onBlur={() => handleLoginBlur('email')}
				required/>

                <button className="w-2/3 p-3 rounded">Submit</button>
           </form> 
              
           <Link to="/signUp">Back to Login</Link>

        </div>
    )
}