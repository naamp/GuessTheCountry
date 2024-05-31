import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import logo from './logo/GuessTheCountry.png';
import Modal from 'react-modal';
import './info-popup.css';

export const InfoPopUp = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
      };
return (
<div><button className="info-button" onClick={toggleModal}>Info</button>
<Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        contentLabel="Game Info"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h1 className="ueberschrift">Game Info</h1>
        <h3 className="ueberschrift">Developers:</h3>
        <p>Amport Nando, Kalbermatten Pascal, Kramer Janis, Tschanz Micha, Uythoven Sven</p>
        <h3 className="ueberschrift">Geodata:</h3>
        <a href="https://geojson-maps.kyd.au/">https://geojson-maps.kyd.au/</a>
        <h3 className="ueberschrift">Impressum:</h3>
        <p>The developers accepts no responsibility for the accuracy and currency of the content on <a href="http://geogame-guessthecountry.vercel.app">http://geogame-guessthecountry.vercel.app</a>.
            The developers provides no guarantee for the operation of the <a href="http://geogame-guessthecountry.vercel.app">http://geogame-guessthecountry.vercel.app</a> website and accepts no liability for any damage to hardware or software caused by viruses or technical problems of any kind. Access to <a href="http://geogame-guessthecountry.vercel.app">http://geogame-guessthecountry.vercel.app</a> is at the user's own risk and responsibility.
            When using the website provisions of foreign law may be violated; in such cases, the developers rejects any liability. Links to external websites on this website serve merely as a reference to topics that could be helpful for users of this site. The developers have no control over the content of external links, which is why the developers accept no liability for the content of such external links, including their accuracy, completeness, reliability or suitability for specific purposes. Illegal content will be removed immediately upon notification.</p>

        <button className="close-button" onClick={toggleModal}>X</button>
      </Modal>
      </div>
        );
    };