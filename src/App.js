import React, { useState, useEffect } from 'react';
import './App.css';
const api = {
  key: "97e4e3c8505f4004b5815833230306",
  base: "http://api.weatherapi.com/v1/current.json"
}
const forecastAPI = {
  key:  "97e4e3c8505f4004b5815833230306",
  base: "http://api.weatherapi.com/v1/forecast.json"
}
function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');
  const [forecast, setForecast] = useState('');

  const search = evt => {
    if(evt.key === 'Enter'){
      fetch(`${api.base}?key=${api.key}&q=${query}`)
      .then(response => response.json())
      .then(result =>{
         setWeather(result);
         setQuery('');
        //  console.log(result);
      
      });
      fetch(`${forecastAPI.base}?key=${forecastAPI.key}&q=${query}&days=7`)
      .then(res => res.json())
      .then(result =>{
        setForecast(result);
        // JSON.parse(result);
        console.log(result.forecast);
        console.log(result.forecast.forecastday[0]);
      });

    }
  
  // const search2 = evt2 => {
  //   if(evt2.key === 'Enter'){
  //     fetch(`${forecastAPI.base}?key=${forecastAPI.key}&q=${query}&days=7`)
  //     .then(res => res.json())
  //     .then(result =>{
  //       setForecast(result);
  //       console.log(result);
  //     });

  //   }
  // }
    return <div>Please try another location</div>
  }

const handleChange = (e) => {
  setQuery(e.target.value);
  localStorage.setItem("inputValue", e.target.value);
}
useEffect(() => {
  setQuery(localStorage.getItem("inputValue"));
}, []);

  const dateBuilder = (date) =>{
  let months = ["January","February","March","April","May","June","July",
  "August","September","October","November","December"];
  let days  =  ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[date.getDay()];
  let todayDate = date.getDate();
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  // these all look like inbuilt functions in JS. date is the comps value of the current day and the functions parse it into the listed section of date. 
  // month and day take the value from the array that matches the current get month and day

  return `${day} ${todayDate} ${month} ${year} `
  }
  const dayBuilder = (date) => {
    let dayOfWeek  =  ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let todayDay = dayOfWeek[date.getDay()];

  return `${todayDay}`

  }

  return (
    <div className = "App">
          <main>
            <div className = "searchBox">
              <input type= "text" placeholder = "Enter a location" className="searchBar"
              onChange={handleChange}
              value={query}
              onKeyPress={search}></input>
            </div>
            <div className="location-box">
              <div className="location">
              {weather.location.name} , {weather.location.country}
              </div>
                <div className="date">
                  {dateBuilder(new Date())}
                  {/* review this */}
            <div className="weather-box">
                <div className="temp"> 
                  {weather.current.temp_c}°C
               </div>
                <div className="weather"> 
                  {weather.current.condition.text}
              </div>
            </div>
                </div>
              </div>
          <div className = 'forecast'>
            <h2>7 day forecast</h2>
          </div>
          <div className = 'forecastBox'>
             <div className = "days">
              {/* passing in the value of the date string from the API data and converting it using the dayBuilder function */}
              <h3>Day</h3>
             <div> {dayBuilder(new Date(forecast.forecast.forecastday[0].date))}</div>
             <div> {dayBuilder(new Date(forecast.forecast.forecastday[1].date))}</div>
             <div> {dayBuilder(new Date(forecast.forecast.forecastday[2].date))}</div>              
             <div> {dayBuilder(new Date(forecast.forecast.forecastday[3].date))}</div>
             <div> {dayBuilder(new Date(forecast.forecast.forecastday[4].date))}</div>
             <div> {dayBuilder(new Date(forecast.forecast.forecastday[5].date))}</div>
             <div> {dayBuilder(new Date(forecast.forecast.forecastday[6].date))}</div>

             </div>
             <div className = "maxTemp">
             <h3>Max </h3>
              <div>{forecast.forecast.forecastday[0].day.maxtemp_c}°C </div>
              <div>{forecast.forecast.forecastday[1].day.maxtemp_c}°C </div>
              <div>{forecast.forecast.forecastday[2].day.maxtemp_c}°C </div>
              <div>{forecast.forecast.forecastday[3].day.maxtemp_c}°C </div>
              <div>{forecast.forecast.forecastday[4].day.maxtemp_c}°C </div>
              <div>{forecast.forecast.forecastday[5].day.maxtemp_c}°C </div>
              <div>{forecast.forecast.forecastday[6].day.maxtemp_c}°C </div>
             </div>
             <div className = "minTemp">
             <h3>Min</h3>
             <div>{forecast.forecast.forecastday[0].day.mintemp_c}°C </div>
              <div>{forecast.forecast.forecastday[1].day.mintemp_c}°C</div>
              <div>{forecast.forecast.forecastday[2].day.mintemp_c}°C </div>
              <div>{forecast.forecast.forecastday[3].day.mintemp_c}°C </div>
              <div>{forecast.forecast.forecastday[4].day.mintemp_c}°C </div>
              <div>{forecast.forecast.forecastday[5].day.mintemp_c}°C </div>
              <div>{forecast.forecast.forecastday[6].day.mintemp_c}°C </div>
             </div>
          </div>
          </main>
    </div>
  );
}

export default App;
