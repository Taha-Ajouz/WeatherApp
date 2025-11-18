import './WeatherCard.css';
import { useEffect, useState } from 'react';
import wind_icon from './Assets/wind.png';
import humidity_icon from './Assets/humidity.png';

function WeatherCard() {
  const [data, setData] = useState(null);
  const [city, setCity] = useState('');
  const [input, setInput] = useState('');

  function handleinput(e) {
    setCity(e.target.value);
    setInput(e.target.value);
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          'https://api.weatherapi.com/v1/current.json?key=4eabe9e91b134742a0e131426251311&q=Beirut'
        );
        const data = await res.json();
        setData(data);
      } catch (error) {
        alert('Error in fetching');
      }
    };
    getData();
  }, []);

  async function fetchWeather(cityUser) {
    const trimmedCity = cityUser.trim();
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=4eabe9e91b134742a0e131426251311&q=${cityUser}`
      );
      const data = await res.json();
      if (
        data.error ||
        trimmedCity.length < 3 ||
        !data.location ||
        !data.current
      ) {
        const error = document.getElementById('error');
        if (error) {
          error.style.display = 'block';
          setTimeout(() => {
            error.style.display = 'none';
          }, 4000);
        }
        setCity('');
        setData(null);
        fetchWeather('Beirut');
      } else {
        setData(data);
      }
    } catch (err) {
      console.error('Fetch failed:', err);
    }

    
  }

  function handlesubmit(e) {
    setCity(e.target.value);
  }

  function fetchSearch() {
    fetchWeather(city);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      fetchSearch();
    }
  }

  return (
    <div className="main_container">
      <div className="weather_card">
        <div className="weather_search">
          <input
            type="text"
            placeholder="City, Country"
            onChange={handlesubmit}
            value={city}
            onKeyDown={handleKeyDown}
          ></input>
          <p id="error">No matching location found</p>
          <button onClick={fetchSearch}></button>
        </div>
        <div className="weather1_container">
          {data ? (
            <img
              src={data.current.condition.icon.replace('64x64', '128x128')}
              alt=""
            />
          ) : (
            'Loading...'
          )}
          <p className="temp">{data ? data.current.temp_c : 'Loading...'}°C</p>
          <p className="city">{data ? data.location.country : 'Loading...'}</p>
        </div>
        <div className="weather_container-last">
          <div className="hum_cont">
            <img src={humidity_icon} className="hum"></img>
            <p className="det">
              {data ? data.current.humidity : 'Loading...'}%
            </p>
            <p>Humidity</p>
          </div>
          <div className="wind_cont">
            <img src={wind_icon} className="wind"></img>
            <p className="det">
              {data ? data.current.wind_kph : 'Loading...'} Kp/h
            </p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default WeatherCard;
