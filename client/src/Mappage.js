import React, { useState } from 'react';
import './Mappage.css';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import countriesGeoJSON from './geodata/custom.geo';
import logo from './logo/GuessTheCountry.png';

const Mappage = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [highlightedCountry, setHighlightedCountry] = useState(null);

  const africa = {
    ...countriesGeoJSON,
    features: [
      countriesGeoJSON.features.filter(feat => {    
        if (feat.properties.region_un === "Americas") {
          return feat
        }
      })
    ]
  }
  console.log(JSON.stringify(africa));
  const handleCountryClick = (event) => {
    const countryName = event.target.feature.properties.name;
    setSelectedCountry(countryName);
  };

  const highlightFeature = (event) => {
    setHighlightedCountry(event.target.feature.properties.name);
  };

  const resetHighlight = () => {
    setHighlightedCountry(null);
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
        Country
      </div>
      <button className="header-reload" >
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
          style={(feature) => ({
            fillColor: highlightedCountry === feature.properties.name ? "#F75F27" : "#343A40", // Fill color
            fillOpacity: 0.5, // Fill opacity
            weight: 0.7, // Outline width
            opacity: 1, // Outline opacity
            color: highlightedCountry === feature.properties.name ? "#FF5733" : "#000000" // Outline color
          })}
          
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
