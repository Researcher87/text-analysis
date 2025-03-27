import './App.scss';

import Switch from "react-bootstrap/Switch";
import {BrowserRouter, Navigate, Route, Router, Routes} from 'react-router-dom'

import Header from './components/Header';
import { LanguageProvider } from './context/LanguageContext';
import { PATH_ANALYSIS, PATH_HOME, PATH_IMPORT } from './constants/Paths';
import Home from './components/Home';
import Import from './components/Import';
import Analysis from './components/Analysis';

function App() {
  return (
      <div className="App">
          <LanguageProvider>
            <Header/>
            <Routes>
              <Route path={"/"} element={<Navigate to={PATH_HOME} replace={true} />}/>
              <Route path={PATH_HOME} Component={Home}/>
              <Route path={PATH_IMPORT} Component={Import}/>
              <Route path={PATH_ANALYSIS} Component={Analysis}/>
            </Routes>
          </LanguageProvider>
      </div>
  );
}

export default App;
