import { Link } from "react-router-dom";

export default function NoExam(){
	return(
		<main className='noExamMain text-xl'>
				<h1 className="m-4"><b>No Ongoing Session</b></h1>
				<p className="m-1">Click <Link to=''>here</Link> to start learning   </p>
				<h2>OR</h2>
				<p>Proceed<Link> here</Link> to view your results</p>
				<p className="m-1">Click <Link to={'/'}>here</Link> to proceed to homepage</p>
		</main>
	)
}  