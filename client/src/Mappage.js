import React, { useState, useEffect, useRef } from 'react';
import './Mappage.css';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import logo from './logo/GuessTheCountry.png';
import { useNavigate } from "react-router-dom";

const continentBounds = {
  "World": [[-60, -180], [85, 180]],
  "North America": [[7.2, -167.1], [83.2, -25]],
  "South America": [[-56.1, -92.5], [13.4, -28.6]],
  "Europe": [[35.5, -31.3], [71.6, 54.3]],
  "Asia": [[1.1, 26.4], [77.8, 183.3]],
  "Africa": [[-35.3, -17.5], [37.2, 51.3]],
  "Oceania": [[-47.0, 110.0], [-10.0, 180.0]] // Adjusted bounds for Oceania
};


const SetViewOnContinentChange = ({ bounds }) => {
  const map = useMap();

  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds);
    }
  }, [bounds, map]);

  return null;
};

const Mappage = ({ countryList, countriesGeoJSON, time, setTime, score, setScore, selectedContinent }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [highlightedCountry, setHighlightedCountry] = useState(null);
  const [highlightColor, setHighlightColor] = useState(null);
  const remainingCountryListRef = useRef(countryList);
  const countryCountRef = useRef(0);
  const navigate = useNavigate();

  const CORRECT_COUNTRY_COLOR = '#85A30B'
  const FALSE_COUNTRY_COLOR = '#ff0000'

  useEffect(() => {
    remainingCountryListRef.current = countryList;
    countryCountRef.current = 0;
  }, [countryList]);

  const handleCountryClick = (event) => {
    const countryName = event.target.feature.properties.name;
    setSelectedCountry(countryName);
  
    if (countryName === remainingCountryListRef.current[countryCountRef.current]) {
      setHighlightColor(CORRECT_COUNTRY_COLOR);
      countryCountRef.current += 1;
      setScore(prevScore => prevScore + 20); // Increase score by 20
  
      if (countryCountRef.current === remainingCountryListRef.current.length) {
        navigate("/scorepage");
      }
    } else {
      setHighlightColor(FALSE_COUNTRY_COLOR);
      setScore(prevScore => prevScore - 10);
    }
  };

  const highlightFeature = (event) => {
    setHighlightedCountry(event.target.feature.properties.name);
  };

  const resetHighlight = () => {
    setHighlightedCountry(null);
  };

  const getStyle = (feature) => {
    if (feature.properties.name === selectedCountry) {
      return {
        fillColor: highlightColor,
        fillOpacity: 0.8,
        weight: 2,
        opacity: 1,
        color: 'black',
      };
    }
    return {
      fillColor: highlightedCountry === feature.properties.name ? '#F75F27' : '#343A40',
      fillOpacity: 0.5,
      weight: 0.7,
      opacity: 1,
      color: highlightedCountry === feature.properties.name ? '#FF5733' : '#000000'
    };
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
  
    // Clean up the timer when the component unmounts
    return () => clearInterval(timerInterval);
  }, []);
  
  // Store the timer value in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('timer', JSON.stringify(time));
  }, [time]);

  const bounds = continentBounds[selectedContinent];

  return (
    <div className="App">
      <header className="header">
        <div className="header-container">
          <div className="header-logo">
            <a href="/">
              <img src={logo} alt="Guess the Country Logo" className="logo" />
            </a>
          </div>
          <div className="header-title">
            {remainingCountryListRef.current.length > countryCountRef.current
              ? remainingCountryListRef.current[countryCountRef.current]
              : "No more countries"}
          </div>
          <button className="header-reload" onClick={() => window.location.reload()}>
            &#x21bb;
          </button>
        </div>
      </header>

      <MapContainer
        center={[46, 7]}
        zoom={3}
        scrollWheelZoom={true}
        zoomControl={false}
        style={{ height: "100vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.esri.com/en-us/home">Esri</a>, USGS, NOAA'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}"
        />
        <GeoJSON
          data={countriesGeoJSON}
          className="geojson"
          onEachFeature={(feature, layer) => {
            layer.on({
              click: handleCountryClick,
              mouseover: highlightFeature,
              mouseout: resetHighlight
            });
          }}
          style={getStyle}
        />
        <SetViewOnContinentChange bounds={bounds} />
      </MapContainer>
      {selectedCountry && (
        <div className="country-info">
          <p>{selectedCountry}</p>
        </div>
      )}

      {/* Score and time section */}
      <div className="score-box">
        <p>Time: {time} sec</p>
        {/* Render the score received from props or state */}
        <p>Score: {score}</p>
      </div>

    </div>
  );
};

export default Mappage;
