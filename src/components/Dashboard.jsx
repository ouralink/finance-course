import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Award, TrendingUp, ChevronRight, Play, Users, Star } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';

const Dashboard = ({ curriculum }) => {
  const { getTotalProgress, getYearProgress, progress } = useProgress();

  // Add safety checks
  if (!curriculum || !curriculum.years) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h1>
          <p className="text-gray-600">Please wait while we load the curriculum.</p>
        </div>
      </div>
    );
  }

  const totalProgress = getTotalProgress();
  const totalModules = curriculum.years.reduce((total, year) => {
    return total + (year.modules ? year.modules.length : 0);
  }, 0);
  
  // Calculate completed modules from progress
  const completedModules = Object.values(progress.modules || {}).filter(Boolean).length;
  const completedQuizzes = Object.keys(progress.quizzes || {}).length;

  const stats = [
    {
      label: 'Total Modules',
      value: totalModules,
      icon: BookOpen,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      label: 'Completed',
      value: completedModules,
      icon: Award,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    },
    {
      label: 'Progress',
      value: `${Math.round(totalProgress)}%`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      label: 'Quizzes Taken',
      value: completedQuizzes,
      icon: Star,
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-emerald-600 rounded-2xl p-8 text-white">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Ivy League Finance Education
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8">
            Master finance with a comprehensive curriculum designed to match top university standards
          </p>
          <Link
            to="/year/1"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Play className="h-5 w-5 mr-2" />
            Start Learning
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Learning Journey</h2>
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            View Curriculum
          </button>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm font-medium text-gray-900">{Math.round(totalProgress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-600 to-emerald-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${totalProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {completedModules} of {totalModules} modules completed
          </p>
        </div>

        {/* Year Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {curriculum.years.map((year) => {
            if (!year || !year.modules) return null;
            
            const yearProgress = getYearProgress(year.number);
            const yearModules = year.modules.length;
            const completedYearModules = year.modules.filter((_, index) => 
              progress.modules[`${year.number}-${index}`]
            ).length;

            return (
              <Link
                key={year.number}
                to={`/year/${year.number}`}
                className="block p-6 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      Year {year.number}
                    </h3>
                    <p className="text-gray-600 mt-1">
                      {year.title || year.name || `Year ${year.number} Curriculum`}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium text-gray-900">{Math.round(yearProgress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${yearProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {completedYearModules} of {yearModules} modules
                    <span className="ml-2">{yearModules} modules total</span>
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-700">Key Topics:</p>
                  <div className="flex flex-wrap gap-1">
                    {year.modules.slice(0, 3).map((module, index) => (
                      <span key={index} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {module.name || `Module ${index + 1}`}
                      </span>
                    ))}
                    {year.modules.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{year.modules.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to Continue Learning?
        </h2>
        <p className="text-gray-600 mb-6">
          Pick up where you left off or start a new module to advance your finance knowledge.
        </p>
        <Link
          to="/year/1"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-200"
        >
          Continue Learning
          <ChevronRight className="h-5 w-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;

