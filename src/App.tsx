import './App.scss';
import Header from './components/Header';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
      <div className="App">
          <LanguageProvider>
            <div>
              <Header/>
            </div>
          </LanguageProvider>
      </div>
  );
}

export default App;
