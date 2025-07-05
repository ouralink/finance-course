import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, User, Menu, X, BookOpen, TrendingUp } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';

const Header = ({ onMenuClick, sidebarOpen }) => {
  const { getTotalProgress } = useProgress();
  const totalProgress = getTotalProgress();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-soft">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-xl hover:bg-gray-100 transition-all duration-200 lg:hidden hover-scale"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-medium group-hover:shadow-strong transition-all duration-300">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Finance Academy
              </h1>
              <p className="text-sm text-gray-500 font-medium">Ivy League Curriculum</p>
            </div>
          </Link>
        </div>

        {/* Center section - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Search courses, modules..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200 text-sm"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          {/* Progress indicator */}
          <div className="hidden sm:flex items-center space-x-3 bg-gray-50 rounded-2xl px-4 py-2">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-medium text-gray-700">Progress</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-1000 progress-fill"
                  style={{ width: `${totalProgress}%` }}
                ></div>
              </div>
              <span className="text-sm font-bold text-gray-900 min-w-[3rem] text-right">
                {Math.round(totalProgress)}%
              </span>
            </div>
          </div>
          
          {/* Notifications */}
          <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-all duration-200 hover-scale">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-xs text-white flex items-center justify-center font-bold shadow-medium">
              3
            </span>
          </button>
          
          {/* User profile */}
          <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl px-3 py-2 hover:from-blue-100 hover:to-emerald-100 transition-all duration-200 cursor-pointer group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-medium group-hover:shadow-strong transition-all duration-200">
              <User className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700 hidden sm:inline">Student</span>
          </div>
        </div>
      </div>

      {/* Mobile search */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            placeholder="Search courses, modules..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200 text-sm"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;