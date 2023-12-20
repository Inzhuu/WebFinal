import React, { memo, useContext, useEffect } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';

import { GlobalContext } from '../App';
import { useWeather } from '../hooks/useWeather';
import '../App.css';

const CardNoMemo = ({ city, setCityCoord }) => {
    const data = useWeather(city);
    const history = useHistory();
    const isHome = Boolean(useRouteMatch('/home'));
    const { dispatch } = useContext(GlobalContext);
    useEffect(() => {
        if (data && data.coord.lat && data.coord.lon && setCityCoord) {
            setCityCoord({
                lat: data.coord.lat,
                lon: data.coord.lon,
            });
        }
    }, [data, setCityCoord])
    if (!data) return null;
    const { name, weather, main, wind } = data;
    const { description, icon } = weather[0];
    const { temp, humidity, pressure, feels_like, temp_max, temp_min } = main;
    const { speed } = wind;

    const handleOnDelete = () => {
        dispatch({
            type: 'DELETE_CITY',
            payload: city,
        })
    };

    const handleOnEdit = () => {
        dispatch({
            type: 'EDIT_CITY',
            payload: city,
        })
        history.push('/home');
    };
    if (isHome) {
        return (
            <Link to={`/city/${city.toLowerCase()}`} className="Card">
                <div className="ActionButtonWrap">
                    <button className="ActionButton" onClick={handleOnEdit}>edit</button>
                    <button className="ActionButton" onClick={handleOnDelete}>X</button>
                </div>
                <div className="MainInfo">
                    <img className="Icon" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="icon" />
                    <div className="Title">{name}</div>
                    <div className="Description">{description}</div>
                    <div className="Temperature TemperatureIcon">{temp.toFixed()}</div>
                </div>
                <div className="Information">
                <div>Feels like: {feels_like.toFixed()}</div>
                <div>Humidity: {humidity}</div>
                    {/* <div>Wind speed: {speed}</div> */}
                </div>
            </Link>
        )
    }
    return (
        <div className="Card">
            <div className="ActionButtonWrap">
                <button className="ActionButton" onClick={handleOnEdit}>edit</button>
                <button className="ActionButton" onClick={handleOnDelete}>X</button>
            </div>
            <div className="MainInfo">
                <img className="Icon" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="icon" />
                <div className="Title">{name}</div>
                <div className="Description">{description}</div>
                <div className="Temperature TemperatureIcon">{temp.toFixed()}</div>
            </div>
            <div className="Information">
                <div>Feels like: {feels_like.toFixed()}</div>
                <div>Humidity: {humidity}</div>
                <div>Pressure: {pressure}</div>
                <div>Wind speed: {speed}</div>
                <div>Maximum temperature: {temp_max.toFixed()}</div>
                <div>Minimum temperature: {temp_min.toFixed()}</div>
            </div>
        </div>
    );
};

export const Card = memo(CardNoMemo);

