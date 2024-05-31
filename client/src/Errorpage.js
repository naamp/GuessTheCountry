import { useNavigate } from "react-router-dom";
import logo from './logo/GuessTheCountry.png';
import './Errorpage.css';

export const ErrorPage = () => {
    const navigate = useNavigate();
    return (
    
    <div className="App">
            <div className="logo-container">
        <img src={logo} alt="Guess the Country Logo" className="logo" />
      </div>
      <h3>You guessed the wrong page!</h3>
      <button className="start-button" onClick={() => navigate('/')}>Back to home</button>
    </div>
  );
};