import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  Award, 
  RotateCcw,
  ChevronRight,
  Clock,
  Target
} from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';

const QuizView = ({ quizzes }) => {
  const { yearNumber, moduleIndex } = useParams();
  const navigate = useNavigate();
  const { saveQuizScore, getQuizScore } = useProgress();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeStarted, setTimeStarted] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Find the appropriate quiz based on year and module
  // For this demo, we'll use a simple mapping
  const quizIndex = (parseInt(yearNumber) - 1) * 7 + parseInt(moduleIndex);
  const quiz = quizzes[quizIndex] || quizzes[0]; // Fallback to first quiz if not found

  const previousScore = getQuizScore(parseInt(yearNumber), parseInt(moduleIndex));

  useEffect(() => {
    setTimeStarted(Date.now());
    const interval = setInterval(() => {
      if (!showResults) {
        setTimeElapsed(Math.floor((Date.now() - timeStarted) / 1000));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeStarted, showResults]);

  if (!quiz) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Quiz not available</h1>
        <p className="text-gray-600 mb-6">
          The quiz for this module is not yet available.
        </p>
        <Link 
          to={`/year/${yearNumber}/module/${moduleIndex}`}
          className="text-blue-600 hover:text-blue-700"
        >
          Return to Module
        </Link>
      </div>
    );
  }

  const handleAnswerSelect = (questionIndex, answerKey) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerKey
    }));
  };

  const handleSubmitQuiz = () => {
    const score = calculateScore();
    saveQuizScore(parseInt(yearNumber), parseInt(moduleIndex), score, quiz.questions.length);
    setShowResults(true);
    setQuizCompleted(true);
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.answer) {
        correct++;
      }
    });
    return correct;
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setQuizCompleted(false);
    setTimeStarted(Date.now());
    setTimeElapsed(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const score = showResults ? calculateScore() : 0;
  const percentage = showResults ? Math.round((score / quiz.questions.length) * 100) : 0;

  if (showResults) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Results Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
            percentage >= 70 ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
          }`}>
            {percentage >= 70 ? (
              <Award className="h-8 w-8" />
            ) : (
              <XCircle className="h-8 w-8" />
            )}
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {percentage >= 70 ? 'Congratulations!' : 'Keep Learning!'}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            You scored {score} out of {quiz.questions.length} questions correctly
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-900">{percentage}%</div>
              <div className="text-sm text-gray-600">Score</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-900">{formatTime(timeElapsed)}</div>
              <div className="text-sm text-gray-600">Time Taken</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-900">
                {percentage >= 70 ? 'Pass' : 'Retry'}
              </div>
              <div className="text-sm text-gray-600">Result</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetQuiz}
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RotateCcw className="h-5 w-5 mr-2" />
              Retake Quiz
            </button>
            <Link
              to={`/year/${yearNumber}/module/${moduleIndex}`}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-200"
            >
              Return to Module
              <ChevronRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Question Review</h2>
          <div className="space-y-6">
            {quiz.questions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.answer;
              const correctOption = question.options.find(opt => opt.key === question.answer);
              const userOption = question.options.find(opt => opt.key === userAnswer);

              return (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className={`p-1 rounded-full ${
                      isCorrect ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <XCircle className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Question {index + 1}: {question.question_text}
                      </h3>
                      
                      {!isCorrect && (
                        <div className="space-y-2 text-sm">
                          <div className="text-red-600">
                            Your answer: {userOption ? userOption.text : 'No answer selected'}
                          </div>
                          <div className="text-emerald-600">
                            Correct answer: {correctOption.text}
                          </div>
                        </div>
                      )}
                      
                      {isCorrect && (
                        <div className="text-sm text-emerald-600">
                          Correct! {correctOption.text}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Quiz Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <Link 
            to={`/year/${yearNumber}/module/${moduleIndex}`}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Module
          </Link>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{formatTime(timeElapsed)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Target className="h-4 w-4" />
              <span>{currentQuestion + 1} of {quiz.questions.length}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 bg-purple-100 rounded-lg">
            <Award className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{quiz.quiz_name}</h1>
            <p className="text-gray-600">Year {yearNumber} • Module {parseInt(moduleIndex) + 1}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
          ></div>
        </div>

        {previousScore && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800">
              Previous attempt: {previousScore.score}/{quiz.questions.length} 
              ({Math.round((previousScore.score / quiz.questions.length) * 100)}%)
            </p>
          </div>
        )}
      </div>

      {/* Question */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Question {currentQuestion + 1}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {quiz.questions[currentQuestion].question_text}
          </p>
        </div>

        {/* Answer Options */}
        <div className="space-y-4 mb-8">
          {quiz.questions[currentQuestion].options.map((option) => (
            <button
              key={option.key}
              onClick={() => handleAnswerSelect(currentQuestion, option.key)}
              className={`w-full text-left p-4 border-2 rounded-lg transition-all duration-200 quiz-option ${
                selectedAnswers[currentQuestion] === option.key
                  ? 'selected border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswers[currentQuestion] === option.key
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {selectedAnswers[currentQuestion] === option.key && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="font-medium text-gray-900">{option.key})</span>
                <span className="text-gray-700">{option.text}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </button>

          {currentQuestion === quiz.questions.length - 1 ? (
            <button
              onClick={handleSubmitQuiz}
              disabled={Object.keys(selectedAnswers).length !== quiz.questions.length}
              className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Quiz
              <Award className="h-4 w-4 ml-2" />
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion(Math.min(quiz.questions.length - 1, currentQuestion + 1))}
              disabled={!selectedAnswers[currentQuestion]}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </button>
          )}
        </div>
      </div>

      {/* Question Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Question Overview</h3>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {quiz.questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                index === currentQuestion
                  ? 'bg-blue-600 text-white'
                  : selectedAnswers[index]
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizView;

