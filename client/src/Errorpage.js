import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import logo from './logo/GuessTheCountry.png';
import './Errorpage.css';
import Modal from 'react-modal';

export const ErrorPage = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

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
      <h2 className="ueberschrift">You guessed the wrong page!</h2>
      <button className="start-button" onClick={() => navigate('/')}>Back to home</button>
    </div>
  );
};