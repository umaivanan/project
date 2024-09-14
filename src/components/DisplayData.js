// src/DataDisplay.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataDisplay = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/formdata/data-display');
        setData(response.data);
      } catch (error) {
        setError('Error fetching data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Form Data Display</h1>
      <table>
        <thead>
          <tr>
            <th>Where I Live</th>
            <th>Decade I Was Born</th>
            <th>Time Spent</th>
            <th>My Work</th>
            <th>Languages I Speak</th>
            <th>About Me</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.whereILive}</td>
              <td>{item.decadeBorn}</td>
              <td>{item.timeSpent}</td>
              <td>{item.work}</td>
              <td>{item.languages}</td>
              <td>{item.aboutMe}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataDisplay;
