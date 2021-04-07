import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Find = ({newCountry, handleCountryChange}) => {
  return (
    <div>
      find countries: <input 
      value={newCountry}
      onChange={handleCountryChange}/>
    </div>
  )
}

const Countries = ({countries, filter}) => {
  const show = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  const show2 = (show.length > 10)
   ? (<div>Too many matches, specify another filter</div>) 
   : (show.length === 1) 
    ?  (<DisplayOne country={show[0]}/>)
    : (show.map(country => 
      <DisplayMany key={country.name} country={country}/>))

  return show2
}

const DisplayMany = ({country}) => {
  const [showCountry, setShowCountry] = useState(false)

  const handleButtonClick = () => {
    setShowCountry(country);
  };

  return (
    <div>
      {showCountry && (<DisplayOne country = {country} />)}
      {!(showCountry) && <div>{country.name}
      <button onClick={handleButtonClick}>show</button></div>}
    </div>
  )
}

const DisplayOne = ({country}) => {
  const [weather, setWeather] = useState(undefined)

  const api_key = process.env.REACT_APP_API_KEY
  const capi = country.capital
  const WEATHER_API = `http://api.weatherstack.com/current?access_key=${api_key}&query=${capi}`

  if (weather === undefined) {
    axios
      .get(WEATHER_API)
      .then((response) => {
        setWeather(response.data.current)
        console.log(response.data)
      })
      .catch((error) => console.log(error))
  }

  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital: {country.capital}</div>
      <div>population: {country.population}</div>
      <h3>languages</h3>
      <ul>
        {country.languages.map(language =>
          <li key={language.name}>
            {language.name}
          </li>)}
      </ul>
      <img src={country.flag} alt="Flag"
        width="400" 
        height="300"/>
      <h3>weather in {country.capital}</h3>
      {(weather === undefined) 
        ? (<div>please wait...</div>)
        : (
        <div>
          <div><strong>temparature: </strong> {weather.temperature} Celcius</div>
          <img src={weather.weather_icons[0]} alt="weather pic"/><br/>
          <div><strong>wind: </strong> {weather.wind_speed} mph direction {weather.wind_dir}</div>
        </div>)}
    </div>
  )
}


const App = () => {
  const [countries, setCountries] = useState([]) 
  const [newCountry, setNewCountry] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleCountryChange = (event) => {
    setNewCountry(event.target.value)
  }

  return (
    <div>
      <Find newCountry={newCountry} handleCountryChange={handleCountryChange}/>
      <Countries countries={countries} filter={newCountry}/>
    </div>
  )
}

export default App;
