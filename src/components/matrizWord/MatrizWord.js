import RowWord from "./RowWord";
import "../../styles/matriz.css"

import { useWordActionsContext } from "../../controllers/WordController";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";

const MatrizWord = ()=>{
    const {GetListOfWordsEntered,GetAttemptsMadeAndWordIndex,GetLimitletter,GetWordToGuess} = useWordActionsContext()
    const [GuessWord,setGuessWord] = useState(GetWordToGuess)
    useEffect(()=>{
        setGuessWord(GetWordToGuess)
    },[GetWordToGuess])
    
    return(
        <motion.ul 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
            duration: 0.7
        }}
        className="matriz-container">
            {GetListOfWordsEntered.map((word,id) =><RowWord GuessWord={GuessWord} Limitletter={GetLimitletter} validateWord={id<GetAttemptsMadeAndWordIndex} word={word} key={id}></RowWord>)}
            
        </motion.ul>
    )
}
export default MatrizWord;