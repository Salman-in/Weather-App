import axios from "axios";
import { useState } from "react";

const Weather = () => {
    const [data, setData] = useState<any>(null);
    const [inputCity, setInputCity] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [initialState, setInitialState] = useState<boolean>(true);
    const [darkMode, setDarkMode] = useState<boolean>(false);

    const fetchWeather = async (city: string) => {
        try {
            const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}&units=metric`;
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

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`flex flex-col items-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-[#d6ccff] text-gray-800'} w-[340px] justify-self-center p-4 rounded-xl my-8 shadow-2xl pt-[2px] pb-8 md:w-96 transition-all duration-300`}>
            <button 
                onClick={toggleDarkMode} 
                className="absolute top-4 right-4 bg-purple-400 px-4 py-2 rounded text-white hover:bg-purple-800"
            >
                {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            <img src='./public/mega-cloud.svg' alt='background' className='w-full pl-[1rem]' />
            <div className={`my-4 font-bold ${darkMode ? 'text-gray-200 bg-gray-800' : 'text-gray-200 bg-slate-900'} px-8 pt-4 pb-2 rounded-3xl transition-all duration-300`}>
                <h1 className="text-4xl justify-self-center">Weather App</h1>
                <p className="text-gray-400 justify-self-end pt-2 pr-[2px]">by Salman</p>
            </div>
            {initialState && <h2 className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Enter a city to get the weather</h2>}
            <div className="flex items-center justify-center flex-col">
                <input
                    className={`border p-2 rounded-md m-4 outline-none ${darkMode ? 'bg-gray-700 text-white placeholder-gray-300' : 'bg-white text-gray-800 placeholder-gray-500'} focus:border-purple-800 focus:border-2`}
                    type="text"
                    placeholder="Enter the city"
                    value={inputCity}
                    onChange={(e) => setInputCity(e.target.value)}
                />
                <button className="bg-purple-400 m-2 px-8 py-2 rounded text-white hover:bg-purple-800" onClick={handleSearch}>Search</button>
            </div>
            {initialState ?
                <div></div> :
                (
                <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-slate-100 text-gray-800'} p-4 rounded-md mt-4 w-72 flex items-center justify-center flex-col transition-all duration-300`}>
                    <div className={`font-bold text-xl ${darkMode ? 'bg-gray-700' : 'bg-slate-300'} p-2 rounded-md w-full text-center transition-all duration-100`}>Weather Details</div>
                    <div className="flex flex-col items-center justify-center space-y-2 pt-4">
                        {data && <h2 className="font-bold">City: {data.city}</h2>}
                        {data && <h2>Temperature: <span className="font-bold">{data.temp} °C</span></h2>}
                        {data && <h2>Humidity: <span className="font-bold">{data.humidity}%</span></h2>}
                        {data && <h2>Wind Speed: <span className="font-bold">{data.wind} m/s</span></h2>}
                    </div>
                </div>)
            }
        </div>
    );
};

export default Weather;