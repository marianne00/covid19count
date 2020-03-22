import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './virus.svg';
import './App.scss';

const Header = () => {
  const [globalData, setGlobalData] = useState('')
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    const fetchGlobalData = async () => {
      setLoading(true);
      const res = await axios.get('https://coronavirus-19-api.herokuapp.com/all')
      setGlobalData(res.data) 
      setLoading(false);
    }

    setTimeout(() => {
      fetchGlobalData();
    }, 1000);
  }, [globalData])

  return (
    <header className="App-header">
      <nav className="navbar fixed-top navbar-light bg-light">
        <span className="navbar-brand mb-0 h1 d-flex align-items-center flex-wrap">
          <img src={logo} className="svg"/>
          COVID19 Count
          <a href="https://github.com/Marianne00" className="author-name">Author: Marianne de Asis</a>
          </span>
        {globalData ? 
          <div className="global-data-wrapper">
            <div>Global Data</div>
            <div>Cases: {globalData.cases}</div>
            <div>Recovered: {globalData.recovered}</div>
            <div>Deaths: {globalData.deaths}</div>
          </div>
        : 'Loading...'
        }
      </nav>
    </header>
  )
}

export default Header