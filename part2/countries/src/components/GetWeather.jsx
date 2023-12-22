import axios from "axios";
import { useState, useEffect } from "react";

const api_key = import.meta.env.VITE_WEATHER_KEY

const GetWeather = ({ cityName }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}`); 
                setWeatherData(response.data);
                setError(null);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch weather data');
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchData();
    }, [cityName]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!weatherData) return null;

    const celsius = weatherData.main ? weatherData.main.temp - 273.15 : null;
    const wind = weatherData.wind.speed

    return (
        <div>
        <h2>Weather in {cityName}</h2>
        <p>temperature {celsius.toFixed(2)} °C`</p>
        <p>wind {wind} m/s</p>
        </div>
    );
};

export default GetWeather;
