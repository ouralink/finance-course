import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, BookOpen, Award, TrendingUp, X } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';

const Sidebar = ({ isOpen, onClose, curriculum }) => {
  const location = useLocation();
  const { getYearProgress, getTotalProgress } = useProgress();

  // Add safety checks
  if (!curriculum || !curriculum.years) {
    return (
      <div className="h-full flex flex-col bg-white">
        <div className="p-6 text-center">
          <p className="text-gray-500">Loading curriculum...</p>
        </div>
      </div>
    );
  }

  const totalProgress = getTotalProgress();
  const totalModules = curriculum.years.reduce((total, year) => {
    return total + (year.modules ? year.modules.length : 0);
  }, 0);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Mobile close button */}
      <div className="lg:hidden flex justify-end p-4">
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Progress Summary */}
      <div className="p-6 border-b border-gray-200">
        <div className="text-center">
          <h3 className="font-semibold text-gray-900 mb-2">Your Progress</h3>
          <p className="text-sm text-gray-600 mb-4">
            Complete all modules to earn your Finance Academy certificate!
          </p>
          
          <div className="bg-gray-100 rounded-full h-2 mb-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-emerald-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${totalProgress}%` }}
            ></div>
          </div>
          
          <div className="text-sm text-gray-600">
            Overall Progress
            <span className="font-semibold text-gray-900 ml-1">
              {totalModules} modules
            </span>
          </div>
        </div>
      </div>

      {/* Course Navigation */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
            Course Navigation
          </h3>
          
          <div className="space-y-2">
            {curriculum.years.map((year) => {
              if (!year || !year.modules) return null;
              
              const yearProgress = getYearProgress(year.number);
              const isCurrentYear = location.pathname.includes(`/year/${year.number}`);
              
              return (
                <div key={year.number}>
                  <Link
                    to={`/year/${year.number}`}
                    className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 group ${
                      isCurrentYear
                        ? 'bg-blue-50 border-l-4 border-blue-500'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => onClose && onClose()}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        isCurrentYear 
                          ? 'bg-blue-100 text-blue-600' 
                          : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600'
                      }`}>
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Year {year.number}</div>
                        <div className="text-sm text-gray-600 truncate max-w-40">
                          {year.title || year.name || `Year ${year.number}`}
                        </div>
                        <div className="text-xs text-gray-500">
                          {Math.round(yearProgress)}%
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={`h-4 w-4 transition-transform ${
                      isCurrentYear ? 'text-blue-600 rotate-90' : 'text-gray-400'
                    }`} />
                  </Link>

                  {/* Show modules if current year */}
                  {isCurrentYear && year.modules && (
                    <div className="ml-6 mt-2 space-y-1 border-l-2 border-gray-100 pl-4">
                      {year.modules.map((module, index) => {
                        if (!module) return null;
                        
                        const isCurrentModule = location.pathname.includes(`/module/${index}`);
                        return (
                          <Link
                            key={index}
                            to={`/year/${year.number}/module/${index}`}
                            className={`block p-2 rounded text-sm transition-colors ${
                              isCurrentModule
                                ? 'bg-blue-50 text-blue-700 font-medium'
                                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                            }`}
                            onClick={() => onClose && onClose()}
                          >
                            {module.name || `Module ${index + 1}`}
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
      </div>

      {/* Bottom Stats */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-gray-900">{totalProgress.toFixed(0)}%</div>
            <div className="text-xs text-gray-600">Complete</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">{totalModules}</div>
            <div className="text-xs text-gray-600">Modules</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

