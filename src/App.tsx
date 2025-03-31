import './App.scss';

import Header from './components/Header';
import { LanguageProvider } from './context/LanguageContext';
import { PATH_ANALYSIS, PATH_HOME, PATH_IMPORT, PATH_TOOLS } from './constants/Paths';
import Home from './components/Home';
import Import from './components/Import';
import Analysis from './components/Analysis';
import { Navigate, Route, Routes } from 'react-router';
import Tools from './components/Tools';

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
              <Route path={PATH_TOOLS} Component={Tools}/>
            </Routes>
          </LanguageProvider>
      </div>
  );
}

export default App;
