import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './virus.svg';
import './App.scss';

const Global = () => {
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
    <div>
      <h1>Global Data</h1>
      {globalData ? 
        <div>
          <div>Cases: {globalData.cases}</div>
          <div>Recovered: {globalData.recovered}</div>
          <div>Deaths: {globalData.deaths}</div>
        </div>
      : 'Loading...'
      }
    </div>
  )
}

export default Global