import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Blank.css'; // Custom styling

const Blank = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/skills');
        setSkills(response.data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchSkills();
  }, []);

  return (
    <div className="blank-container">
      <h1 className="page-title">Explore Talents</h1>
      <div className="skills-grid">
        {skills.length > 0 ? (
          skills.map((skill) => (
            <div key={skill._id} className="skill-card">
              <h3 className="skill-name">{skill.profileName}</h3>
              <p className="skill-category">{skill.skillCategory}</p>
            </div>
          ))
        ) : (
          <p className="no-skills-message">No talents found yet.</p>
        )}
      </div>
    </div>
  );
};

export default Blank;