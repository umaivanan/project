import React, { useState } from 'react';
import './SkillForm.css'
const SkillForm = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [skillCategories, setSkillCategories] = useState([]);
  const [pdfModule, setPdfModule] = useState(null);

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handlePdfModuleChange = (e) => {
    setPdfModule(e.target.files[0]);
  };

  const handleSkillCategoriesChange = (e) => {
    setSkillCategories(e.target.value.split(','));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('profilePicture', profilePicture);
    formData.append('pdfModule', pdfModule);
    formData.append('skillCategories', skillCategories.join(','));

    try {
      const response = await fetch('http://localhost:8600/api/skills/add', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Submit Your Skill</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Profile Picture:</label>
          <input type="file" onChange={handleProfilePictureChange} />
        </div>
        <div>
          <label>Skill Categories (comma-separated):</label>
          <input type="text" onChange={handleSkillCategoriesChange} />
        </div>
        <div>
          <label>PDF Module:</label>
          <input type="file" onChange={handlePdfModuleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SkillForm;
