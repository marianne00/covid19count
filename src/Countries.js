import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Countries = () => {
  // const [lastChecked, setLastChecked] = useState('');
  const [coronaData, setCoronaData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setLoading] = useState(false);
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  const results = !searchTerm
  ? coronaData
  : coronaData.filter(v =>
      v.country.toLowerCase().includes(searchTerm.toLocaleLowerCase().trim())
    )

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axios.get("https://coronavirus-19-api.herokuapp.com/countries");
      setCoronaData(res.data);
      setLoading(false);
    }
    fetchData();
  }, [])
  
  return (
    <div className="container">
      <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleChange}
          className="search-bar"
        />
        {isLoading ? <p className="loading">Loading...</p> : '' }
        <div className="country-wrapper">
          {results ? 
            results.map((country, i) => {
              return (
                <div key={i} className="country-item">
                  <strong>{country.country}</strong>
                  <p>Confirmed Cases: {country.cases} | Last Increase: {country.todayCases}</p>
                  <p>Death/s: {country.deaths} | Today's deaths: {country.todayDeaths}</p>
                  <p>Recovered: {country.recovered}</p>
                  <p>Active: {country.active} | Critical: {country.critical}</p>
                  <p>Cases per one million: {country.casesPerOneMillion}</p>
                </div>
              )
            }) : 'Loading...'
          }
        </div>
    </div>
  );
}

export default Countries;