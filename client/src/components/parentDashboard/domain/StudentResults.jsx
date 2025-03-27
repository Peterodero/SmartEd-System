import { useState, useEffect } from 'react';
import '../styles/StudentResults.css';

const StudentResults = ({ user }) => {
  const [results, setResults] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedTerm, setSelectedTerm] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // This will be an API call to fetch the student's results
  
  useEffect(() => {
    const fetchStudentResults = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/results/${user?.studentId}`); // Will Replace with our API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch student results');
        }
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error fetching results:', error);
        // Handle error (e.g., display an error message)
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.studentId) {
      fetchStudentResults();
    } else {
      setIsLoading(false);
      console.warn("User student Id is not available");
    }
  }, [user?.studentId]);

  const filteredResults = results.filter((result) => {
    return (
      (selectedSubject === 'all' || result.subject === selectedSubject) &&
      (selectedTerm === 'all' || result.term === selectedTerm)
    );
  });

  const subjects = ['all', ...new Set(results.map((result) => result.subject))];
  const terms = ['all', ...new Set(results.map((result) => result.term))];

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return '#4CAF50';
    if (grade.startsWith('B')) return '#2196F3';
    if (grade.startsWith('C')) return '#FF9800';
    return '#F44336';
  };
  
  return (
    <div className="results-container">
      <h1>Student Academic Results</h1>
      <p className="student-name">Student: {user?.studentName}</p>
      
      <div className="filters">
        <div className="filter-group">
          <label htmlFor="subject-filter">Subject:</label>
          <select 
            id="subject-filter" 
            value={selectedSubject} 
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            {subjects.map(subject => (
              <option key={subject} value={subject}>
                {subject === 'all' ? 'All Subjects' : subject}
              </option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="term-filter">Term:</label>
          <select 
            id="term-filter" 
            value={selectedTerm} 
            onChange={(e) => setSelectedTerm(e.target.value)}
          >
            {terms.map(term => (
              <option key={term} value={term}>
                {term === 'all' ? 'All Terms' : term}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {isLoading ? (
        <p className="loading">Loading results...</p>
      ) : (
        <>
          <div className="results-summary">
            <div className="summary-card">
              <h3>Average Score</h3>
              <p className="summary-value">
                {filteredResults.length ? 
                  (filteredResults.reduce((sum, result) => sum + result.score, 0) / filteredResults.length).toFixed(1) : 
                  'N/A'}
              </p>
            </div>
            <div className="summary-card">
              <h3>Highest Score</h3>
              <p className="summary-value">
                {filteredResults.length ? 
                  Math.max(...filteredResults.map(result => result.score)) : 
                  'N/A'}
              </p>
            </div>
            <div className="summary-card">
              <h3>Lowest Score</h3>
              <p className="summary-value">
                {filteredResults.length ? 
                  Math.min(...filteredResults.map(result => result.score)) : 
                  'N/A'}
              </p>
            </div>
          </div>
          
          <div className="results-table-container">
            <table className="results-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Term</th>
                  <th>Score</th>
                  <th>Grade</th>
                  <th>Comments</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.length ? (
                  filteredResults.map(result => (
                    <tr key={result.id}>
                      <td>{result.subject}</td>
                      <td>{result.term}</td>
                      <td>{result.score}/100</td>
                      <td>
                        <span 
                          className="grade-badge" 
                          style={{ backgroundColor: getGradeColor(result.grade) }}
                        >
                          {result.grade}
                        </span>
                      </td>
                      <td>{result.comments}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-results">No results match your filters</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentResults;