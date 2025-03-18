import { useNavigate } from "react-router-dom"

import logo from '../assets/quiz-logo.png'

export default function Header(){
	
	const navigate = useNavigate();
	
	function navigateHandler(path){
		navigate(path);
	}
	
	return(
		<div className="header">
			<div className="headerMain">
				<img src={logo} alt="logo"/>
				<h1 className="text-3xl"><b>SmartEd</b></h1>
			</div>
			
			<div className="headerDiv">
				<button onClick={()=>navigateHandler('/signIn')}>Sign In</button>
				<button onClick={()=>navigateHandler('/signUp')}>Sign Up</button>
			</div>
			
		</div>
	)
}