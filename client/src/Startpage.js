import React, { useState } from 'react';
import './Startpage.css';
import { useNavigate } from "react-router-dom";
import logo from './logo/GuessTheCountry.png';
import Modal from 'react-modal';

const Startpage = ({ selectedGameOption, setSelectedGameOption, numberOfCountries, setNumberOfCountries }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Liste der Dropdown-Optionen
  const dropdownOptions = [
    { value: 'world', label: 'World' },
    { value: 'america', label: 'America' },
    { value: 'europe', label: 'Europe' },
    { value: 'asia', label: 'Asia' },
    { value: 'africa', label: 'Africa' },
    { value: 'oceania', label: 'Oceania' }
  ];

  const numberOptions = [10, 15, 20, 25];

  const handleSelectChange = (event) => {
    setSelectedGameOption(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumberOfCountries(event.target.value);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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
          <select className="dropdown" value={selectedGameOption} onChange={handleSelectChange}>
            {dropdownOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <button className="start-button" onClick={() => navigate('/mappage')}>Start Game</button>
      </div>
    </div>
  );
};

export default Startpage;
