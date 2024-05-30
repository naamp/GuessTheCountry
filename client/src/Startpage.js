import React from 'react';
import './Startpage.css';
import { useNavigate } from "react-router-dom";
import logo from './logo/GuessTheCountry.png';

const Startpage = ({ selectedGameOption, setSelectedGameOption }) => {
  const navigate = useNavigate();

  const handleSelectChange = (event) => {
    setSelectedGameOption(event.target.value);
  };

  return (
    <div className="App">
      <button className="info-button" onClick={() => alert('This Game was developed by Amport Nando, Kramer Janis, Tschanz Micha and Uythoven Sven')}>Info</button>
      <div className="logo-container">
        <img src={logo} alt="Guess the Country Logo" className="logo" />
      </div>
      <div className="button-container">
        <div className="dropdown-container">
          <select className="dropdown" value={selectedGameOption} onChange={handleSelectChange}>
            <option className="dropdown-value" value="option1">All Countries</option>
            <option className="dropdown-value" value="option2">America</option>
            <option className="dropdown-value" value="option3">Europe</option>
          </select>
        </div>
        <button className="start-button" onClick={() => navigate('/mappage')}>Start Game</button>
      </div>
    </div>
  );
};

export default Startpage;
