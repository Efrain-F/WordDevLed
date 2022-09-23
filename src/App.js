// STYLES
import './App.css';

// CONTROLLER Context
import WordController from './controllers/WordController';
import ControllerPageSections from './controllers/PageSectionsController';
import TimerController from './controllers/TimerController';

// COMPONENTS
import NavBar from './components/navegacion/NavBar';
import MatrizWord from './components/matrizWord/MatrizWord';
import Teclado from './components/tecladoTemplate/teclado';
import { useEffect } from 'react';


function App() {



  return (
    <div className="App">
      <ControllerPageSections>
        <WordController>

          <TimerController>
            <NavBar></NavBar>
          </TimerController>
          
          <MatrizWord></MatrizWord>
          <Teclado></Teclado>

        </WordController>
      </ControllerPageSections>
    </div>
  );
}

export default App;
