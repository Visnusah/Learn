import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Maximize, 
  CheckCircle, 
  Circle,
  FileText,
  MessageCircle,
  Download,
  BookOpen,
  Clock,
  Star,
  ChevronLeft,
  ChevronRight,
  Award,
  Users,
  ExternalLink
} from 'lucide-react';
import { getCourseContent, getLesson, updateLessonProgress, getLessonProgress } from '../data/courseContent.js';
import { mockCourses } from '../data/mockData.js';

const LessonPage = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(300);
  const [activeTab, setActiveTab] = useState('content');
  const [notes, setNotes] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);

  const course = mockCourses.find(c => c.id === courseId);
  const courseContent = getCourseContent(courseId);
  const currentLesson = getLesson(courseId, lessonId);

  useEffect(() => {
    if (!course || !courseContent || !currentLesson) {
      navigate('/courses');
      return;
    }

    // Check if lesson is already completed
    const isCompleted = getLessonProgress(courseId, lessonId);
    setLessonCompleted(isCompleted);

    // Load saved notes
    const savedNotes = localStorage.getItem(`notes_${courseId}_${lessonId}`);
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, [course, courseContent, currentLesson, navigate, courseId, lessonId]);

  if (!course || !courseContent || !currentLesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Lesson Not Found</h1>
          <Link to="/courses" className="btn-primary">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const markAsComplete = () => {
    setLessonCompleted(true);
    setShowCompletionMessage(true);
    updateLessonProgress(courseId, lessonId, true);
    
    // Hide completion message after 3 seconds
    setTimeout(() => {
      setShowCompletionMessage(false);
    }, 3000);
  };

  const saveNotes = () => {
    localStorage.setItem(`notes_${courseId}_${lessonId}`, notes);
    alert('Notes saved successfully!');
  };

  const handleQuizAnswer = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const submitQuiz = () => {
    setShowResults(true);
  };

  const getQuizScore = () => {
    if (!currentLesson.quiz) return 0;
    let correct = 0;
    currentLesson.quiz.questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / currentLesson.quiz.questions.length) * 100);
  };

  const getYouTubeEmbedUrl = (videoId) => {
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
  };

  const renderVideoPlayer = () => (
    <div className="bg-black relative rounded-xl overflow-hidden">
      {currentLesson.videoId ? (
        <div className="aspect-video">
          <iframe
            src={getYouTubeEmbedUrl(currentLesson.videoId)}
            title={currentLesson.title}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div className="aspect-video bg-gray-900 flex items-center justify-center">
          <div className="text-center text-white">
            <Play className="h-16 w-16 mx-auto mb-4 opacity-75" />
            <p className="text-lg font-semibold">{currentLesson.title}</p>
            <p className="text-sm opacity-75">{currentLesson.duration}</p>
            <p className="text-xs opacity-50 mt-2">Video content coming soon</p>
          </div>
        </div>
      )}
    </div>
  );

  const renderQuiz = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Quiz: {currentLesson.title}</h3>
        {showResults && (
          <div className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-yellow-500" />
            <span className="font-semibold text-gray-900">Score: {getQuizScore()}%</span>
          </div>
        )}
      </div>
      
      {currentLesson.quiz?.questions.map((question, index) => (
        <div key={question.id} className="bg-white border border-gray-200 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 mb-4">
            {index + 1}. {question.question}
          </h4>
          
          <div className="space-y-3">
            {question.options.map((option, optionIndex) => (
              <label
                key={optionIndex}
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedAnswers[question.id] === optionIndex
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:bg-gray-50'
                } ${
                  showResults && optionIndex === question.correctAnswer
                    ? 'border-green-500 bg-green-50'
                    : showResults && selectedAnswers[question.id] === optionIndex && optionIndex !== question.correctAnswer
                    ? 'border-red-500 bg-red-50'
                    : ''
                }`}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={optionIndex}
                  checked={selectedAnswers[question.id] === optionIndex}
                  onChange={() => handleQuizAnswer(question.id, optionIndex)}
                  disabled={showResults}
                  className="mr-3"
                />
                <span className="text-gray-700">{option}</span>
                {showResults && optionIndex === question.correctAnswer && (
                  <CheckCircle className="h-5 w-5 text-green-600 ml-auto" />
                )}
              </label>
            ))}
          </div>
          
          {showResults && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Explanation:</strong> {question.explanation}
              </p>
            </div>
          )}
        </div>
      ))}
      
      {!showResults ? (
        <button
          onClick={submitQuiz}
          className="btn-primary"
          disabled={Object.keys(selectedAnswers).length !== currentLesson.quiz?.questions.length}
        >
          Submit Quiz
        </button>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
          <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Quiz Complete!</h3>
          <p className="text-gray-600 mb-4">Your Score: {getQuizScore()}%</p>
          {getQuizScore() >= 70 ? (
            <p className="text-green-600 font-medium">Great job! You passed the quiz.</p>
          ) : (
            <div>
              <p className="text-orange-600 font-medium mb-3">You can retake this quiz to improve your score.</p>
              <button
                onClick={() => {
                  setSelectedAnswers({});
                  setShowResults(false);
                }}
                className="btn-secondary"
              >
                Retake Quiz
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Completion Message */}
      {showCompletionMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          Lesson completed successfully!
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/courses" className="hover:text-blue-600">Courses</Link>
          <span>/</span>
          <Link to={`/course/${courseId}`} className="hover:text-blue-600">{course.title}</Link>
          <span>/</span>
          <span className="text-gray-900">{currentLesson.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Video Player or Content */}
            <div className="mb-8">
              {currentLesson.type === 'video' ? renderVideoPlayer() : (
                <div className="bg-white rounded-xl shadow-md p-8">
                  <div className="flex items-center mb-6">
                    <FileText className="h-8 w-8 text-blue-600 mr-3" />
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">{currentLesson.title}</h1>
                      <p className="text-gray-600">{currentLesson.description}</p>
                    </div>
                  </div>
                  
                  {currentLesson.type === 'quiz' ? renderQuiz() : (
                    <div 
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: currentLesson.content || '' }}
                    />
                  )}
                </div>
              )}
            </div>

            {/* Lesson Info */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{currentLesson.title}</h1>
                  <p className="text-gray-600">{currentLesson.description}</p>
                  <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {currentLesson.duration}
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      {currentLesson.type.charAt(0).toUpperCase() + currentLesson.type.slice(1)}
                    </div>
                  </div>
                </div>
                <button
                  onClick={markAsComplete}
                  disabled={lessonCompleted}
                  className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-colors ${
                    lessonCompleted 
                      ? 'bg-green-100 text-green-800 cursor-not-allowed' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  {lessonCompleted ? 'Completed' : 'Mark as Complete'}
                </button>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="flex space-x-8">
                  {[
                    { id: 'content', label: 'Content', icon: BookOpen },
                    { id: 'resources', label: 'Resources', icon: FileText },
                    { id: 'discussion', label: 'Discussion', icon: MessageCircle },
                    { id: 'notes', label: 'My Notes', icon: FileText }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <tab.icon className="h-4 w-4 mr-2" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div>
                {activeTab === 'content' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Lesson Content</h3>
                    {currentLesson.videoId && (
                      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-blue-900">Watch on YouTube</h4>
                            <p className="text-sm text-blue-700">Open this lesson in a new tab for better viewing experience</p>
                          </div>
                          <a
                            href={`https://www.youtube.com/watch?v=${currentLesson.videoId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Open YouTube
                          </a>
                        </div>
                      </div>
                    )}
                    <div 
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: currentLesson.content || '<p>Content will be available soon.</p>' }}
                    />
                  </div>
                )}

                {activeTab === 'resources' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Downloadable Resources</h3>
                    {currentLesson.resources && currentLesson.resources.length > 0 ? (
                      <div className="space-y-3">
                        {currentLesson.resources.map((resource, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 text-blue-600 mr-3" />
                              <div>
                                <p className="font-medium text-gray-900">{resource.name}</p>
                                <p className="text-sm text-gray-500">{resource.type.toUpperCase()}</p>
                              </div>
                            </div>
                            {resource.type === 'link' ? (
                              <a
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-blue-600 hover:text-blue-700"
                              >
                                <ExternalLink className="h-4 w-4 mr-1" />
                                Visit
                              </a>
                            ) : (
                              <button className="flex items-center text-blue-600 hover:text-blue-700">
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600">No resources available for this lesson.</p>
                    )}
                  </div>
                
                  )}

                {activeTab === 'discussion' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Discussion & Q&A</h3>
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <img
                            src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=50"
                            alt="Student"
                            className="w-8 h-8 rounded-full"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-gray-900">Sarah M.</span>
                              <span className="text-sm text-gray-500">2 hours ago</span>
                            </div>
                            <p className="text-gray-600">
                              Great lesson! The examples really helped me understand the concepts better. Looking forward to applying this in my projects.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-4">
                        <textarea
                          placeholder="Ask a question or share your thoughts..."
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows="3"
                        ></textarea>
                        <div className="flex justify-end mt-3">
                          <button className="btn-primary">Post Comment</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'notes' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">My Notes</h3>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Take notes about this lesson..."
                      className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    ></textarea>
                    <div className="flex justify-end mt-4">
                      <button onClick={saveNotes} className="btn-primary">Save Notes</button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button className="flex items-center text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-white transition-colors">
                <ChevronLeft className="h-5 w-5 mr-1" />
                Previous Lesson
              </button>
              <button className="flex items-center text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-white transition-colors">
                Next Lesson
                <ChevronRight className="h-5 w-5 ml-1" />
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Course Info */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6 sticky top-8">
              <div className="flex items-center mb-4">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-12 h-12 rounded-lg object-cover mr-3"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{course.title}</h3>
                  <p className="text-xs text-gray-600">by {course.instructor}</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Progress:</span>
                  <span className="font-medium">65%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{currentLesson.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium capitalize">{currentLesson.type}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-medium ${lessonCompleted ? 'text-green-600' : 'text-orange-600'}`}>
                    {lessonCompleted ? 'Completed' : 'In Progress'}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Users className="h-4 w-4 mr-2" />
                  {course.studentsCount.toLocaleString()} students
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Star className="h-4 w-4 mr-2 text-yellow-400 fill-current" />
                  {course.rating} rating
                </div>
              </div>
            </div>

            {/* Course Sections */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Course Content</h3>
              <div className="space-y-4">
                {courseContent.sections.map((section) => (
                  <div key={section.id}>
                    <h4 className="font-medium text-gray-900 mb-2 text-sm">{section.title}</h4>
                    <div className="space-y-1">
                      {section.lessons.map((lesson) => {
                        const isCompleted = getLessonProgress(courseId, lesson.id);
                        const isCurrent = lesson.id === lessonId;
                        
                        return (
                          <Link
                            key={lesson.id}
                            to={`/lesson/${courseId}/${lesson.id}`}
                            className={`flex items-center p-2 rounded-lg text-sm transition-colors ${
                              isCurrent
                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            <div className="mr-2">
                              {isCompleted ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : isCurrent ? (
                                <Circle className="h-4 w-4 text-blue-600" />
                              ) : (
                                <Circle className="h-4 w-4 text-gray-400" />
                              )}
                            </div>
                            <span className="flex-1 truncate">{lesson.title}</span>
                            <span className="text-xs text-gray-500 ml-2">{lesson.duration}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;