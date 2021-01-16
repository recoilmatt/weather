import React, { useContext } from "react";
import Context from "../Context";

function WeatherData() {
  const { weather, city, weatherDesc } = useContext(Context); //useContext from main.js
  const { temp, humidity, pressure } = weather; //object destructuring

  return (
    <div className="weather-data">
      <p className="weather__tagline">
        Weather forecast for <span className="weather-data__city">{city}</span>
      </p>

      <div className="weather-data__image">
        <img
          src={`http://openweathermap.org/img/wn/${weatherDesc.icon}@2x.png`}
          alt="weatherIcon"
        ></img>
        <span>{weatherDesc.description}</span>
      </div>

      <div className="weather-data__box">
        <span className="weather-data__property">
          <p className="weather-data__title">Temperature °F</p>
          <p className="weather-data__value">{temp}</p>
        </span>
        <span className="weather-data__property">
          <p className="weather-data__title">Humidity</p>
          <p className="weather-data__value">{humidity}</p>
        </span>
        <span className="weather-data__property">
          <p className="weather-data__title">Pressure</p>
          <p className="weather-data__value">{pressure}</p>
        </span>
      </div>
    </div>
  );
}

export default WeatherData;
