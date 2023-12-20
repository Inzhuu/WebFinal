import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Card } from '../Card';
import { useForecast } from '../hooks/useForecast';
import { HourlyCard } from '../HourlyCard';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import '../App.css';

const MapComponent = ({ cityCoord }) => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
    marginTop: '20px',
  };

  const center = {
    lat: cityCoord.lat,
    lng: cityCoord.lon,
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBPZNXjL78M6--igCEIN1CFpS1MKqAD5Fc" 
    >
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export const Details = (props) => {
  const params = useParams();
  const [cityCoord, setCityCoord] = useState(null);
  const data = useForecast(cityCoord);
  const { city } = params;

  return (
    <div className="DetailsWrap">
      <Link to="/home" className="Back">
        Back
      </Link>
      <Card city={city} setCityCoord={setCityCoord} />
      {data && (
        <div className="HourlyCards">
          {data.list.map((hourlyCard) => (
            <HourlyCard hourlyCard={hourlyCard} key={hourlyCard.dt} />
          ))}
        </div>
      )}
      {cityCoord && <MapComponent cityCoord={cityCoord} />}
    </div>
  );
};

