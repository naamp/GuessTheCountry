import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Startpage from './Startpage';
import Mappage from './Mappage';
import countriesGeoJSON from './geodata/custom.geo';

function App() {
  const [selectedContinent, setSelectedContinent] = useState('');
  const [numberOfCountries, setNumberOfCountries] = useState(10);
  const [countryList, setCountryList] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Startpage
          selectedContinent={selectedContinent}
          setSelectedContinent={setSelectedContinent}
          numberOfCountries={numberOfCountries}
          setNumberOfCountries={setNumberOfCountries}
          setCountryList={setCountryList}
         />} />
        <Route path="/mappage" element={<Mappage
          selectedContinent={selectedContinent}
          numberOfCountries={numberOfCountries}
          countryList={countryList}
          countriesGeoJSON={countriesGeoJSON}
        />} />
      </Routes>
    </Router>
  );
}

export default App;
