import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, Clock, CheckCircle, Circle, ArrowLeft, ArrowRight, Play, FileText, Award } from 'lucide-react';
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

  const nextYear = curriculum.years.find(y => y.number === parseInt(yearNumber) + 1);
  const prevYear = curriculum.years.find(y => y.number === parseInt(yearNumber) - 1);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-emerald-600 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-4 mb-4">
          <Link 
            to="/"
            className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-4xl font-bold">Year {year.number}</h1>
            <p className="text-xl text-blue-100">{year.title}</p>
          </div>
        </div>
        
        {/* Progress */}
        <div className="bg-white/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-blue-100">Year Progress</span>
            <span className="font-bold">{Math.round(yearProgress)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-1000"
              style={{ width: `${yearProgress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-blue-100 mt-2">
            <span>{completedModules} completed</span>
            <span>{year.modules.length} total modules</span>
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
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200 hover-lift overflow-hidden"
            >
              {/* Module Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      isComplete 
                        ? 'bg-emerald-100 text-emerald-600' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {isComplete ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <Circle className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg leading-tight">
                        {module.name}
                      </h3>
                      <span className="text-sm text-gray-500">Module {index + 1}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {module.description}
                </p>

                {/* Resource indicators */}
                {hasResources && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {module.resources.videos.length > 0 && (
                      <span className="inline-flex items-center px-2 py-1 bg-red-50 text-red-700 text-xs rounded-md">
                        <Play className="h-3 w-3 mr-1" />
                        {module.resources.videos.length} Video{module.resources.videos.length > 1 ? 's' : ''}
                      </span>
                    )}
                    {module.resources.courses.length > 0 && (
                      <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md">
                        <BookOpen className="h-3 w-3 mr-1" />
                        {module.resources.courses.length} Course{module.resources.courses.length > 1 ? 's' : ''}
                      </span>
                    )}
                    {(module.resources.readings.length > 0 || module.resources.articles.length > 0) && (
                      <span className="inline-flex items-center px-2 py-1 bg-green-50 text-green-700 text-xs rounded-md">
                        <FileText className="h-3 w-3 mr-1" />
                        Reading{(module.resources.readings.length + module.resources.articles.length) > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex space-x-2">
                  <Link
                    to={`/year/${yearNumber}/module/${index}`}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-200"
                  >
                    {isComplete ? 'Review' : 'Start'} Module
                  </Link>
                  <Link
                    to={`/year/${yearNumber}/module/${index}/quiz`}
                    className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Award className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Progress indicator */}
              <div className="px-6 pb-4">
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div 
                    className={`h-1 rounded-full transition-all duration-500 ${
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
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Year {prevYear.number}: {prevYear.title}
            </Link>
          )}
        </div>
        <div>
          {nextYear && (
            <Link
              to={`/year/${nextYear.number}`}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-200"
            >
              Year {nextYear.number}: {nextYear.title}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          )}
        </div>
      </div>

      {/* Year completion message */}
      {yearProgress === 100 && (
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full mb-4">
            <Award className="h-6 w-6 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold text-emerald-900 mb-2">
            Congratulations! Year {year.number} Complete
          </h3>
          <p className="text-emerald-700 mb-4">
            You've successfully completed all modules in {year.title}. 
            {nextYear && ` Ready to move on to Year ${nextYear.number}?`}
          </p>
          {nextYear && (
            <Link
              to={`/year/${nextYear.number}`}
              className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Continue to Year {nextYear.number}
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default YearView;

