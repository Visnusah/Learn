import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, Users, Clock, ChevronDown } from 'lucide-react';
import { mockCourses, categories } from '../data/mockData.js';

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const filteredCourses = useMemo(() => {
    return mockCourses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || course.category === selectedCategory;
      const matchesLevel = !selectedLevel || course.level === selectedLevel;
      const matchesRating = course.rating >= minRating;
      
      let matchesDuration = true;
      if (selectedDuration) {
        const duration = parseInt(course.duration);
        switch (selectedDuration) {
          case 'short':
            matchesDuration = duration <= 10;
            break;
          case 'medium':
            matchesDuration = duration > 10 && duration <= 40;
            break;
          case 'long':
            matchesDuration = duration > 40;
            break;
        }
      }

      return matchesSearch && matchesCategory && matchesLevel && matchesRating && matchesDuration;
    });
  }, [searchTerm, selectedCategory, selectedLevel, selectedDuration, minRating]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedLevel('');
    setSelectedDuration('');
    setMinRating(0);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">All Courses</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Discover our complete collection of free courses and start learning today</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
            <input
              type="text"
              placeholder="Search courses, instructors, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-6 py-5 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-lg"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <div className="card p-8 sticky top-24">
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h3 className="text-xl font-bold text-gray-900">Filters</h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <Filter className="h-5 w-5" />
                </button>
              </div>

              <div className={`space-y-8 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6 hidden lg:block">Filters</h3>
                  <button
                    onClick={clearFilters}
                    className="text-blue-600 hover:text-blue-700 font-semibold mb-6"
                  >
                    Clear all filters
                  </button>
                </div>

                {/* Category Filter */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Category</h4>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category.name} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Level Filter */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Level</h4>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
                  >
                    <option value="">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                {/* Duration Filter */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Duration</h4>
                  <select
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
                  >
                    <option value="">Any Duration</option>
                    <option value="short">Short (0-10 hours)</option>
                    <option value="medium">Medium (10-40 hours)</option>
                    <option value="long">Long (40+ hours)</option>
                  </select>
                </div>

                {/* Rating Filter */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Minimum Rating</h4>
                  <div className="space-y-3">
                    {[4, 3, 2, 1].map((rating) => (
                      <label key={rating} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          value={rating}
                          checked={minRating === rating}
                          onChange={(e) => setMinRating(Number(e.target.value))}
                          className="mr-3 w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-sm text-gray-600">& up</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Course Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <p className="text-gray-600 text-lg">
                Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <div key={course.id} className="card-premium overflow-hidden">
                  <div className="relative">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-56 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                        {course.level}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 backdrop-blur text-gray-700 text-sm font-medium px-3 py-1 rounded-full">
                        <Clock className="inline h-4 w-4 mr-1" />
                        {course.duration}
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">{course.title}</h3>
                    <p className="text-gray-600 mb-6 line-clamp-2">{course.description}</p>
                    
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <img
                          src={course.instructorAvatar}
                          alt={course.instructor}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{course.instructor}</p>
                          <p className="text-gray-500 text-xs">Instructor</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-medium text-gray-900">{course.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-500 text-sm">
                        <Users className="h-4 w-4 mr-1" />
                        {course.studentsCount.toLocaleString()}
                      </div>
                      <Link
                        to={`/course/${course.id}`}
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        Start Learning
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-6">
                  <Search className="h-20 w-20 mx-auto" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">No courses found</h3>
                <p className="text-gray-600 text-lg mb-8">Try adjusting your search criteria or filters</p>
                <button
                  onClick={clearFilters}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;