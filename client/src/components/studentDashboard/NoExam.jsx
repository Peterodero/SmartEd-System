import { Link } from "react-router-dom";

export default function NoExam(){
	return(
		<main className='noExamMain text-xl'>
				
				<p className="mt-4 mb-3">Proceed<Link to="viewResults"> here</Link> to view your results</p>
				<p className="m-1">Click <Link to={'/'}>here</Link> to proceed to homepage</p>
				<p className="mt-4">Need help?Click here for <Link to="studentHelp">help</Link></p>
		</main>
	)
}  