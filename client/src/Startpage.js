import React, { useState, useEffect } from 'react';
import './Startpage.css';
import { useNavigate } from "react-router-dom";
import logo from './logo/GuessTheCountry.png';
import Modal from 'react-modal';
import countriesGeoJSON from './geodata/custom.geo';
import { InfoPopUp } from "./info-popup";

const Startpage = ({ selectedContinent, setSelectedContinent, numberOfCountries, setNumberOfCountries, setCountryList, time, setTime, score, setScore  }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log("GeoJSON Data:", countriesGeoJSON); // Log the entire GeoJSON data
  }, []);

  useEffect(() => {
    setSelectedContinent('World');
  }, []);

  const dropdownOptions = [
    { value: 'World', label: 'World' },
    { value: 'North America', label: 'North America' },
    { value: 'South America', label: 'South America' },
    { value: 'Europe', label: 'Europe' },
    { value: 'Asia', label: 'Asia' },
    { value: 'Africa', label: 'Africa' },
    { value: 'Oceania', label: 'Oceania' }
  ];

  function filterGeoJsonByContinent(geoJson, selectedContinent) {
    const continents = ['North America', 'South America', 'Europe', 'Asia', 'Africa'];
    let filteredCountries;
    if (selectedContinent === 'World') {
      // Wenn "World" ausgewählt ist, wähle alle Länder aus
      if (geoJson && geoJson.features) {
        filteredCountries = geoJson.features.map(feat => feat.properties.name);
        console.log("Filtered Countries (World):", filteredCountries);
      } else {
        console.error("GeoJSON features not found");
        filteredCountries = [];
      }
    } else {
      // Filtere die Länder nach dem ausgewählten Kontinent
      filteredCountries = geoJson.features.filter(feat =>
        feat.properties.continent === selectedContinent
      ).map(feat => feat.properties.name);
      console.log("Filtered Countries (Continent):", filteredCountries);
    }

    if (filteredCountries.length === 0) {
      console.error("No countries found for the selected continent or world");
      return [];
    }

    let selectedCountries;
    if (filteredCountries.length <= numberOfCountries) {
        selectedCountries = filteredCountries; // Take all countries if available countries are less than or equal to numberOfCountries
    } else {
        // Shuffle array and pick the first `numberOfCountries` elements
        const shuffledCountries = filteredCountries.sort(() => 0.5 - Math.random());
        selectedCountries = shuffledCountries.slice(0, numberOfCountries);
    }
    console.log("Selected Countries after shuffle:", selectedCountries);
    return selectedCountries;
}

  const numberOptions = [10, 15, 20, 25];

  const handleSelectChange = (event) => {
    console.log(event.target.value);
    setSelectedContinent(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumberOfCountries(parseInt(event.target.value, 10));
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const startGame = () => {
      setScore(prevScore => 0);
      setTime(prevTime => 0);
      const countryList = filterGeoJsonByContinent(countriesGeoJSON, selectedContinent);
      console.log("Selected Countries:", countryList); // Log the country list
      setCountryList(countryList); // Set the list of country names
      navigate('/mappage')
  };

  return (
    <div className="App">
      <InfoPopUp></InfoPopUp>
      <div className="logo-container">
        <img src={logo} alt="Guess the Country Logo" className="logo" />
      </div>
      <h2 className="ueberschrift">Select the Game Options</h2>
      <div className="button-container">
        <div className="dropdown-container">
          <select className="dropdown" value={numberOfCountries} onChange={handleNumberChange}>
            {numberOptions.map(number => (
              <option key={number} value={number}>
                {number} Countries
              </option>
            ))}
          </select>
        </div>
        <div className="dropdown-container">
          <select className="dropdown" value={selectedContinent} onChange={handleSelectChange}>
            {dropdownOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <button className="start-button" onClick={startGame}>Start Game</button>
      </div>
    </div>
  );
};

export default Startpage;
