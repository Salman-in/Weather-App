import axios from "axios";
import { useState } from "react";

const Weather = () => {
    const [data, setData] = useState<any>(null);
    const [inputCity, setInputCity] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [initialState, setInitialState] = useState<boolean>(true);
    const [unit, setUnit] = useState<"metric" | "imperial">("metric");

    const fetchWeather = async (city: string) => {
        try {
            const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}&units=${unit}`;
            setLoading(true);
            const res = await axios.get(URL);
            const mainData = res.data;
            console.log(mainData);
            setData({
                temp: Math.round(mainData.main.temp),
                humidity: mainData.main.humidity,
                city: mainData.name,
                wind: mainData.wind.speed,
            });
            setInitialState(false);
        } catch (error) {
            alert("City not found");
            console.error("Error fetching weather:", error);
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        if (inputCity.trim() === "") {
            alert("Please enter a valid city name!");
            return;
        }
        fetchWeather(inputCity);
    };


    const toggleUnit = () => {
        setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
        if (data) {
            fetchWeather(data.city);
        }
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Enter the city"
                    value={inputCity}
                    onChange={(e) => setInputCity(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
                <button onClick={toggleUnit}>Switch to {unit === "metric" ? "metric unit" : "imperial unit"}</button>
            </div>
            <div>
                {data && <h2>City: {data.city}</h2>}
                {data && <h2>Humidity: {data.humidity}%</h2>}
            </div>

            {loading ? <h2>Loading...</h2> :
                (<div>
                    {data && <h2>Temperature: {data.temp} {unit === "metric" ? "°F" : "°C"}</h2>}
                    {data && <h2>Wind: {data.wind} {unit === "metric" ? "m/s" : "mph"}</h2>}
                </div>)}
            {initialState && <h2>Enter a city to get the weather</h2>}
        </div>
    );
};

export default Weather;
