import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from './pages/Landing/LandingPage';
import Header from './components/header/Header';
import EarningPage from './pages/Earning/EarningPage';
import { useEffect } from 'react';
function App() {
  useEffect(() => {
    document.onreadystatechange = function () {
      if (document.readyState === "complete") {
        document.getElementById("PreLoaderBar").style.display = "none";
      }
    }
  }, []);
  return (
    <div className="App">
      <Router>
        <Header />
        <div className='progress' id='PreLoaderBar'>
          <div className='indeterminate' />
        </div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/videoInfo" element={<EarningPage />} />
          {/* <Route path="/test" element={<Test />} /> */}
          {/* <Route path="/submit" element={<Final />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
