import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './SkillForm.css';

const SkillForm = () => {
  const [profileName, setProfileName] = useState('');
  const [skillCategory, setSkillCategory] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate(); // Create navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('profileName', profileName);
    formData.append('skillCategory', skillCategory);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    try {
      const response = await axios.post('http://localhost:8800/api/skills', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);

      // Navigate to additionalInformation.js after successful submission
      navigate('/additionalInformation'); // Redirects to additionalInformation
    } catch (error) {
      console.error('Error uploading skill', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="profileName">Profile Name</label>
        <input
          type="text"
          id="profileName"
          value={profileName}
          onChange={(e) => setProfileName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="skillCategory">Skill Category</label>
        <input
          type="text"
          id="skillCategory"
          value={skillCategory}
          onChange={(e) => setSkillCategory(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="profilePicture">Profile Picture (Optional)</label>
        <input
          type="file"
          id="profilePicture"
          onChange={(e) => setProfilePicture(e.target.files[0])}
        />
      </div>
      <button type="submit">Continue</button> {/* Button will now navigate to additionalInformation */}
    </form>
  );
};

export default SkillForm;
