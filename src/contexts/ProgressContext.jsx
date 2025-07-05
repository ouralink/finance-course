import React, { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext();

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState({
    modules: {},
    quizzes: {}
  });

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem('financeAcademyProgress');
      if (savedProgress) {
        setProgress(JSON.parse(savedProgress));
      }
    } catch (error) {
      console.error('Error loading progress from localStorage:', error);
      // Initialize with empty progress if there's an error
      setProgress({
        modules: {},
        quizzes: {}
      });
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('financeAcademyProgress', JSON.stringify(progress));
    } catch (error) {
      console.error('Error saving progress to localStorage:', error);
    }
  }, [progress]);

  const markModuleComplete = (yearNumber, moduleIndex) => {
    try {
      setProgress(prev => ({
        ...prev,
        modules: {
          ...prev.modules,
          [`${yearNumber}-${moduleIndex}`]: true
        }
      }));
    } catch (error) {
      console.error('Error marking module complete:', error);
    }
  };

  const markModuleIncomplete = (yearNumber, moduleIndex) => {
    try {
      setProgress(prev => ({
        ...prev,
        modules: {
          ...prev.modules,
          [`${yearNumber}-${moduleIndex}`]: false
        }
      }));
    } catch (error) {
      console.error('Error marking module incomplete:', error);
    }
  };

  const isModuleComplete = (yearNumber, moduleIndex) => {
    try {
      return progress.modules[`${yearNumber}-${moduleIndex}`] || false;
    } catch (error) {
      console.error('Error checking module completion:', error);
      return false;
    }
  };

  const saveQuizScore = (yearNumber, moduleIndex, score, totalQuestions) => {
    try {
      setProgress(prev => ({
        ...prev,
        quizzes: {
          ...prev.quizzes,
          [`${yearNumber}-${moduleIndex}`]: {
            score,
            totalQuestions,
            completed: true,
            timestamp: new Date().toISOString()
          }
        }
      }));
    } catch (error) {
      console.error('Error saving quiz score:', error);
    }
  };

  const getQuizScore = (yearNumber, moduleIndex) => {
    try {
      return progress.quizzes[`${yearNumber}-${moduleIndex}`] || null;
    } catch (error) {
      console.error('Error getting quiz score:', error);
      return null;
    }
  };

  const getYearProgress = (yearNumber) => {
    try {
      // This is a simplified calculation - in a real app you'd want to pass the curriculum data
      const moduleKeys = Object.keys(progress.modules).filter(key => 
        key.startsWith(`${yearNumber}-`)
      );
      
      if (moduleKeys.length === 0) return 0;
      
      const completedModules = moduleKeys.filter(key => progress.modules[key]).length;
      return (completedModules / moduleKeys.length) * 100;
    } catch (error) {
      console.error('Error calculating year progress:', error);
      return 0;
    }
  };

  const getTotalProgress = () => {
    try {
      const allModules = Object.keys(progress.modules);
      if (allModules.length === 0) return 0;
      
      const completedModules = allModules.filter(key => progress.modules[key]).length;
      return (completedModules / allModules.length) * 100;
    } catch (error) {
      console.error('Error calculating total progress:', error);
      return 0;
    }
  };

  const value = {
    progress,
    markModuleComplete,
    markModuleIncomplete,
    isModuleComplete,
    saveQuizScore,
    getQuizScore,
    getYearProgress,
    getTotalProgress
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

