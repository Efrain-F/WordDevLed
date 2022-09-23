import { useEffect, useRef, useState } from "react"

import { motion } from "framer-motion"

const LetterWord = ({letter,estado})=>{
    
    let letterRef = useRef(null)
    const [colorEstado,setColoreStado] = useState("")

    useEffect(()=>{
        if(estado == "adivino"){
            setColoreStado("#84a98c")
        }else if(estado == "cerca"){
            setColoreStado("#c9ada7")
        }else if(estado == "incorrecto"){
            setColoreStado("#4a4e69")
        }
    },[estado])





    return(
        <motion.div
            initial={{ opacity: 0, scale: 0.5}}
            animate={{ opacity: 1, scale: 1,background:colorEstado}}
            transition={{
                duration: 0.2
            }}
            className="matriz-row-item" ref={letterRef}>{letter}
        </motion.div>
    )
}

export default LetterWord