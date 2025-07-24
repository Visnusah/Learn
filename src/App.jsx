import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import LessonPage from './pages/LessonPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import ResendVerificationPage from './pages/ResendVerificationPage';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentCourses from './pages/student/StudentCourses';
import LearningInterface from './pages/student/LearningInterface';
import StudentCertificates from './pages/student/StudentCertificates';
import StudentSupport from './pages/student/StudentSupport';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherCourses from './pages/teacher/TeacherCourses';
import CreateCourse from './pages/teacher/CreateCourse';
import TeacherStudents from './pages/teacher/TeacherStudents';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCourses from './pages/admin/AdminCourses';
import AdminUsers from './pages/admin/AdminUsers';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminSettings from './pages/admin/AdminSettings';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/course/:id" element={<CourseDetailPage />} />
              <Route path="/lesson/:courseId/:lessonId" element={<LessonPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/verify-email" element={<EmailVerificationPage />} />
              <Route path="/resend-verification" element={<ResendVerificationPage />} />
              <Route path="/profile" element={<ProfilePage />} />

              {/* Student Routes */}
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/student/courses" element={<StudentCourses />} />
              <Route path="/student/learn/:courseId/:lessonId?" element={<LearningInterface />} />
              <Route path="/student/certificates" element={<StudentCertificates />} />
              <Route path="/student/support" element={<StudentSupport />} />

              {/* Teacher Routes */}
              <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
              <Route path="/teacher/courses" element={<TeacherCourses />} />
              <Route path="/teacher/courses/create" element={<CreateCourse />} />
              <Route path="/teacher/students" element={<TeacherStudents />} />

              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/courses" element={<AdminCourses />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/analytics" element={<AdminAnalytics />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;