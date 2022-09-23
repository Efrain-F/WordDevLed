import { useEffect } from "react"
import { LetrasValidas } from "../components/leetersValidate"
import { useWordActionsContext } from "../controllers/WordController"

const useEventKeyDown = ()=>{

    const {AddLetter,EnterWord,DeleteLetter} = useWordActionsContext()

    const validarAndAgregarLetra = (key)=>{
        let caracterSeleccionada = key.key

        if(caracterSeleccionada == "Enter"){
            EnterWord()
        }else if (caracterSeleccionada == "Backspace"){
            DeleteLetter()
        }else{
            let letraMayuscula = caracterSeleccionada.toUpperCase()
            if(LetrasValidas.includes(letraMayuscula)){
                AddLetter(letraMayuscula)
            }
        }

    }
    
    useEffect(()=>{
        window.addEventListener("keydown",validarAndAgregarLetra)
        return ()=>{
            window.removeEventListener("keydown",validarAndAgregarLetra)
            }
        }
    )
}
export default useEventKeyDown



