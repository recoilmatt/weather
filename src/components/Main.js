import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Content from "./Content";
import WeatherSearch from "./WeatherSearch";
import WeatherData from "./WeatherData";
import Context from "../Context";
import Error from "./Error";
import DateTime from "./DateTime";
import Tagline from "./Tagline";
/* import Geolocation from "./Geolocation"; */

function Main() {
  const [weather, setWeather] = useState();
  const [weatherDesc, setWeatherDesc] = useState([]);
  const [city, setCity] = useState();
  const [error, setError] = useState();

  const api_call = async (e) => {
    e.preventDefault();

    const location = e.target.elements.location.value;

    if (!location) {
      // eslint-disable-next-line no-sequences
      return setError("Please enter the name of the city."), setWeather(null);
    }

    const API_KEY = "4c84f57e47e9aef3550182ac9ddc3a75";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&APPID=${API_KEY}`;

    const request = axios.get(url);

    const response = await request;

    setWeather(response.data.main);
    setWeatherDesc(response.data.weather[0]);
    setCity(response.data.name);
    setError(null);
  };

  const location_call = async (lat, lon) => {
    const API_KEY = "4c84f57e47e9aef3550182ac9ddc3a75";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&APPID=${API_KEY}`;
    const request = await axios.get(url);
    const response = request;
    setWeather(response.data.main);
    setWeatherDesc(response.data.weather[0]);
    setCity(response.data.name);
    setError(null);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      location_call(position.coords.latitude, position.coords.longitude);
    });
  }, []);

  weather && console.log(weather);
  weatherDesc && console.log(weatherDesc);

  return (
    <div className="main">
      <Header />

      <DateTime />
      <Tagline />
      <Content>
        <Context.Provider
          value={{ location_call, api_call, weatherDesc, weather, city, error }}
        >
          <WeatherSearch />

          {weather && <WeatherData />}
          {error && <Error error={error} />}
        </Context.Provider>
      </Content>
    </div>
  );
}

export default Main;
