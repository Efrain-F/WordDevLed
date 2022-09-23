import { createContext, useContext, useEffect, useState } from "react";


const timerControllerContext = createContext()

export function useTimerController(){return useContext(timerControllerContext)}

const TimerController = ({children})=>{
    const [seconds,setSeconds] = useState(0);
    const [minutes,setMinutes] = useState(0);
    const [hours,setHours] = useState(0);

    var timer;

    useEffect(()=>{
        timer = setInterval(()=>{
            setSeconds(s => s+1)
            if(seconds==59){
                setMinutes(minutes+1)
                setSeconds(0)
            }
            if(minutes==59){
                setHours(hours+1)
                setMinutes(0)
            }
        },1000)
        return ()=>clearInterval(timer)
    })
    const stopTimer = ()=>{
        clearInterval(timer)
    }

    const timerFunctions = {
        // conciente :(
        "getTimer":[seconds,minutes,hours],
        "stopTimer":()=>{stopTimer()},
    }

    return(
        <timerControllerContext.Provider value={timerFunctions}>
            {children}
        </timerControllerContext.Provider>
    )

}


export default TimerController;
