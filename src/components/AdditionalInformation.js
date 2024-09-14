import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for HTTP requests

const AdditionalInformation = () => {
  const [whereILive, setWhereILive] = useState('');
  const [decadeBorn, setDecadeBorn] = useState('');
  const [timeSpent, setTimeSpent] = useState('');
  const [work, setWork] = useState('');
  const [languages, setLanguages] = useState('');
  const [aboutMe, setAboutMe] = useState('');

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Loading state for submission
  const navigate = useNavigate();

  // Validate each field to make sure all are filled
  const validateForm = () => {
    let formErrors = {};
    if (!whereILive.trim()) formErrors.whereILive = 'Where I Live is required';
    if (!decadeBorn.trim()) formErrors.decadeBorn = 'Decade I Was Born is required';
    if (!timeSpent.trim()) formErrors.timeSpent = 'Time spent is required';
    if (!work.trim()) formErrors.work = 'Work is required';
    if (!languages.trim()) formErrors.languages = 'Languages are required';
    if (!aboutMe.trim()) formErrors.aboutMe = 'About Me is required';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true); // Show loading while submitting
      try {
        // Send form data to backend
        const response = await axios.post('http://localhost:8800/api/formdata', { // Updated URL
          whereILive,
          decadeBorn,
          timeSpent,
          work,
          languages,
          aboutMe,
        });
        console.log(response.data);

        // Notify the user and navigate to another page
        alert('Successfully submitted your information!');
        navigate('/list'); // Navigate to the list page immediately
      } catch (error) {
        console.error('Error submitting additional information', error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    }
  };

  return (
    <div className="form-container">
      <form className="additional-information-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="whereILive">Where I Live</label>
          <input
            type="text"
            id="whereILive"
            value={whereILive}
            onChange={(e) => setWhereILive(e.target.value)}
          />
          {errors.whereILive && <span className="error">{errors.whereILive}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="decadeBorn">Decade I Was Born</label>
          <input
            type="text"
            id="decadeBorn"
            value={decadeBorn}
            onChange={(e) => setDecadeBorn(e.target.value)}
          />
          {errors.decadeBorn && <span className="error">{errors.decadeBorn}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="timeSpent">I Spend Too Much Time</label>
          <input
            type="text"
            id="timeSpent"
            value={timeSpent}
            onChange={(e) => setTimeSpent(e.target.value)}
          />
          {errors.timeSpent && <span className="error">{errors.timeSpent}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="work">My Work</label>
          <input
            type="text"
            id="work"
            value={work}
            onChange={(e) => setWork(e.target.value)}
          />
          {errors.work && <span className="error">{errors.work}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="languages">Languages I Speak</label>
          <input
            type="text"
            id="languages"
            value={languages}
            onChange={(e) => setLanguages(e.target.value)}
          />
          {errors.languages && <span className="error">{errors.languages}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="aboutMe">About Me</label>
          <textarea
            id="aboutMe"
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
            className="large-input"
          />
          {errors.aboutMe && <span className="error">{errors.aboutMe}</span>}
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default AdditionalInformation;
