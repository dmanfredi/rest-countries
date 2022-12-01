import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import CountryPage from './CountryPage';

// AiOutlineSearch

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'light');
  useEffect(() => localStorage.setItem('theme', theme), [theme]);

  return (
    <Router>
      <div className="super-container" data-theme={theme}>
        <Header setTheme={setTheme} theme={theme}></Header>
        <Routes>
          <Route path="/" element={<Main theme={theme}></Main>} />
          <Route
            path="/:country"
            element={<CountryPage theme={theme}></CountryPage>}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
