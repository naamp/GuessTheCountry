import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Startpage from './Startpage';
import Mappage from './Mappage';

function App() {
  const [selectedGameOption, setSelectedGameOption] = useState('');
  const [numberOfCountries, setNumberOfCountries] = useState(10);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Startpage
          selectedGameOption={selectedGameOption}
          setSelectedGameOption={setSelectedGameOption}
          numberOfCountries={numberOfCountries}
          setNumberOfCountries={setNumberOfCountries}
         />} />
        <Route path="/mappage" element={<Mappage
          selectedGameOption={selectedGameOption}
          numberOfCountries={numberOfCountries}
        />} />
      </Routes>
    </Router>
  );
}

export default App;
