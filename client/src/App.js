import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Startpage from './Startpage';
import Mappage from './Mappage';
import countriesGeoJSON from './geodata/custom.geo';
import Scorepage from './Scorepage';
import { ErrorPage } from './Errorpage';

function App() {
  const [selectedContinent, setSelectedContinent] = useState('');
  const [numberOfCountries, setNumberOfCountries] = useState(10);
  const [countryList, setCountryList] = useState([]);
  const [time, setTime] = useState(0);
  const [score, setScore] = useState(0);

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
          time = {time}
          setTime = {setTime}
          score = {score}
          setScore = {setScore}
          selectedContinent={selectedContinent}
          numberOfCountries={numberOfCountries}
          countryList={countryList}
          countriesGeoJSON={countriesGeoJSON}
        />} />
      <Route path="/scorepage" element={<Scorepage
          time = {time}
          score = {score}
      />}/>
      <Route path="/*" element={<ErrorPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
