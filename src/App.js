import './App.css';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage'; // Import the new LoginPage component
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddSkillPage from './components/AddSkillPage'; // Import the AddSkillPage component
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} /> {/* Add this line */}
        <Route path="/add-skill" element={<AddSkillPage />} /> {/* Add this line */}
      </Routes>
    </Router>
  );
}

export default App;
