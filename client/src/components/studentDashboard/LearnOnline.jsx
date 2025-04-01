import React, { useState } from 'react'
import OnlineUnits from './Units';
import {useMutation} from "@tanstack/react-query";
import { fetchTopic } from '../../util/http';

const LearnOnline = () => {

    const [message, setMessage] = useState("")
    const [results, setResults] = useState("")


    const { mutate, isLoading, isError, error } = useMutation({
        mutationFn: fetchTopic,
        onSuccess: (data) => {
          setResults(data);
        },
        onError: (error) => {
          setMessage("Topic not found. Please try another.");
        }, 
      });
    

        const handleSubmit = (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            const formObject = Object.fromEntries(formData);
            if (!formObject.topic.trim()) {
                setMessage("Please enter a topic.");
                return;
              }

              console.log(formObject.topic)
              mutate(formObject)

              console.log("data is" + results)

        };



  return (
    <div>
        <form onSubmit={handleSubmit} className='mb-4'>
            <h2 className='mt-6 mb-2'>Search unit to study</h2>
            <div className='flex'>
                <input type='search' name='topic' placeholder='Enter topic' className='search border rounded pt-6 mr-2'/>
                <button>Search</button>
            </div>
        </form>
        {isLoading && <p>Loading...</p>}
        {message && <p>{message}</p>}
        <OnlineUnits/>
    </div>
  )
}

export default LearnOnline