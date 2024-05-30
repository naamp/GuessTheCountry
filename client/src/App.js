import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Startpage from './Startpage';
import Mappage from './Mappage';

function App() {
  const [selectedGameOption, setSelectedGameOption] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Startpage selectedGameOption={selectedGameOption} setSelectedGameOption={setSelectedGameOption} />} />
        <Route path="/mappage" element={<Mappage selectedGameOption={selectedGameOption} />} />
      </Routes>
    </Router>
  );
}

export default App;
