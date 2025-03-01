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
        <div className="flex flex-col items-center bg-[#d6ccff] w-[340px] justify-self-center p-4 rounded-lg my-8 shadow-2xl py-16 md:w-96">
            <div className=" my-4 font-bold text-gray-200 bg-slate-900 px-4 pt-4 pb-2 rounded-3xl">
            <h1 className="text-4xl justify-self-center">Weather App</h1>
            <p className="text-gray-400 justify-self-end pt-2 pr-[2px]">by Salman</p>
            </div>
            {initialState && <h2 className="text-gray-600">Enter a city to get the weather</h2>}
            <div className="flex items-center justify-center flex-col">

                <input
                    className="border p-2 rounded-md m-4 outline-none focus:border-purple-800 focus:border-2"
                    type="text"
                    placeholder="Enter the city"
                    value={inputCity}
                    onChange={(e) => setInputCity(e.target.value)}
                />
                <button className="bg-purple-400 m-2 px-8 py-2 rounded text-white hover:bg-purple-800" onClick={handleSearch}>Search</button>
                <button className="bg-purple-400 m-2 px-8 py-2 rounded text-white hover:bg-purple-800" onClick={toggleUnit}>Switch to {unit === "metric" ? "imperial unit" : "metric unit"}</button>
            </div>
            {initialState ?
                <div></div> :
                (
                <div className="bg-slate-100 p-4 rounded-md mt-4 w-72 flex items-center justify-center flex-col">
                    <div className="font-bold text-xl text-teal-800">Weather Details <hr /></div>
                    <div>
                        {data && <h2 className="font-bold">City: {data.city}</h2>}
                        {data && <h2>Humidity: {data.humidity}%</h2>}
                    </div>
                    <div>
                        {data && <h2>Temperature: {data.temp} {unit === "metric" ? "°C" : "°F"}</h2>}
                        {data && <h2>Wind Speed: {data.wind} {unit === "metric" ? "m/s" : "mph"}</h2>}
                    </div>
                </div>)
                }
        </div>
    );
};

export default Weather;
