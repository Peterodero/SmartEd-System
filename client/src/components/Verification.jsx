import { useNavigate } from "react-router-dom";

export default function Verification(){

    const navigate = useNavigate()

    function handleLogin(){
        navigate("/signIn")
    }

    return(
        <div  className="flex flex-col items-center gap-4 mt-10 bg-stone-50 ml-25 mr-25 p-6">
            <h1>Reset link sent to your email</h1>
            <p>Click the link sent to update your password and click the below button to login again</p>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}