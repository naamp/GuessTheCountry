import React, { useState, useEffect } from 'react';
import './Startpage.css';
import { useNavigate } from "react-router-dom";
import logo from './logo/GuessTheCountry.png';
import Modal from 'react-modal';
import countriesGeoJSON from './geodata/custom.geo';

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
      <button className="info-button" onClick={toggleModal}>Info</button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        contentLabel="Game Info"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Game Info</h2>
        <h3>Developers:</h3>
        <p>Amport Nando, Kalbermatten Pascal, Kramer Janis, Tschanz Micha, Uythoven Sven</p>
        <h3>Geodata:</h3>
        <a href="https://geojson-maps.kyd.au/">https://geojson-maps.kyd.au/</a>
        <h3>Impressum:</h3>
        <p>The developers accepts no responsibility for the accuracy and currency of the content on <a href="http://geogame-guessthecountry.vercel.app">http://geogame-guessthecountry.vercel.app</a>.
            The developers provides no guarantee for the operation of the <a href="http://geogame-guessthecountry.vercel.app">http://geogame-guessthecountry.vercel.app</a> website and accepts no liability for any damage to hardware or software caused by viruses or technical problems of any kind. Access to <a href="http://geogame-guessthecountry.vercel.app">http://geogame-guessthecountry.vercel.app</a> is at the user's own risk and responsibility.
            When using the website provisions of foreign law may be violated; in such cases, the developers rejects any liability. Links to external websites on this website serve merely as a reference to topics that could be helpful for users of this site. The developers have no control over the content of external links, which is why the developers accept no liability for the content of such external links, including their accuracy, completeness, reliability or suitability for specific purposes. Illegal content will be removed immediately upon notification.</p>

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
