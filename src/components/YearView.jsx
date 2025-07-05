import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, Clock, CheckCircle, Circle, ArrowLeft, ArrowRight, Play, FileText, Award, Target, Trophy, Zap } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';

const YearView = ({ curriculum }) => {
  const { yearNumber } = useParams();
  const { isModuleComplete, getYearProgress } = useProgress();
  
  const year = curriculum.years.find(y => y.number === parseInt(yearNumber));
  const yearProgress = getYearProgress(parseInt(yearNumber), year?.modules.length || 0);
  
  if (!year) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Year not found</h1>
        <Link to="/" className="text-blue-600 hover:text-blue-700">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const completedModules = year.modules.filter((_, index) => 
    isModuleComplete(parseInt(yearNumber), index)
  ).length;

  const nextYear = curriculum.years.find(y => v.number === parseInt(yearNumber) + 1);
  const prevYear = curriculum.years.find(y => y.number === parseInt(yearNumber) - 1);

  return (
    <div className="max-w-7xl mx-auto space-y-8 fade-in-up">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-700 to-emerald-600 rounded-3xl p-8 md:p-12 text-white shadow-strong">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
        
        <div className="relative">
          <div className="flex items-center space-x-4 mb-6">
            <Link 
              to="/"
              className="p-3 rounded-2xl bg-white/20 hover:bg-white/30 transition-all duration-200 glass hover-scale"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <div className="inline-flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2 mb-2 glass">
                <Target className="h-4 w-4" />
                <span className="text-sm font-medium">Year {year.number}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{year.title}</h1>
              <p className="text-xl text-blue-100">Master the fundamentals and build your expertise</p>
            </div>
          </div>
          
          {/* Progress Section */}
          <div className="bg-white/20 rounded-2xl p-6 glass">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="relative inline-flex mb-3">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="transparent"
                      className="text-white/30"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 28}`}
                      strokeDashoffset={`${2 * Math.PI * 28 * (1 - yearProgress / 100)}`}
                      className="text-white progress-ring-circle"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold">{Math.round(yearProgress)}%</span>
                  </div>
                </div>
                <div className="text-sm text-blue-100">Overall Progress</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">{completedModules}</div>
                <div className="text-sm text-blue-100">Modules Completed</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">{year.modules.length}</div>
                <div className="text-sm text-blue-100">Total Modules</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {year.modules.map((module, index) => {
          const isComplete = isModuleComplete(parseInt(yearNumber), index);
          const hasResources = module.resources && (
            module.resources.videos.length > 0 ||
            module.resources.courses.length > 0 ||
            module.resources.readings.length > 0 ||
            module.resources.articles.length > 0 ||
            module.resources.tutorials.length > 0
          );

          return (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-soft border border-gray-100 hover:shadow-medium transition-all duration-300 hover-lift overflow-hidden scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Module Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`relative p-3 rounded-2xl transition-all duration-300 group-hover:scale-110 ${
                      isComplete 
                        ? 'bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-600' 
                        : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600'
                    }`}>
                      {isComplete ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <Circle className="h-5 w-5" />
                      )}
                      {isComplete && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <div>
                      <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full mb-2">
                        Module {index + 1}
                      </span>
                      <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-blue-600 transition-colors">
                        {module.name}
                      </h3>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {module.description}
                </p>

                {/* Resource indicators */}
                {hasResources && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {module.resources.videos.length > 0 && (
                      <span className="inline-flex items-center px-3 py-1 bg-red-50 text-red-700 text-xs rounded-full font-medium">
                        <Play className="h-3 w-3 mr-1" />
                        {module.resources.videos.length} Video{module.resources.videos.length > 1 ? 's' : ''}
                      </span>
                    )}
                    {module.resources.courses.length > 0 && (
                      <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium">
                        <BookOpen className="h-3 w-3 mr-1" />
                        {module.resources.courses.length} Course{module.resources.courses.length > 1 ? 's' : ''}
                      </span>
                    )}
                    {(module.resources.readings.length > 0 || module.resources.articles.length > 0) && (
                      <span className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 text-xs rounded-full font-medium">
                        <FileText className="h-3 w-3 mr-1" />
                        Reading{(module.resources.readings.length + module.resources.articles.length) > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex space-x-3">
                  <Link
                    to={`/year/${yearNumber}/module/${index}`}
                    className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 shadow-medium hover:shadow-strong hover-lift"
                  >
                    {isComplete ? (
                      <>
                        <Trophy className="h-4 w-4 mr-2" />
                        Review
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4 mr-2" />
                        Start
                      </>
                    )}
                  </Link>
                  <Link
                    to={`/year/${yearNumber}/module/${index}/quiz`}
                    className="px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 text-purple-700 font-semibold rounded-xl hover:from-purple-100 hover:to-pink-100 transition-all duration-300 hover-scale"
                  >
                    <Award className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Progress indicator */}
              <div className="px-6 pb-4">
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-2 rounded-full transition-all duration-1000 ${
                      isComplete 
                        ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' 
                        : 'bg-gradient-to-r from-blue-500 to-blue-600'
                    }`}
                    style={{ width: isComplete ? '100%' : '0%' }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8">
        <div>
          {prevYear && (
            <Link
              to={`/year/${prevYear.number}`}
              className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-2xl hover:bg-gray-50 transition-all duration-300 shadow-soft hover:shadow-medium hover-lift"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Year {prevYear.number}
            </Link>
          )}
        </div>
        <div>
          {nextYear && (
            <Link
              to={`/year/${nextYear.number}`}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 shadow-medium hover:shadow-strong hover-lift"
            >
              Year {nextYear.number}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          )}
        </div>
      </div>

      {/* Year completion message */}
      {yearProgress === 100 && (
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-blue-50 border border-emerald-200 rounded-3xl p-8 text-center shadow-medium">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/50 to-green-100/50"></div>
          <div className="relative">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl mb-6 shadow-medium">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-emerald-900 mb-4">
              🎉 Congratulations! Year {year.number} Complete
            </h3>
            <p className="text-emerald-700 mb-6 text-lg leading-relaxed max-w-2xl mx-auto">
              Outstanding work! You've successfully mastered all modules in {year.title}. 
              {nextYear && ` You're ready to advance to Year ${nextYear.number} and continue your finance journey.`}
            </p>
            {nextYear && (
              <Link
                to={`/year/${nextYear.number}`}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold rounded-2xl hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-medium hover:shadow-strong hover-lift"
              >
                Continue to Year {nextYear.number}
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default YearView;