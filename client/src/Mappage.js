import React, { useEffect, useState } from 'react';
import './Mappage.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

import { MapContainer, TileLayer, useMap, Popup, Marker, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';


const Mappage = () => {


  return (

    <div className="App">
  <MapContainer           
    center={[46,7]}
    zoom={3}
    scrollWheelZoom={true}>
    <TileLayer
        attribution='&copy; <a href="https://www.esri.com/en-us/home">Esri</a>, USGS, NOAA'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}"
    />
    <Marker position={[46,7]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>

    </div>
  );
};

export default Mappage;