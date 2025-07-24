import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Users, BookOpen, Trophy, ArrowRight, Play, CheckCircle, TrendingUp, Clock, Award } from 'lucide-react';
import { mockCourses, categories, testimonials, instructors } from '../data/mockData.js';

const HomePage = () => {
  const featuredCourses = mockCourses.filter(course => course.isFeatured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-primary section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots-homepage"></div>
        <div className="container-max relative">
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 fade-in leading-tight">
              Master New Skills.
              <span className="block text-blue-200 mt-2">Learn for Free.</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto slide-in-left leading-relaxed">
              Join thousands of learners worldwide and unlock your potential with our comprehensive collection of free courses from industry experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center slide-in-right">
              <Link to="/courses" className="btn-primary bg-white text-blue-600 hover:bg-blue-50 shadow-2xl">
                Explore Courses
                <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
              <button className="btn-secondary border-white text-white hover:bg-white hover:text-blue-600">
                <Play className="mr-3 h-5 w-5" />
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-20 border-b border-gray-100">
        <div className="container-max">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '15+', label: 'Active Learners', icon: Users },
              { number: '6+', label: 'Free Courses', icon: BookOpen },
              { number: '5+', label: 'Expert Instructors', icon: Award },
              { number: '100%', label: 'Success Rate', icon: TrendingUp }
            ].map((stat, index) => (
              <div key={index} className="text-center scale-in">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="bg-gray-50 section-padding">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Popular Categories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Discover courses in trending fields and advance your career with industry-relevant skills</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                to={`/courses?category=${encodeURIComponent(category.name)}`}
                className="feature-card text-center group"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{category.name}</h3>
                <p className="text-gray-600 mb-4">{category.count} courses available</p>
                <div className="text-blue-600 font-medium group-hover:text-blue-700">
                  Explore Category →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="bg-white section-padding">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Featured Free Courses</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Start learning with our most popular courses, carefully crafted by industry experts</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
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
                  <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed">{course.description}</p>
                  
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
                      {course.studentsCount.toLocaleString()} students
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
          <div className="text-center mt-12">
            <Link to="/courses" className="btn-secondary">
              View All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 section-padding">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Get started in just three simple steps and begin your learning journey today</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: '01',
                icon: BookOpen,
                title: 'Discover',
                description: 'Browse our extensive catalog of free courses and find the perfect match for your learning goals and interests.'
              },
              {
                step: '02',
                icon: Users,
                title: 'Enroll',
                description: 'Create your free account and enroll in unlimited courses. No credit card required, no hidden fees.'
              },
              {
                step: '03',
                icon: Trophy,
                title: 'Achieve',
                description: 'Complete courses at your own pace and earn certificates to showcase your new skills to employers.'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                    <item.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">{item.step}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white section-padding">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">What Our Learners Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Join thousands of successful learners who have transformed their careers with LearnX</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="card-premium p-8">
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-8 leading-relaxed text-lg">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900 text-lg">{testimonial.name}</div>
                    <div className="text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-primary section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Start Learning Free Today</h2>
            <p className="text-xl text-blue-100 mb-12 leading-relaxed">
              Join over 15 learners and start your journey to success with our comprehensive free courses
            </p>
            <Link to="/register" className="btn-primary bg-white text-blue-600 hover:bg-blue-50 shadow-2xl text-lg px-12 py-5">
              Get Started for Free
              <ArrowRight className="ml-3 h-6 w-6" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;