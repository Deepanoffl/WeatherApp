import { useState, useEffect } from "react";
import axios from "axios";

const Weather = () => {
  const [cityName, setCityName] = useState("chennai");
  const [loadWeatherData, setLoadWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleCity = (evt) => {
    setCityName(evt.target.value);
  };

  const getWeatherData = async () => {
    try {
      setLoading(true);
      setErrorMsg(""); 
      const weatherDetails = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=19e92685104321f4c1cc8fa576d982af&units=Metric`
      );
      setLoadWeatherData(weatherDetails.data);
      setLoading(false);
    } catch (err) {
      setLoadWeatherData(null);
      setErrorMsg("City not found !");
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeatherData();
  }, []);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const weatherInfo = loadWeatherData?.weather?.[0];
  const iconUrl = weatherInfo
    ? `https://openweathermap.org/img/wn/${weatherInfo.icon}@4x.png`
    : "";

  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#1e3c72] via-[#2a5298] to-[#1e3c72] flex flex-col items-center justify-start p-6 text-white">
      <div className="w-full md:w-1/3 max-w-4xl mb-3 relative">
        <span
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg cursor-pointer"
          onClick={getWeatherData}
        >
          🔍
        </span>
        <input
          type="text"
          placeholder="Search for a city..."
          className="w-full p-3 pl-10 rounded-full bg-white shadow-lg outline-none text-gray-800"
          value={cityName}
          onChange={handleCity}
        />
      </div>

      {errorMsg && (
        <div className="font-bold md:text-lg text-sm mt-4">{errorMsg}</div>
      )}

      {loading ? (
        <div className="w-full max-w-4xl bg-gradient-to-br from-blue-500 to-indigo-600 p-8 rounded-3xl shadow-2xl animate-pulse flex flex-col md:flex-row justify-between gap-6">
 
          <div className="flex-1 flex flex-col gap-4 relative">
            <div className="h-6 w-2/3 bg-white/30 rounded"></div>
            <div className="h-5 w-1/2 bg-white/30 rounded"></div>
            <div className="h-24 w-24 bg-white/30 rounded-full mt-4 absolute right-2"></div>
            <div className="h-14 w-1/3 bg-white/30 rounded mt-20"></div>
            <div className="h-4 w-1/2 bg-white/30 rounded"></div>
            <div className="h-4 w-1/3 bg-white/30 rounded"></div>
          </div>

          <div className="flex-1 grid grid-cols-2 gap-4">
            {Array(7)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="h-20 bg-white/20 rounded-xl"></div>
              ))}
          </div>
        </div>
      ) : (
        loadWeatherData &&
        weatherInfo && (
          <div className="w-full max-w-4xl bg-gradient-to-br from-blue-500 to-indigo-600 p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-6">

            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold">
                    {loadWeatherData.name}, {loadWeatherData.sys?.country}
                  </h2>
                  <p className="text-xl capitalize">
                    {weatherInfo.description}
                  </p>
                </div>
                <img
                  src={iconUrl}
                  alt={weatherInfo.main}
                  className="w-24 h-24"
                />
              </div>

              <div className="mt-6">
                <h1 className="text-6xl font-bold">
                  {Math.round(loadWeatherData.main?.temp)}°C
                </h1>
                <p className="text-lg mt-2 font-medium">
                  Feels like: {Math.round(loadWeatherData.main?.feels_like)}°C
                </p>
                <div className="font-bold mt-2 text-sm text-white/90">
                  <p>🌡️ Min: {Math.round(loadWeatherData.main?.temp_min)}°C</p>
                  <p className="mt-2">
                    🌞 Max: {Math.round(loadWeatherData.main?.temp_max)}°C
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-4 text-sm">
              <div className="bg-white/20 p-4 rounded-xl">
                <p className="font-bold">Humidity</p>
                <p className="font-bold">{loadWeatherData.main?.humidity}%</p>
              </div>
              <div className="bg-white/20 p-4 rounded-xl">
                <p className="font-bold">Wind</p>
                <p className="font-bold">{loadWeatherData.wind?.speed} m/s</p>
              </div>
              <div className="bg-white/20 p-4 rounded-xl">
                <p className="font-bold">Latitude</p>
                <p className="font-bold">
                  {loadWeatherData.coord?.lat?.toFixed(2)}
                </p>
              </div>
              <div className="bg-white/20 p-4 rounded-xl">
                <p className="font-bold">Longitude</p>
                <p className="font-bold">
                  {loadWeatherData.coord?.lon?.toFixed(2)}
                </p>
              </div>
              <div className="bg-white/20 p-4 rounded-xl">
                <p className="font-bold">Cloudiness</p>
                <p className="font-bold">{loadWeatherData.clouds?.all}%</p>
              </div>
              <div className="bg-white/20 p-4 rounded-xl">
                <p className="font-bold">Sunrise</p>
                <p className="font-bold">
                  {formatTime(loadWeatherData.sys?.sunrise)}
                </p>
              </div>
              <div className="bg-white/20 p-4 rounded-xl col-span-2">
                <p className="font-bold">Sunset</p>
                <p className="font-bold">
                  {formatTime(loadWeatherData.sys?.sunset)}
                </p>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Weather;
