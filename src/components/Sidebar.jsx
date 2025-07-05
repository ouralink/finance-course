import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, BookOpen, Award, TrendingUp, X, CheckCircle, Circle } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';

const Sidebar = ({ isOpen, onClose, curriculum }) => {
  const location = useLocation();
  const { getYearProgress, getTotalProgress, isModuleComplete } = useProgress();

  if (!curriculum || !curriculum.years) {
    return (
      <div className="h-full flex flex-col bg-white">
        <div className="p-6 text-center">
          <div className="skeleton w-full h-4 rounded mb-2"></div>
          <div className="skeleton w-3/4 h-4 rounded"></div>
        </div>
      </div>
    );
  }

  const totalProgress = getTotalProgress();
  const totalModules = curriculum.years.reduce((total, year) => {
    return total + (year.modules ? year.modules.length : 0);
  }, 0);

  const completedModules = Object.values(useProgress().progress.modules || {}).filter(Boolean).length;

  return (
    <div className="h-full flex flex-col bg-white shadow-strong">
      {/* Mobile close button */}
      <div className="lg:hidden flex justify-between items-center p-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900">Course Navigation</h3>
        <button
          onClick={onClose}
          className="p-2 rounded-xl hover:bg-gray-100 transition-all duration-200 hover-scale"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Progress Summary */}
      <div className="p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50 border-b border-gray-100">
        <div className="text-center space-y-4">
          <div className="relative inline-flex">
            <svg className="w-20 h-20 transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                className="text-gray-200"
              />
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 36}`}
                strokeDashoffset={`${2 * Math.PI * 36 * (1 - totalProgress / 100)}`}
                className="text-blue-500 progress-ring-circle"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-gray-900">{Math.round(totalProgress)}%</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-bold text-gray-900">Your Journey</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Master finance with our comprehensive curriculum designed to match top university standards
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-white rounded-xl p-3 shadow-soft">
                <div className="text-lg font-bold text-blue-600">{completedModules}</div>
                <div className="text-xs text-gray-600">Completed</div>
              </div>
              <div className="bg-white rounded-xl p-3 shadow-soft">
                <div className="text-lg font-bold text-gray-900">{totalModules}</div>
                <div className="text-xs text-gray-600">Total Modules</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Navigation */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-2">
          {curriculum.years.map((year, yearIndex) => {
            if (!year || !year.modules) return null;
            
            const yearProgress = getYearProgress(year.number);
            const isCurrentYear = location.pathname.includes(`/year/${year.number}`);
            const completedYearModules = year.modules.filter((_, index) => 
              isModuleComplete(year.number, index)
            ).length;
            
            return (
              <div key={year.number} className="space-y-1">
                <Link
                  to={`/year/${year.number}`}
                  className={`group flex items-center justify-between p-4 rounded-2xl transition-all duration-300 hover-lift ${
                    isCurrentYear
                      ? 'bg-gradient-to-r from-blue-50 to-emerald-50 border-2 border-blue-200 shadow-medium'
                      : 'hover:bg-gray-50 border-2 border-transparent'
                  }`}
                  onClick={() => onClose && onClose()}
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <div className={`relative p-2 rounded-xl transition-all duration-200 ${
                      isCurrentYear 
                        ? 'bg-gradient-to-br from-blue-500 to-emerald-500 text-white shadow-medium' 
                        : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600'
                    }`}>
                      <BookOpen className="h-4 w-4" />
                      {yearProgress === 100 && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-2.5 w-2.5 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        Year {year.number}
                      </div>
                      <div className="text-sm text-gray-600 truncate">
                        {year.title || `Year ${year.number} Curriculum`}
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-1000"
                            style={{ width: `${yearProgress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-gray-500">
                          {Math.round(yearProgress)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={`h-4 w-4 transition-all duration-200 ${
                    isCurrentYear ? 'text-blue-600 rotate-90' : 'text-gray-400 group-hover:text-blue-600'
                  }`} />
                </Link>

                {/* Show modules if current year */}
                {isCurrentYear && year.modules && (
                  <div className="ml-6 space-y-1 slide-in-right">
                    {year.modules.map((module, index) => {
                      if (!module) return null;
                      
                      const isCurrentModule = location.pathname.includes(`/module/${index}`);
                      const moduleCompleted = isModuleComplete(year.number, index);
                      
                      return (
                        <Link
                          key={index}
                          to={`/year/${year.number}/module/${index}`}
                          className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 hover-scale ${
                            isCurrentModule
                              ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-soft'
                              : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                          }`}
                          onClick={() => onClose && onClose()}
                        >
                          <div className={`p-1 rounded-lg ${
                            moduleCompleted 
                              ? 'bg-emerald-100 text-emerald-600' 
                              : 'bg-gray-100 text-gray-400'
                          }`}>
                            {moduleCompleted ? (
                              <CheckCircle className="h-3 w-3" />
                            ) : (
                              <Circle className="h-3 w-3" />
                            )}
                          </div>
                          <span className="text-sm font-medium truncate">
                            {module.name || `Module ${index + 1}`}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Achievement */}
      <div className="p-4 bg-gradient-to-r from-emerald-50 to-blue-50 border-t border-gray-100">
        <div className="flex items-center space-x-3 p-3 bg-white rounded-xl shadow-soft">
          <div className="p-2 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl">
            <Award className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-gray-900">Finance Expert</div>
            <div className="text-xs text-gray-600">Complete all modules to earn</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;