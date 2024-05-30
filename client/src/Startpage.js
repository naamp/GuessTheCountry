import React, { useState, useEffect } from 'react';
import './Startpage.css';
import { useNavigate } from "react-router-dom";
import logo from './logo/GuessTheCountry.png';
import Modal from 'react-modal';
import countriesGeoJSON from './geodata/custom.geo';

const Startpage = ({ selectedContinent, setSelectedContinent, numberOfCountries, setNumberOfCountries, setCountryList }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log("GeoJSON Data:", countriesGeoJSON); // Log the entire GeoJSON data
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
    let filteredCountries;
    if (selectedContinent === 'World') {
      // Wenn "World" ausgewählt ist, wähle alle Länder aus
      filteredCountries = geoJson.features.map(feat => feat.properties.name);
      console.log("Filtered Countries (World):", filteredCountries);
    } else {
      // Filtere die Länder nach dem ausgewählten Kontinent
      filteredCountries = geoJson.features.filter(feat =>
        feat.properties.continent === selectedContinent
      ).map(feat => feat.properties.name);
      console.log("Filtered Countries (Continent):", filteredCountries);
    }

    if (filteredCountries.length === 0) {
      console.error("No countries found for the selected continent or world");
    }

    // Shuffle array and pick the first `numberOfCountries` elements
    const shuffledCountries = filteredCountries.sort(() => 0.5 - Math.random());
    const selectedCountries = shuffledCountries.slice(0, numberOfCountries);
    return selectedCountries;
  }

  const numberOptions = [10, 15, 20, 25];

  const handleSelectChange = (event) => {
    setSelectedContinent(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumberOfCountries(parseInt(event.target.value, 10));
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const startGame = () => {
    const countryList = filterGeoJsonByContinent(countriesGeoJSON, selectedContinent);
    console.log("Selected Countries:", countryList); // Log the country list
    setCountryList(countryList); // Set the list of country names
    navigate('/mappage');
  };

  return (
    <div className="App">
      <button className="info-button" onClick={toggleModal}>Info</button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        contentLabel="Game Info"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Game Info</h2>
        <p>This game was developed by:</p>
        <ul>
          <li>Amport Nando</li>
          <li>Kramer Janis</li>
          <li>Tschanz Micha</li>
          <li>Uythoven Sven</li>
        </ul>
        <button className="close-button" onClick={toggleModal}>X</button>
      </Modal>
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
