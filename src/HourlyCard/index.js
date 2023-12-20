import React from 'react';

import '../App.css';

export const HourlyCard = ({hourlyCard}) => {
    console.log('hourlyCard', hourlyCard);
    const { dt, weather,  main: {temp} } = hourlyCard;
    const { main, icon } = weather[0];
    const curDate = new Date(dt*1000);

    return (
        <div className="HourlyCard">
        <div>{curDate.toString().split(' ')[0]}</div>
        <div>{curDate.toString().split(' ')[4]}</div>
            <img className="Icon" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="icon" />
            <div className="TemperatureIcon">{temp.toFixed(0)}</div>
            <div>{main}</div>
        </div>
    )
};