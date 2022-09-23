




const useLocalStorange = ()=>{


    function FirstTimeOnWebsite (){
        return localStorage.getItem("FirstTimeOnWebsite")?true:false
    }
    function MarkFirstTimeOnWebsite (){
        localStorage.setItem("FirstTimeOnWebsite",true)
    }


    function addPlaysMade (){
        const playsMade = parseInt(localStorage.getItem("playsMade"))
        localStorage.setItem("playsMade",playsMade+1)
    }
    function addVictories (){
        const victories = parseInt(localStorage.getItem("victories"))
        localStorage.setItem("victories",victories+1)
    }

    function getPlaysMade (){
        if(localStorage.getItem("playsMade")){
            return localStorage.getItem("playsMade")
        }else{
            localStorage.setItem("playsMade",0)
            return 0
        }
    }
    function getVictories (){
        if(localStorage.getItem("victories")){
            return localStorage.getItem("victories")
        }else{
            localStorage.setItem("victories",0)
            return 0
        }
    }


    const functionsLocalStorange = {
        "FirstTimeOnWebsite":FirstTimeOnWebsite(),
        "MarkFirstTimeOnWebsite":()=>{MarkFirstTimeOnWebsite()},
        "addPlaysMade":()=>{addPlaysMade()},
        "addVictories":()=>{addVictories()},
        "getPlaysMade":getPlaysMade(), 
        "getVictories": getVictories()
    }



    return functionsLocalStorange
    
}


export default useLocalStorange;





