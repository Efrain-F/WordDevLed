import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";

import RowWord from "../matrizWord/RowWord"

const HelpManual =({close})=>{

    function CloseHelpManual(){close()}
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
            <section
            className="helpManual section-navBar">
                <header className="header-section">
                    <h2>Como Jugar</h2>
                    <button className="close-section-page" onClick={CloseHelpManual}><AiOutlineClose/></button>
                </header>
                <main className="main-section">
                    <p>
                    Adivina la palabra oculta en cinco intentos.<br/><br/>
                    Cada intento debe ser una palabra válida de 5 letras.<br/><br/>
                    Después de cada intento el color de las letras cambia para mostrar qué tan cerca estás de acertar la palabra.
                    </p>
                    <div className="helpManual-ejemplo">
                        <h3>Ejemplo:</h3>
                        <div className="helpManual-ejemplo-contain">
                            <div>
                                <RowWord GuessWord="ROCAS" Limitletter={5} validateWord={true} word="RUBIS"></RowWord>
                                <p>La letra "R" y "S" está en la palabra y en la posición correcta.</p>
                            </div>
                            <div>
                                <RowWord GuessWord="CHICA" Limitletter={5} validateWord={true} word="PAPEL"></RowWord>
                                <p>La letra "A" está en la palabra pero en la posición incorrecta.</p>
                            </div>
                            <div>
                                <RowWord GuessWord="FRENO" Limitletter={5} validateWord={true} word="CHICA"></RowWord>
                                <p>La letra "C" y las demas, no está en la palabra.</p>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </motion.div>
    )
}

export default HelpManual;