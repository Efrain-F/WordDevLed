
import "../../styles/teclado.css"
import useEventKeyDown from "../../hooks/useEventKeyDown";
import { FiDelete } from "react-icons/fi";

import { LetrasValidas } from "../leetersValidate"

import { motion } from "framer-motion";

import { useWordActionsContext } from "../../controllers/WordController";

const Teclado = ()=>{
    const PrimeraFilaTeclado = LetrasValidas.slice(0,10)
    const SegundaFilaTeclado = LetrasValidas.slice(10,20)
    const TerceraFilaTeclado = LetrasValidas.slice(20,27)

    const {AddLetter,DeleteLetter,EnterWord} = useWordActionsContext()
    useEventKeyDown()

    const EventAddLetter = (letra)=>{
        const letraMayus = letra.target.value
        AddLetter(letraMayus)
    }

    return(
        <motion.ul
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
            duration: 0.7
        }}
        className="teclado">
            <li className="teclado-fila">{PrimeraFilaTeclado.map(key=><button onClick={EventAddLetter} key={key} value={key}>{key}</button>)}</li>
            <li className="teclado-fila">{SegundaFilaTeclado.map(key=><button onClick={EventAddLetter} key={key} value={key}>{key}</button>)}</li>

            <li className="teclado-fila">
                <button onClick={()=>{EnterWord()}} className="enter" value="Enter">ENVIAR</button>
                
                {TerceraFilaTeclado.map(key=><button onClick={EventAddLetter} key={key} value={key}>{key}</button>)}
                
                <button onClick={()=>{DeleteLetter()}} className="borrar" value="Backspace"><FiDelete></FiDelete></button>
            </li>
        </motion.ul>
    )
}
export default Teclado
