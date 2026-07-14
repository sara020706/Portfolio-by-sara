import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext';
import LoginForm from '../components/LoginForm';
import Sidebar from '../components/Sidebar';
import Overview from './Overview';
import ProjectsManager from './ProjectsManager';
import CertificationsManager from './CertificationsManager';
import SkillsManager from './SkillsManager';
import BadgesManager from './BadgesManager';
import ExperienceManager from './ExperienceManager';

function DashboardLayout() {
  const { token } = useAuth();

  if (!token) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-gray-950 flex text-white font-sans">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gray-950">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/projects" element={<ProjectsManager />} />
          <Route path="/certifications" element={<CertificationsManager />} />
          <Route path="/skills" element={<SkillsManager />} />
          <Route path="/badges" element={<BadgesManager />} />
          <Route path="/internships" element={<ExperienceManager />} />
        </Routes>
      </main>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <AuthProvider>
      <DashboardLayout />
    </AuthProvider>
  );
}
