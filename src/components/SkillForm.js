import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './SkillForm.css';
import axios from 'axios';

const SkillForm = () => {
  const [profileName, setProfileName] = useState('');
  const [skillCategory, setSkillCategory] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8600/api/skills', {
        profileName,
        skillCategory
      });
      console.log(response.data);
      // Redirect to Blank.js after successful submission
      navigate('/blank');
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="skill-form-container">
      <h2>Add Your Skill</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="profileName">Profile Name</label>
          <input
            type="text"
            id="profileName"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="skillCategory">Skill Category</label>
          <input
            type="text"
            id="skillCategory"
            value={skillCategory}
            onChange={(e) => setSkillCategory(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SkillForm;
