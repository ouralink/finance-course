import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Circle, 
  Play, 
  BookOpen, 
  FileText, 
  ExternalLink,
  Award,
  Clock
} from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';

const ModuleView = ({ curriculum }) => {
  const { yearNumber, moduleIndex } = useParams();
  const navigate = useNavigate();
  const { isModuleComplete, markModuleComplete, markModuleIncomplete } = useProgress();
  
  const [isCompleted, setIsCompleted] = useState(false);
  
  const year = curriculum.years.find(y => y.number === parseInt(yearNumber));
  const module = year?.modules[parseInt(moduleIndex)];
  const moduleComplete = isModuleComplete(parseInt(yearNumber), parseInt(moduleIndex));

  useEffect(() => {
    setIsCompleted(moduleComplete);
  }, [moduleComplete]);

  if (!year || !module) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Module not found</h1>
        <Link to={`/year/${yearNumber}`} className="text-blue-600 hover:text-blue-700">
          Return to Year {yearNumber}
        </Link>
      </div>
    );
  }

  const handleToggleComplete = () => {
    if (isCompleted) {
      markModuleIncomplete(parseInt(yearNumber), parseInt(moduleIndex));
    } else {
      markModuleComplete(parseInt(yearNumber), parseInt(moduleIndex));
    }
    setIsCompleted(!isCompleted);
  };

  const nextModule = year.modules[parseInt(moduleIndex) + 1];
  const prevModule = year.modules[parseInt(moduleIndex) - 1];
  const nextModuleIndex = parseInt(moduleIndex) + 1;
  const prevModuleIndex = parseInt(moduleIndex) - 1;

  const getVideoEmbedUrl = (videoTitle) => {
    // This is a placeholder function. In a real implementation, you would
    // map video titles to actual YouTube/Vimeo embed URLs
    const videoId = 'dQw4w9WgXcQ'; // Placeholder YouTube video ID
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <Link 
            to={`/year/${yearNumber}`}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Year {yearNumber}
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              to={`/year/${yearNumber}/module/${moduleIndex}/quiz`}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
            >
              <Award className="h-4 w-4 mr-2" />
              Take Quiz
            </Link>
            <button
              onClick={handleToggleComplete}
              className={`inline-flex items-center px-4 py-2 font-medium rounded-lg transition-all duration-200 ${
                isCompleted
                  ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Completed
                </>
              ) : (
                <>
                  <Circle className="h-4 w-4 mr-2" />
                  Mark Complete
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-3 mb-4">
          <div className={`p-3 rounded-lg ${
            isCompleted 
              ? 'bg-emerald-100 text-emerald-600' 
              : 'bg-blue-100 text-blue-600'
          }`}>
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{module.name}</h1>
            <p className="text-gray-600">Year {yearNumber} • Module {parseInt(moduleIndex) + 1}</p>
          </div>
        </div>

        <p className="text-gray-700 text-lg leading-relaxed">
          {module.description}
        </p>
      </div>

      {/* Video Content */}
      {module.resources && module.resources.videos.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Play className="h-6 w-6 mr-3 text-red-600" />
            Video Resources
          </h2>
          <div className="space-y-6">
            {module.resources.videos.map((video, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">{video}</h3>
                </div>
                <div className="p-4">
                  <div className="video-container">
                    <iframe
                      src={getVideoEmbedUrl(video)}
                      title={video}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>Estimated time: 15-30 minutes</span>
                    </div>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full w-0 transition-all duration-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Course Resources */}
      {module.resources && module.resources.courses.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <BookOpen className="h-6 w-6 mr-3 text-blue-600" />
            Course Resources
          </h2>
          <div className="space-y-4">
            {module.resources.courses.map((course, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{course}</h3>
                    <p className="text-sm text-gray-600">External course resource</p>
                  </div>
                </div>
                <button className="inline-flex items-center px-3 py-2 text-blue-600 hover:text-blue-700 transition-colors">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Open
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reading Materials */}
      {module.resources && (module.resources.readings.length > 0 || module.resources.articles.length > 0) && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <FileText className="h-6 w-6 mr-3 text-green-600" />
            Reading Materials
          </h2>
          <div className="space-y-4">
            {[...module.resources.readings, ...module.resources.articles].map((reading, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FileText className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{reading}</h3>
                    <p className="text-sm text-gray-600">
                      {module.resources.readings.includes(reading) ? 'Reading material' : 'Article'}
                    </p>
                  </div>
                </div>
                <button className="inline-flex items-center px-3 py-2 text-green-600 hover:text-green-700 transition-colors">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Read
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tutorials */}
      {module.resources && module.resources.tutorials.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Play className="h-6 w-6 mr-3 text-purple-600" />
            Tutorials
          </h2>
          <div className="space-y-4">
            {module.resources.tutorials.map((tutorial, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Play className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{tutorial}</h3>
                    <p className="text-sm text-gray-600">Interactive tutorial</p>
                  </div>
                </div>
                <button className="inline-flex items-center px-3 py-2 text-purple-600 hover:text-purple-700 transition-colors">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Start
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8">
        <div>
          {prevModule && (
            <Link
              to={`/year/${yearNumber}/module/${prevModuleIndex}`}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous: {prevModule.name.substring(0, 30)}...
            </Link>
          )}
        </div>
        <div>
          {nextModule && (
            <Link
              to={`/year/${yearNumber}/module/${nextModuleIndex}`}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-200"
            >
              Next: {nextModule.name.substring(0, 30)}...
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModuleView;

