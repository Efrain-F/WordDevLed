import { createContext, useContext, useState } from "react"



const ControllerPageSectionsFunctions = createContext(); 

export function useControllerPageSectionsFunctions (){return useContext(ControllerPageSectionsFunctions)}

const ControllerPageSections = ({children})=>{

    const [insertHelpManual,setInsertHelpManual] = useState(false)
    const [statisticalResult,setStatisticalResult] = useState(false)
    
    const controllerPage = {
        "showHelpManualFunc":(show)=>{setInsertHelpManual(show)},
        "showstaticticalResult":(show)=>{setStatisticalResult(show)},
        "getHelpManual":insertHelpManual,
        "getStatisticalResult":statisticalResult,
    }

    return(
        <ControllerPageSectionsFunctions.Provider value={controllerPage}>
            {children}
        </ControllerPageSectionsFunctions.Provider>
    )
}
export default ControllerPageSections















