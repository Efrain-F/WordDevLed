
import { useState,useEffect } from "react";
import { AiFillQuestionCircle,AiOutlineAreaChart } from "react-icons/ai";

import { motion, AnimatePresence } from "framer-motion";

import "../../styles/navbar.css"

import HelpManual from "./help";
import Result from "./result";

import { useControllerPageSectionsFunctions } from "../../controllers/PageSectionsController";
import useLocalStorange from "../../hooks/useLocalStorange";
import { useWordActionsContext } from "../../controllers/WordController";

import { useTimerController } from "../../controllers/TimerController";

const NavBar = ()=>{
    const localStorage = useLocalStorange()

    const {showHelpManualFunc,showstaticticalResult,getHelpManual,getStatisticalResult} = useControllerPageSectionsFunctions()


    const {GetEndOfGame} = useWordActionsContext()
    const {stopTimer} = useTimerController()
    
    useEffect(()=>{
        if(GetEndOfGame){
            stopTimer()
        }
    },[GetEndOfGame])

    
    useEffect(()=>{
        if(!localStorage.FirstTimeOnWebsite){
          showHelpManualFunc(true)
          localStorage.MarkFirstTimeOnWebsite()
        }
      },[])

    const showHelpManual = ()=>{
        showHelpManualFunc(true)
    }
    const showStatisticalResult = ()=>{
        showstaticticalResult(true)
    }


    return(
        <motion.header
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
            duration: 0.7
        }}
        className="header">
            <nav className="header-nav">
                <button className="header-nav-icon help" onClick={showHelpManual}><AiFillQuestionCircle/></button>
                <div className="header-nav-icon-text">WORDEVLED</div>
                <button className="header-nav-icon result" onClick={showStatisticalResult}><AiOutlineAreaChart/></button>
            </nav>
            <AnimatePresence>
                {getHelpManual?<HelpManual close={()=>{showHelpManualFunc(false)}}></HelpManual>:undefined}
                {getStatisticalResult?<Result close={()=>{showstaticticalResult(false)}}></Result>:undefined}
            </AnimatePresence>
            
        </motion.header>
    )
}

export default NavBar;