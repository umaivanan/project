// src/DataDisplay.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './DataDisplay.css'; // Import custom styling

const DataDisplay = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/formdata');
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

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="data-display-container">
      <h1>Form Data Display</h1>
      <table className="data-table">
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
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item._id}>
                <td>{item.whereILive}</td>
                <td>{item.decadeBorn}</td>
                <td>{item.timeSpent}</td>
                <td>{item.work}</td>
                <td>{item.languages}</td>
                <td>{item.aboutMe}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataDisplay;
