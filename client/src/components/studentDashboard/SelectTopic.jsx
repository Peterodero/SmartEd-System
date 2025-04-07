import { useState } from "react";

const topics = ['Calculus', 'Programming', 'Networking', 'Computer Hardware', 'Database'];

const SelectedTopic = ({handleStartQuiz}) => {
  const [selectedTopic, setSelectedTopic] = useState(null);

  return (
    <div className=" mx-auto pt-6 pb-6 pl-10 pr-10 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Select a Topic</h2>
      <div className=" flex gap-1.5">
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => setSelectedTopic(topic)}
            className={`block w-full text-left px-4 py-2 rounded-md transition-colors 
              ${
                selectedTopic === topic
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
          >
            {topic}
          </button>
          
        ))}
      </div>

      {selectedTopic && (
        <p className="mt-4 text-lg font-medium">
          Selected Topic: <span className="text-blue-600">{selectedTopic}</span>
        </p>
        
      )}
      {selectedTopic && <button onClick={()=>handleStartQuiz(selectedTopic)}>Search</button>}
    </div>
  );
};

export default SelectedTopic;
