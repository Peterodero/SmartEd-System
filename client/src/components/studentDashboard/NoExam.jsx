import { Link } from "react-router-dom";
import { FaGraduationCap } from 'react-icons/fa'; // Import graduation cap icon

export default function NoExam() {
  return (
    <main className='noExamMain' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', marginBottom: '2em' }}>
        <h1 style={{ fontSize: '2.5em', fontWeight: 'bold', color: 'forestgreen', marginBottom: '0.5em' }}>
          <FaGraduationCap style={{ marginRight: '0.5em' }} /> Welcome to Your Learning Journey!
        </h1>
        <p style={{ fontSize: '1.6em', color: 'royalblue', lineHeight: '1.6' }}>
          The tech world evolves daily. Stay ahead with course recommendations tailored to your goals and interests.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5em', marginTop: '2em' }}>
        <p className="m-1" style={{ fontSize: '1.1em' }}>
          Click <Link to='newExam' style={{ fontWeight: 'bold', color: 'darkblue', padding: '0.3em 0.6em', borderRadius: '5px', backgroundColor: 'lightblue' }}>here</Link> to start learning
        </p>
        <h2 style={{ marginBottom: '0' }}>OR</h2>
        <p style={{ fontSize: '1.1em' }}>
          Proceed <Link to={'viewResults'} style={{ fontWeight: 'bold', color: 'darkblue', padding: '0.3em 0.6em', borderRadius: '5px', backgroundColor: 'lightblue' }}>here</Link> to view your results
        </p>
        <p className="m-1" style={{ fontSize: '1.1em' }}>
          Click <Link to={'/'} style={{ fontWeight: 'bold', color: 'darkblue', padding: '0.3em 0.6em', borderRadius: '5px', backgroundColor: 'lightblue' }}>here</Link> to proceed to homepage
        </p>
        <p className="mt-4">Need help? Click here for <Link to="studentHelp">help</Link></p>
      </div>
    </main>
  );
}