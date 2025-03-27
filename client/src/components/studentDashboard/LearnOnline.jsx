import React from 'react'

const LearnOnline = () => {

    const handleLearn = useCallback(async () => {
                setStartLearning(true);
    
                try {
    
                    const response = await fetch("http://localhost:3000/learn");
                    const data = await response.json();
                    console.log(data)
                
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
    
                } catch (error) {
                    console.error("Error fetching topic of study:", error);
                }
            },[]);

  return (
    <div>
        <h2>Search your topic to study</h2>
        <input type='search'/>
    </div>
  )
}

export default LearnOnline