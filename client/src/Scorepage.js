import React, { useState } from 'react';
import './Scorepage.css';
import { useNavigate } from "react-router-dom";
import logo from './logo/GuessTheCountry.png';
import Modal from 'react-modal';

const Scorepage = ({ selectedGameOption, setSelectedGameOption, numberOfCountries, setNumberOfCountries }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);


  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const Score = 69;
  const Time = "1:30";



  const saveScore = async () => {
    const playerName = document.querySelector('.player-name').value;
    const textData = `Name: ${playerName}\nScore: ${Score}\nTime: ${Time}`;
  
    try {
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: 'score.txt',
        types: [{
          description: 'Text Files',
          accept: {'text/plain': ['.txt']}
        }]
      });
  
      const writableStream = await fileHandle.createWritable();
  
      await writableStream.write(textData);
  
      await writableStream.close();
  
      alert('Score saved successfully');
    } catch (error) {
      console.error('Error saving score:', error);
      alert('Failed to save score');
    }
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
      <div className='results-container'>
        <h2 className="ueberschrift">Your score is:</h2>
        <input className='player-name' placeholder="player name"></input>
        <div className='results-align'>
          <h3 className='results'>Time: 00:09</h3>
          <h3 className='results'>Points: 50%</h3>
        </div>
      </div>
      <div className="button-container">
        <button className="start-button" onClick={saveScore}>Save Score</button>
        <button className="start-button" onClick={() => navigate('/')}>Back to home</button>
      </div>
    </div>
  );
};

export default Scorepage;
