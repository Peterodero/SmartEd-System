import { useNavigate, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function Verification(){

    const navigate = useNavigate()
    const [remainingTime, setRemainingTime] = useState(10000); 
    const [isVisible, setIsVisible] = useState(true);
    const [formData, setFormData] = useState({
        firstPassword: "",
        secondPassword: ""
      });
    
    const [didEdit, setDidEdit] = useState({
        firstPassword: false,
        secondPassword: false
      });
    
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const timer = useRef()

    useEffect(()=>{

        if (remainingTime <= 0) {
            setIsVisible(false);
            return;
          }

        timer.current = setInterval(()=>{
            setRemainingTime((prevRemainingTime) => prevRemainingTime - 1000)
           
        }, 1000);

        return () => {
            clearInterval(timer.current);
          };

    }, [remainingTime])
    
      const token = localStorage.getItem('token');
    
      function handleBlur(identifier) {
        setDidEdit(prevEdit => ({
          ...prevEdit,
          [identifier]: true
        }));
      }
    
      function hasMinLength(value, minLength) {
        return value.length >= minLength;
      }
    
      function handleChange(event) {
        setFormData(prevState => ({
          ...prevState,
          [event.target.name]: event.target.value
        }));
      }
    
      async function handleFormSubmit(event) {
        event.preventDefault();
        setLoading(true);
        setMsg('');
    
        if (formData.firstPassword !== formData.secondPassword) {
          setMsg("Passwords do not match.");
          setLoading(false);
          return;
        }
    
        try {
          const response = await fetch(`http://localhost:3000/reset-password`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              password: formData.firstPassword,
              token: token
            })
          });
    
          const data = await response.json();
    
          if (!response.ok) {
            throw new Error(data.message || 'Invalid or expired token');
          }
    
          setMsg('Password updated successfully!');
          localStorage.removeItem('token');
          setTimeout(() => navigate('/signIn'), 2000);
        } catch (err) {
          setMsg("Failed to update password.Contact an Admin at scientistrockml@gmail.com");
        } finally {
          setLoading(false);
        }
      }
    
      const firstPasswordIsInvalid = !hasMinLength(formData.firstPassword, 6) && didEdit.firstPassword;
      const secondPasswordIsInvalid = !hasMinLength(formData.secondPassword, 6) && didEdit.secondPassword;

    const time = remainingTime/1000

    function handleLogin(){
        navigate("/signIn")
    }

    return(
        <div  className="flex flex-col items-center gap-4 mt-10 bg-stone-50 ml-25 mr-25 p-6">
            <h1>OTP sent to your email</h1>
            <p>Enter the OTP and update your password and click the below button to login again</p>
            {isVisible && <p className=" ">{time}</p>} 

            <form className="resetform w-1/2 flex flex-col gap-4" onSubmit={handleFormSubmit}>
                <div className="resetform-div">
                <label className="block mb-1">Enter New Password</label>
                <input 
                    type="password" 
                    name="firstPassword" 
                    value={formData.firstPassword} 
                    onBlur={() => handleBlur('firstPassword')}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                />
                {firstPasswordIsInvalid && <p className="text-red-500 text-sm mt-1">Password must be at least 6 characters</p>}
                </div>
                <div className="resetform-div">
                <label className="block mb-1">Confirm New Password</label>
                <input 
                    type="password" 
                    name="secondPassword" 
                    value={formData.secondPassword}
                    onBlur={() => handleBlur('secondPassword')} 
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                />
                {secondPasswordIsInvalid && <p className="text-red-500 text-sm mt-1">Password must be at least 6 characters</p>}
                </div>
                <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                disabled={loading}
                >
                {loading ? 'Resetting...' : 'Reset Password'}
                </button>
            </form>
            <p className="mt-4 text-red-600">{msg}</p>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}