import React, { useState, useEffect } from "react";


const Weather = () => {
  const [location, setLocation] = useState<string>("");
  const [locationError, setLocationError] = useState<string>("");
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const API_KEY = "2790a93ff9b89ac658caecc6a1d453ef";

  const locationHandle = () => {
    const loctonCheck = location.trim();
    let isValid = true;

    if (loctonCheck.length < 3) {
      setLocationError("Location not valid");
      setWeather(null);
      isValid = false;
    } else {
      setLocationError("");
    }

    if (isValid) {
      fetchWeather(loctonCheck);
    }
  };

  const fetchWeather = async (cityName: string) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather(data);
      setError("");
    } catch (err: any) {
      setError(err.message);
      setWeather(null);
    }
  };

  const convertToTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000); 
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    return formattedTime;
  };

  useEffect(() => {
    console.log("Updated Weather State:", weather);
  }, [weather]);
  // console.log(weather.weather[0].icon);
  // let aaa="02d"
  return (
    <div className="p-4 flex gap-x-3 bg-[#ffffff]">
      <div className="w-2/3 h-[95vh] bg-[url('/peter-secan-QuZmcJ-n52E-unsplash.jpg')] bg-cover bg-center rounded-4xl  shadow-[#515050] shadow-2xl">
      <h1 className="text-center text-6xl pt-8 font-bold text-white">Weather</h1>
      <div className="h-70 flex items-center align-middle ">
            <img
              className=""
              src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon }@4x.png`}
              alt="Weather Icon"
            />
      </div>
        <div className="flex justify-center items-center">
       
          
          <div className="bg-[#f9f8f85c] p-2 w-1/2 h-13 rounded-xl hover:border-white hover:border-2 flex items-center mt-[3vh]">
            <input
              className="focus:outline-none w-full text-white placeholder:text-amber-50 placeholder:text-lg placeholder:pl-5"
              type="text"
              placeholder="Enter location"
              onChange={(e) => setLocation(e.target.value)}
            />
            <div className="cursor-pointer ml-4" onClick={locationHandle}>
              <img className="w-10" src="search.png" alt="Submit" />
            </div>
          </div>
        </div>
        <p className="text-[#920000] mt-2 pl-66 text-lg">{locationError}</p>

        {error && <p className="text-[#920000] mt-2 pl-66 text-lg">{error}</p>}

        {weather && weather.main && (
          <div className="mt-16 text-white ml-80">
            <h2 className="text-4xl font-bold">{weather.name}</h2>
            <p className="text-2xl text-[#ffe1e1]">
              Temperature: {weather.main.temp}°C
            </p>
            <p className="text-2xl text-[#ffe1e1]">
              Weather: {weather.weather[0].description}
            </p>
            <p className="text-2xl text-[#ffe1e1]">
              Humidity: {weather.main.humidity}%
            </p>
          </div>
        )}
      </div>

      {/* seeeection 2 */}
      <div className="w-1/3  h-[95vh] flex flex-col ">
      <div className="bg-[#ffffff] w-14/15 h-80 ml-4 mt-4 rounded-3xl shadow-[#515050] shadow-2xl">
      <div>
      {weather ? <p className="text-8xl font-bold mt-19 ml-8">{weather?.main.temp}°C </p>:<p className="text-4xl font-bold mt-29 ml-29 text-red-600">! location not avaliable</p>}
      {weather &&  <p className="text-xl font-bold mt- ml-8">{weather.name} / weather: <span>{weather.weather[0].main}</span></p>}
     
      </div>
      </div>



      <div className="bg-[#ffffff] w-14/15 h-80 ml-4 mt-4 rounded-3xl shadow-[#515050] shadow-2xl">
      <div className=" w-12/15 h-70 ml-4 mt-4">

      
     { weather ? <p className="text-2xl font-semibold">Today :{new Date().toLocaleDateString()}</p>:<p className="text-4xl font-bold mt-29 ml-29 text-red-600">! location not avaliable</p>}
     { weather && <p className="mt-10 text-lg"> Humidity: {weather.main.humidity}%</p> }
      {weather && <p className="mt-2 text-lg">Longitude:    {weather.coord.lon}</p>}
     { weather && <p className="mt-2 text-lg">Latitude:  {weather.coord.lat}</p>}
     { weather && <p className="mt-2 text-lg">Sunrise Time:  {convertToTime(weather.sys.sunrise)}</p>}
     { weather && <p className="mt-2 text-lg">Sunset Time:   {convertToTime(weather.sys.sunset)}</p>}



      </div>
      </div>
      
      </div>
    </div>
  );
};

export default Weather;
