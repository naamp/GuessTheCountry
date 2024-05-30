import React, { useState, useEffect } from 'react';
import './Mappage.css';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import logo from './logo/GuessTheCountry.png';

const Mappage = ({ countryList, countriesGeoJSON }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [highlightedCountry, setHighlightedCountry] = useState(null);
  const [highlightColor, setHighlightColor] = useState(null);
  const [currentCountryList, setCurrentCountryList] = useState(countryList);

  useEffect(() => {
    setCurrentCountryList(countryList); // Set the initial country list
  }, [countryList]);

  const handleCountryClick = (event) => {
    const countryName = event.target.feature.properties.name;
    setSelectedCountry(countryName);

    if (currentCountryList.length > 0) {
      const firstCountry = currentCountryList[0];
      if (countryName === firstCountry) {
        setHighlightColor('green');
        // Remove the first country from the list
        const updatedCountryList = currentCountryList.slice(1);
        setCurrentCountryList(updatedCountryList);
      } else {
        setHighlightColor('orange');
      }

      // Reset highlight color after a short delay
      setTimeout(() => {
        setHighlightColor(null);
      }, 1000);
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
        color: 'white',
        dashArray: '3'
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
            {currentCountryList.length > 0 ? currentCountryList[0] : "No more countries"}
          </div>
          <button className="header-reload">
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
      </MapContainer>
      {selectedCountry && (
        <div className="country-info">
          <p>{selectedCountry}</p>
        </div>
      )}
    </div>
  );
};

export default Mappage;
