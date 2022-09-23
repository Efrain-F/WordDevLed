import { createContext, useContext, useEffect } from "react"
import { useState } from "react"
import { WordsToGuess } from "../WordsToGuess"

// CONTROLLER Extern
import { useControllerPageSectionsFunctions } from "./PageSectionsController"
import useLocalStorange from "../hooks/useLocalStorange"
// CONTEXT
const WordActionsContext = createContext()
export function useWordActionsContext (){return useContext(WordActionsContext)}
const WordController = ({children})=>{
    const controllerPage = useControllerPageSectionsFunctions()
    const localStorage = useLocalStorange()


    // Parametros
    const LimitOpportunities = 5
    const Limitletter = 5

    const [listOfWordsEntered,setListOfWordsEntered] = useState( new Array(LimitOpportunities).fill("",0,LimitOpportunities) )
    const [attemptsMadeAndWordIndex,setAttemptsMadeAndWordIndex] = useState(0)
    const [youWinner,setYouWinner] = useState(false)
    const [youLost,setYouLost] = useState(false)
    const [listEstatesOfLettersOfWord,setListEstatesOfLettersOfWord] = useState([])
    const [selectWordToGuess,setSelectWordToGuess] = useState("")
    const [endOfGame,setEndOfGame] = useState(false)

    const SelectRandomWord=() => {
        const min = 0
        const max= WordsToGuess.length - 1
        let IndexOfRandomWord = Math.floor((Math.random() * (max - min + 1)) + min);
        setSelectWordToGuess(WordsToGuess[IndexOfRandomWord])
    } // seleccionar palabra a adivinar
    // primer renderizado para definir palabra a adivinar
    useEffect(()=>{
        SelectRandomWord()
    },[])

    function MoreAttemptsThanOpportunities (){
        return attemptsMadeAndWordIndex>=LimitOpportunities?true:false
    }
    // capturar si perdio o gano (fin del juego)
    useEffect(()=>{
        if (MoreAttemptsThanOpportunities() || youWinner){
            if(youWinner){
                localStorage.addVictories()
            }else{
                setYouLost(true)
            }
            setEndOfGame(true)
            controllerPage.showstaticticalResult(true)
            localStorage.addPlaysMade()
        }
    },[attemptsMadeAndWordIndex,youWinner])


    // Acciones del Controlador //
    const wordActions = {
        "AddLetter":(letter)=>{AddLetterToWord(letter)},
        "DeleteLetter":()=>{DeleteLetterToWord()},
        "ValidateLetterToWord":(wordEntered,GuessWord)=>ValidateLettersOfTheWord(wordEntered,GuessWord),
        "EnterWord":()=>{NextNewWordFromListOfWordsEntered()},
        "GetListEstatesOfLettersOfWord":()=>GetListEstatesOfLettersOfWord(),
        "GetListOfWordsEntered":listOfWordsEntered,
        "GetAttemptsMadeAndWordIndex":attemptsMadeAndWordIndex,
        "GetLimitletter":Limitletter,
        "GetWordToGuess":selectWordToGuess,
        "GetEndOfGame":endOfGame,
        "GetYouWinner":youWinner,
        "GetYouLost":youLost,
    }
    function AddLetterToWord (letter){
        if(!MoreAttemptsThanOpportunities() && !youWinner){
            if(listOfWordsEntered[attemptsMadeAndWordIndex].length < Limitletter){
                let listOfWordsEnteredAux = [...listOfWordsEntered]
                listOfWordsEnteredAux[attemptsMadeAndWordIndex] += letter
                setListOfWordsEntered(listOfWordsEnteredAux)
            }
        }
    }
    function DeleteLetterToWord (){
        if(!MoreAttemptsThanOpportunities()){
            let listOfWordsEnteredAux = [...listOfWordsEntered]
            listOfWordsEnteredAux[attemptsMadeAndWordIndex] = listOfWordsEnteredAux[attemptsMadeAndWordIndex].slice(0,-1)
            setListOfWordsEntered(listOfWordsEnteredAux)
        }
    }
    function ValidateLettersOfTheWord (wordEntered,GuessWord){
        if(wordEntered==GuessWord){
            const GG = ["adivino","adivino","adivino","adivino","adivino"]
            setYouWinner(true)
            return GG
        }else{
            let listGuessWord = GuessWord.split("")
            const listWordEntered = wordEntered.split("")
            let estadosWord = []
            listWordEntered.forEach((element,id) => {
                let letterFind = listGuessWord.indexOf(element)
                // si la letra es correcta
                if(id==letterFind){
                    estadosWord[id]="adivino"
                    listGuessWord[id]="-"
                }
                else if(letterFind>=0){estadosWord[id]="cerca"}
                else{estadosWord[id]="incorrecto"}
            });
            return estadosWord
        }
    }
    function NextNewWordFromListOfWordsEntered(){
        if(!MoreAttemptsThanOpportunities()){
            if(listOfWordsEntered[attemptsMadeAndWordIndex].length == Limitletter){
                const wordStateList =  ValidateLettersOfTheWord(listOfWordsEntered[attemptsMadeAndWordIndex],selectWordToGuess)
                setListEstatesOfLettersOfWord([...listEstatesOfLettersOfWord,wordStateList])
                setAttemptsMadeAndWordIndex(attemptsMadeAndWordIndex+1)
            }
        }
    }
    function GetListEstatesOfLettersOfWord(){
        let falta = LimitOpportunities-listEstatesOfLettersOfWord.length
            if(falta>0){
                let listFalta = new Array(falta).fill(["incorrecto","incorrecto","incorrecto","incorrecto","incorrecto"],0,LimitOpportunities)
                let listEstatesOfLettersOfWordAux = listEstatesOfLettersOfWord
                return listEstatesOfLettersOfWordAux.concat(listFalta)
            }
        return listEstatesOfLettersOfWord
    }
    return(
        <WordActionsContext.Provider value={wordActions}>
            {children}
        </WordActionsContext.Provider>
    )
}
export default WordController






