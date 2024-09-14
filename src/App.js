import './App.css';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import AdminDashboard from './components/AdminDashboard';
import Blank from './components/Blank';
import SkillForm from './components/SkillForm';
import SkillList from './components/SkillList';
import AdditionalInformation from './components/AdditionalInformation';
import DataDisplay from './components/DisplayData';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/blank" element={<Blank />} />
        <Route path="/skill-form" element={<SkillForm />} /> {/* SkillForm route */}
        <Route path="/list" element={<SkillList />} />
        <Route path="/additionalInformation" element={<AdditionalInformation />} />
        <Route path="/data-display" element={<DataDisplay />} />
      </Routes>
    </Router>
  );
}

export default App;
