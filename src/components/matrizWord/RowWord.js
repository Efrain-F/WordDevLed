import { useEffect, useState } from "react";
import LetterWord from "./WordLetter";
import { useWordActionsContext } from "../../controllers/WordController";

import { AnimatePresence } from "framer-motion";

// validateWord por defecto es falso, sera true si la palabra fue enviada (cuando de enter)
const RowWord = ({word,validateWord,GuessWord,Limitletter})=>{
    const {ValidateLetterToWord} = useWordActionsContext()
    const [letterOfWordEntered , setLetterOfWordEntered] = useState(new Array(Limitletter).fill("",0,Limitletter))
    const [listEstatesOfLettersOfWord,setListEstatesOfLettersOfWord] = useState(new Array(Limitletter))

    // rellenar los espacion vacios para completar la fila 
    useEffect(()=>{
        const letterOfWord = word.split("")
        const listLetterOfwordEnteredAux = new Array(Limitletter).fill("",0,Limitletter)
        letterOfWord.forEach((element,id) => {
            listLetterOfwordEnteredAux[id]=element
        });
        setLetterOfWordEntered(listLetterOfwordEnteredAux)
    },[word])
    // obtener el estado de cada letra solo si validateword == true
    useEffect(()=>{
        if(validateWord){setListEstatesOfLettersOfWord(ValidateLetterToWord(word,GuessWord))}
    },[validateWord])



    // porque afuera se ve feo 
    const EmptyWordLetter = ({estado})=>{
        return(
            <div
                className={estado+" matriz-row-item empty"} >
            </div>
        )
    }


    return(
        <li className="matriz-row">
            <AnimatePresence>
               {letterOfWordEntered.map((letter,id)=>{
                return letter!=""?<LetterWord letter={letter} estado={listEstatesOfLettersOfWord[id]} key={id}></LetterWord>:<EmptyWordLetter key={id} estado={listEstatesOfLettersOfWord[id]}></EmptyWordLetter>
               })}
            </AnimatePresence>
        </li>
    )
}

export default RowWord