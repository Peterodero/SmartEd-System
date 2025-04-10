import React, { forwardRef } from 'react'
import {createPortal} from 'react-dom'

const ResultModal = forwardRef(({ finalScore }, ref) => {

  let content;

  if(finalScore < 30){
    content = <h1 className="text-2xl font-bold text-gray-900">Fail</h1>
  }
  if(finalScore >=30 && finalScore <= 40){
    content = <h1 className="text-2xl font-bold text-gray-900">Fair</h1>
  }
  if(finalScore > 40 && finalScore < 70){
    content = <h1 className="text-2xl font-bold text-gray-900">Very Good</h1>
  }
  if(finalScore >= 70 && finalScore <= 100){
    content = <h1 className="text-2xl font-bold text-gray-900">Excellent</h1>
  }

  return createPortal(
    <dialog ref={ref} className='dialog p-4 w-2/3 ml-55 mt-64 rounded shadow-lg text-center'> 
      {content}
      <div className="mt-2 text-lg text-gray-700">You scored: {finalScore}</div>
      <form method="dialog" className='mt-4'>
        <button className="px-4 py-2  text-white rounded-md transition">Close</button>
      </form>
    </dialog>,
    document.getElementById('modal')
  );
});

export default ResultModal;
