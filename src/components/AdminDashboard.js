import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [skills, setSkills] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const skillsResponse = await axios.get('http://localhost:8800/api/skills');
        const usersResponse = await axios.get('http://localhost:8800/api/auth/admin/users');
        setSkills(skillsResponse.data);
        setUsers(usersResponse.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <section>
        <h2>Skills</h2>
        <table>
          <thead>
            <tr>
              <th>Profile Name</th>
              <th>Skill Category</th>
            </tr>
          </thead>
          <tbody>
            {skills.map(skill => (
              <tr key={skill._id}>
                <td>{skill.profileName}</td>
                <td>{skill.skillCategory}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminDashboard;