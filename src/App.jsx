import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import YearView from './components/YearView';
import ModuleView from './components/ModuleView';
import QuizView from './components/QuizView';
import { ProgressProvider } from './contexts/ProgressContext';
import curriculumData from './parsed_curriculum.json';
import quizzesData from './parsed_quizzes.json';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ProgressProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header 
            onMenuClick={() => setSidebarOpen(!sidebarOpen)}
            sidebarOpen={sidebarOpen}
          />
          
          <div className="flex pt-16">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-40 w-80 transform transition-transform duration-300 ease-in-out pt-16 ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } lg:translate-x-0 lg:static lg:inset-0 lg:pt-0`}>
              <Sidebar 
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                curriculum={curriculumData}
              />
            </div>
            
            {/* Overlay for mobile */}
            {sidebarOpen && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}
            
            {/* Main content */}
            <main className="flex-1 min-h-screen bg-gray-50 lg:ml-0">
              <div className="p-6 max-w-7xl mx-auto">
                <Routes>
                  <Route path="/" element={<Dashboard curriculum={curriculumData} />} />
                  <Route path="/year/:yearNumber" element={<YearView curriculum={curriculumData} />} />
                  <Route path="/year/:yearNumber/module/:moduleIndex" element={<ModuleView curriculum={curriculumData} />} />
                  <Route path="/year/:yearNumber/module/:moduleIndex/quiz" element={<QuizView quizzes={quizzesData} />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
            </main>
          </div>
        </div>
      </Router>
    </ProgressProvider>
  );
}

export default App;