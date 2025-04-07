import { useEffect, useRef, useState } from "react";

export default function Verification(){
    const [remainingTime, setRemainingTime] = useState(10000); 
    const [isVisible, setIsVisible] = useState(true);
    const timer = useRef()

    useEffect(()=>{

        if (remainingTime <= 0) {
            setIsVisible(false);
            return;
          }

        timer.current = setInterval(()=>{
            setRemainingTime((prevRemainingTime) => prevRemainingTime - 1000)
           
        }, 1000);

        return () => {
            clearInterval(timer.current);
          };

    }, [remainingTime])

    const time = remainingTime/1000

    return(
        <div  className="flex flex-col items-center gap-4 mt-10 bg-stone-50 ml-25 mr-25 p-6">
            <h1>Reset link sent to your email</h1>
           {isVisible && <p className=" ">{time}</p>} 
        </div>
    )
}