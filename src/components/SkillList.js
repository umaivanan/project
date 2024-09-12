import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SkillList.css'; // Custom styling

const SkillList = () => {
  const [skills, setSkills] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get('http://localhost:8600/api/skills');
        setSkills(response.data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8600/api/users');
        setAllUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchSkills();
    fetchUsers();
  }, []);

  const handleShowMore = (skillId) => {
    navigate(`/skills/${skillId}`);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredSkills = skills.filter((skill) =>
    skill.skillCategory.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="skilllist-container">
      {/* Left Section: User profile information */}
      <div className="left-section">
        <div className="user-info">
          <h2>Your Profile</h2>
          <img
            src="https://via.placeholder.com/120"
            alt="Profile"
            className="profile-pic"
          />
          <h3>John Doe</h3>
          <p>Web Developer</p>
        </div>
      </div>

      {/* Center Section: Search bar and Cards of skills */}
      <div className="center-section">
        <h1 className="page-title">Explore Talents</h1>
        <div className="search-bar-container">
          <input
            type="text"
            className="search-input"
            placeholder="What kind of skill do you need?"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="skills-grid">
          {filteredSkills.length > 0 ? (
            filteredSkills.map((skill) => (
              <div key={skill._id} className="skill-card">
                <h3 className="skill-name">{skill.profileName}</h3>
                <p className="skill-category">{skill.skillCategory}</p>
                {skill.profilePicture && (
                  <img
                    src={`http://localhost:8600${skill.profilePicture}`}
                    alt={skill.profileName}
                    className="profile-picture"
                  />
                )}
                <button
                  className="show-more-button"
                  onClick={() => handleShowMore(skill._id)}
                >
                  Show More
                </button>
              </div>
            ))
          ) : (
            <p className="no-skills-message">No talents found yet.</p>
          )}
        </div>
      </div>

      {/* Right Section: List of all users */}
      <div className="right-section">
        <h2>All Users</h2>
        <ul className="user-list">
          {allUsers.map((user) => (
            <li key={user._id}>
              <p>{user.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  
};

export default SkillList;
