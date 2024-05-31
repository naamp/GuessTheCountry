import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import logo from './logo/GuessTheCountry.png';
import './Errorpage.css';
import Modal from 'react-modal';
import { InfoPopUp } from "./info-popup";

export const ErrorPage = () => {
    const navigate = useNavigate();
    return (
    
    <div className="App">
        <InfoPopUp></InfoPopUp>
            <div className="logo-container">
        <img src={logo} alt="Guess the Country Logo" className="logo" />
      </div>
      <h2 className="ueberschrift">You guessed the wrong page!</h2>
      <button className="start-button" onClick={() => navigate('/')}>Back to home</button>
    </div>
  );
};