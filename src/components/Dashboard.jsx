import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Award, TrendingUp, ChevronRight, Play, Users, Star, Target, Zap, Trophy } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';

const Dashboard = ({ curriculum }) => {
  const { getTotalProgress, getYearProgress, progress } = useProgress();

  if (!curriculum || !curriculum.years) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <div className="text-center space-y-4">
          <div className="skeleton w-64 h-8 rounded mx-auto"></div>
          <div className="skeleton w-96 h-4 rounded mx-auto"></div>
        </div>
      </div>
    );
  }

  const totalProgress = getTotalProgress();
  const totalModules = curriculum.years.reduce((total, year) => {
    return total + (year.modules ? year.modules.length : 0);
  }, 0);
  
  const completedModules = Object.values(progress.modules || {}).filter(Boolean).length;
  const completedQuizzes = Object.keys(progress.quizzes || {}).length;

  const stats = [
    {
      label: 'Total Modules',
      value: totalModules,
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      bg: 'from-blue-50 to-blue-100'
    },
    {
      label: 'Completed',
      value: completedModules,
      icon: Trophy,
      color: 'from-emerald-500 to-emerald-600',
      bg: 'from-emerald-50 to-emerald-100'
    },
    {
      label: 'Progress',
      value: `${Math.round(totalProgress)}%`,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      bg: 'from-purple-50 to-purple-100'
    },
    {
      label: 'Quizzes Taken',
      value: completedQuizzes,
      icon: Star,
      color: 'from-orange-500 to-orange-600',
      bg: 'from-orange-50 to-orange-100'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 fade-in-up">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-700 to-emerald-600 rounded-3xl p-8 md:p-12 text-white shadow-strong">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>
        
        <div className="relative max-w-4xl">
          <div className="inline-flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2 mb-6 glass">
            <Zap className="h-4 w-4" />
            <span className="text-sm font-medium">Ivy League Standard</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Master Finance with
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              World-Class Education
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed max-w-3xl">
            Comprehensive curriculum designed to match top university standards. 
            Build expertise through hands-on learning and real-world applications.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/year/1"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl hover:bg-blue-50 transition-all duration-300 shadow-medium hover:shadow-strong hover-lift group"
            >
              <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Start Your Journey
            </Link>
            <button className="inline-flex items-center px-8 py-4 bg-white/20 text-white font-semibold rounded-2xl hover:bg-white/30 transition-all duration-300 glass">
              <Users className="h-5 w-5 mr-2" />
              Join 10,000+ Students
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="group hover-lift scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100 group-hover:shadow-medium transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.bg} group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`h-6 w-6 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} />
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900 group-hover:scale-105 transition-transform">
                    {stat.value}
                  </p>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-3xl p-8 shadow-soft border border-gray-100 hover:shadow-medium transition-all duration-300">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Learning Journey</h2>
            <p className="text-gray-600">Track your progress across all years and modules</p>
          </div>
          <Link 
            to="/year/1"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-emerald-600 transition-all duration-300 shadow-medium hover:shadow-strong hover-lift"
          >
            Continue Learning
            <ChevronRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
        
        {/* Overall Progress */}
        <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Target className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-semibold text-gray-900">Overall Progress</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">{Math.round(totalProgress)}%</span>
          </div>
          <div className="w-full bg-white rounded-full h-4 shadow-inner overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-emerald-500 h-4 rounded-full transition-all duration-1000 progress-fill shadow-medium"
              style={{ width: `${totalProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            {completedModules} of {totalModules} modules completed • Keep up the great work!
          </p>
        </div>

        {/* Year Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {curriculum.years.map((year, index) => {
            if (!year || !year.modules) return null;
            
            const yearProgress = getYearProgress(year.number);
            const yearModules = year.modules.length;
            const completedYearModules = year.modules.filter((_, moduleIndex) => 
              progress.modules[`${year.number}-${moduleIndex}`]
            ).length;

            return (
              <Link
                key={year.number}
                to={`/year/${year.number}`}
                className="group block p-6 bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl hover:border-blue-300 hover:shadow-medium transition-all duration-300 hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-2xl transition-all duration-300 ${
                      yearProgress === 100 
                        ? 'bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-600' 
                        : 'bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600'
                    } group-hover:scale-110`}>
                      {yearProgress === 100 ? (
                        <Trophy className="h-6 w-6" />
                      ) : (
                        <BookOpen className="h-6 w-6" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        Year {year.number}
                      </h3>
                      <p className="text-gray-600 font-medium">
                        {year.title || year.name || `Year ${year.number} Curriculum`}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" />
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Progress</span>
                    <span className="text-lg font-bold text-gray-900">{Math.round(yearProgress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-3 rounded-full transition-all duration-1000 ${
                        yearProgress === 100 
                          ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' 
                          : 'bg-gradient-to-r from-blue-500 to-emerald-500'
                      }`}
                      style={{ width: `${yearProgress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>{completedYearModules} of {yearModules} completed</span>
                    {yearProgress === 100 && (
                      <span className="text-emerald-600 font-semibold">✓ Complete</span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Featured Topics:</p>
                  <div className="flex flex-wrap gap-2">
                    {year.modules.slice(0, 3).map((module, moduleIndex) => (
                      <span key={moduleIndex} className="text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full font-medium">
                        {module.name?.split(' ').slice(0, 2).join(' ') || `Module ${moduleIndex + 1}`}
                      </span>
                    ))}
                    {year.modules.length > 3 && (
                      <span className="text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full font-medium">
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
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 rounded-3xl p-8 text-center border border-gray-200">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/50 to-blue-100/50"></div>
        <div className="relative">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl mb-6 shadow-medium">
            <Award className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Advance Your Finance Career?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of students who have transformed their careers with our comprehensive finance curriculum. 
            Start your journey today and unlock your potential.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/year/1"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-bold rounded-2xl hover:from-emerald-700 hover:to-blue-700 transition-all duration-300 shadow-medium hover:shadow-strong hover-lift"
            >
              Continue Learning
              <ChevronRight className="h-5 w-5 ml-2" />
            </Link>
            <button className="inline-flex items-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-2xl hover:bg-gray-50 transition-all duration-300 shadow-soft border border-gray-200">
              <Clock className="h-5 w-5 mr-2" />
              View Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;