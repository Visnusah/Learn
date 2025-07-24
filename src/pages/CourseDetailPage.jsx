import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Users, Clock, Play, BookOpen, Award, CheckCircle } from 'lucide-react';
import { mockCourses } from '../data/mockData.js';
import { getCourseContent } from '../data/courseContent.js';

const CourseDetailPage = () => {
  const { id } = useParams();
  const course = mockCourses.find(c => c.id === id);
  const courseContent = getCourseContent(id);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <Link to="/courses" className="btn-primary">
            Browse All Courses
          </Link>
        </div>
      </div>
    );
  }

  const totalLessons = courseContent?.sections.reduce((total, section) => total + section.lessons.length, 0) || course.curriculum.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-white/20 text-white text-sm font-medium px-3 py-1 rounded-full">
                  {course.category}
                </span>
                <span className="bg-white/20 text-white text-sm font-medium px-3 py-1 rounded-full">
                  {course.level}
                </span>
              </div>
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-white/90 mb-6">{course.description}</p>
              
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-semibold">{course.rating}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-1" />
                  <span>{course.studentsCount.toLocaleString()} students</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-1" />
                  <span>{course.duration}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {courseContent && courseContent.sections.length > 0 ? (
                  <Link 
                    to={`/lesson/${course.id}/${courseContent.sections[0].lessons[0].id}`}
                    className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start Learning
                  </Link>
                ) : (
                  <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center">
                    <Play className="w-5 h-5 mr-2" />
                    Enroll for Free
                  </button>
                )}
                <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
                  Preview Course
                </button>
              </div>
            </div>
            
            <div className="lg:text-right">
              <img
                src={course.image}
                alt={course.title}
                className="w-full max-w-md mx-auto lg:ml-auto rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* What You'll Learn */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll Learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.whatYouLearn.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h2>
              
              {courseContent && courseContent.sections.length > 0 ? (
                <div className="space-y-4">
                  {courseContent.sections.map((section, sectionIndex) => (
                    <div key={section.id} className="border border-gray-200 rounded-lg">
                      <div className="p-4 bg-gray-50 border-b border-gray-200">
                        <h3 className="font-semibold text-gray-900">{section.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{section.description}</p>
                        <p className="text-sm text-gray-500 mt-1">{section.lessons.length} lessons</p>
                      </div>
                      <div className="divide-y divide-gray-200">
                        {section.lessons.map((lesson, lessonIndex) => (
                          <Link
                            key={lesson.id}
                            to={`/lesson/${course.id}/${lesson.id}`}
                            className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group"
                          >
                            <div className="flex items-center space-x-3">
                              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded">
                                {lessonIndex + 1}
                              </span>
                              <div>
                                <span className="font-medium text-gray-900 group-hover:text-blue-600">{lesson.title}</span>
                                <div className="flex items-center space-x-2 mt-1">
                                  <span className="text-xs text-gray-500 capitalize">{lesson.type}</span>
                                  <span className="text-xs text-gray-400">•</span>
                                  <span className="text-xs text-gray-500">{lesson.duration}</span>
                                </div>
                              </div>
                            </div>
                            <Play className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {course.curriculum.map((lesson, index) => (
                    <div key={lesson.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded">
                            {index + 1}
                          </span>
                          <span className="font-medium text-gray-900">{lesson.title}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-500">{lesson.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Requirements</h2>
              <ul className="space-y-2">
                {course.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructor */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Instructor</h2>
              <div className="flex items-center space-x-4">
                <img
                  src={course.instructorAvatar}
                  alt={course.instructor}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{course.instructor}</h3>
                  <p className="text-gray-600">Expert {course.category} Instructor</p>
                  <div className="flex items-center mt-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{course.rating} instructor rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Info Card */}
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-green-600 mb-2">FREE</div>
                <p className="text-gray-600">Full lifetime access</p>
              </div>

              {courseContent && courseContent.sections.length > 0 ? (
                <Link 
                  to={`/lesson/${course.id}/${courseContent.sections[0].lessons[0].id}`}
                  className="w-full btn-primary mb-4 flex items-center justify-center"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Learning
                </Link>
              ) : (
                <button className="w-full btn-primary mb-4 flex items-center justify-center">
                  <Play className="w-5 h-5 mr-2" />
                  Enroll Now
                </button>
              )}

              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Level:</span>
                  <span className="font-medium">{course.level}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Lessons:</span>
                  <span className="font-medium">{totalLessons}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Certificate:</span>
                  <span className="font-medium text-green-600">Yes</span>
                </div>
              </div>

              <div className="border-t border-gray-200 mt-6 pt-6">
                <h4 className="font-semibold text-gray-900 mb-3">This course includes:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    {totalLessons} lessons
                  </li>
                  <li className="flex items-center">
                    <Award className="h-4 w-4 mr-2" />
                    Certificate of completion
                  </li>
                  <li className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Self-paced learning
                  </li>
                  <li className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Community access
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;