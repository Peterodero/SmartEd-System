import { useNavigate } from "react-router-dom"
import logo from '../assets/quiz-logo.png'


export default function Description(){
	
	const navigate = useNavigate();
	
	function navigateHandler(){
		navigate('signUp')
	}
	
	return(
		<main>
			<div className="main mb-8">
				<img src={logo} alt="logo"/>
				<h2 className="text-lg "><b>SmartEd</b></h2>
			</div>
			<div className="main2 p-3 text-lg">
				<h1><b>The best learning platform</b></h1>
				<h2><b>Made for work designed to love</b></h2>
				<p>You can proceed with get started to register in this admirable platform to do exams for free</p>
			
			</div>
			
			<button onClick={navigateHandler}>Get Started </button>
		</main>
	)
}