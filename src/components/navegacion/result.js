import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

import useLocalStorange from "../../hooks/useLocalStorange";
import { useWordActionsContext } from "../../controllers/WordController";
import { useTimerController } from "../../controllers/TimerController";

import { motion } from "framer-motion";

const ResultGraphic = ({listGraphic})=>{
    useEffect(()=>{
    },[listGraphic])
    const Row = ({cont})=>{
        return(
            <div className="result-graphic-row">
                {cont.map((item,id)=><p key={id} className={item+" result-graphic-row-item"}></p>)}
            </div>
        )
    }
    return(
        <>
            <div className="result-graphic">
                {listGraphic.map((row,id)=><Row key={id} cont={row}></Row>)}
            </div>
            <p>Resultado</p>
        </>
    )
}

const Result = ({close})=>{
    const localStorage = useLocalStorange()
    function CloseResult (){close()}
    
    const {getTimer} = useTimerController()
    const {GetListEstatesOfLettersOfWord,GetYouWinner,GetYouLost,GetWordToGuess} = useWordActionsContext()
    return(
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1}}
        transition={{
            duration: 0.4,
            ease:"easeInOut",
        }}
        exit={{ opacity: 0 }}
        className="section-nav">
            <section className="section-navBar">
                <header className="header-section">
                    <h2>Stadisticas</h2>
                    <button className="close-section-page" onClick={CloseResult}><AiOutlineClose/></button>
                </header>
                <main className="main-section">
                    <section className="estadisticas">    
                        <div>
                            <h2>{localStorage.getPlaysMade}</h2>
                            <p>Jugadas hechas</p>
                        </div>
                        <div>
                            <h2>{localStorage.getVictories}</h2>
                            <p>Visctorias</p>
                        </div>
                    </section>
                    <h2 className="WinnerOrLost" style={{background:GetYouWinner?"#84a98c":GetYouLost?"#4a4e69":undefined}}>{GetYouWinner?"Ganaste":GetYouLost?"Perdiste":undefined}</h2>

                    {GetYouWinner||GetYouLost?<div className="WordToGuess"><h3>{GetWordToGuess}</h3><p>Palabra a adivinar</p></div>:undefined}
                    
                    <section className="result">
                        <div className="result-time result-item">
                            <h3>{getTimer[2]}:{getTimer[1]}:{getTimer[0]}</h3>
                            <p>Tiempo</p>
                        </div>
                        <div className="result-graphic result-item">
                            <ResultGraphic listGraphic={GetListEstatesOfLettersOfWord()}></ResultGraphic>
                        </div>
                    </section>
                </main>
            </section>
        </motion.div>
    )
}

export default Result;