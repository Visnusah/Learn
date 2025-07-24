import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Mail, RefreshCw, ArrowLeft } from 'lucide-react';

const EmailVerificationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // verifying, success, error, expired
  const [message, setMessage] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [email, setEmail] = useState('');
  const [showResendForm, setShowResendForm] = useState(false);

  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    } else {
      setStatus('error');
      setMessage('Invalid verification link');
    }
  }, [token]);

  const verifyEmail = async (verificationToken) => {
    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: verificationToken }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setMessage('Your email has been verified successfully!');
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login?verified=true');
        }, 3000);
      } else {
        setStatus('error');
        setMessage(data.message || 'Verification failed');
        if (data.message?.includes('expired')) {
          setStatus('expired');
          setShowResendForm(true);
        }
      }
    } catch (error) {
      console.error('Verification error:', error);
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  const handleResendVerification = async (e) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter your email address');
      return;
    }

    setIsResending(true);
    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Verification email sent! Please check your inbox.');
        setShowResendForm(false);
      } else {
        alert(data.message || 'Failed to resend verification email');
      }
    } catch (error) {
      console.error('Resend error:', error);
      alert('Network error. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  const renderContent = () => {
    switch (status) {
      case 'verifying':
        return (
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Verifying Your Email</h2>
            <p className="text-gray-600">Please wait while we verify your email address...</p>
          </div>
        );

      case 'success':
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Email Verified Successfully!</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-800 text-sm">
                🎉 Welcome to LearnX! You can now access all our free courses and start learning.
              </p>
            </div>
            <p className="text-sm text-gray-500 mb-4">Redirecting to login page in 3 seconds...</p>
            <Link
              to="/login"
              className="btn-primary inline-flex items-center"
            >
              Continue to Login
            </Link>
          </div>
        );

      case 'expired':
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="h-10 w-10 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Verification Link Expired</h2>
            <p className="text-gray-600 mb-6">
              Your verification link has expired. Don't worry, we can send you a new one!
            </p>
            
            {!showResendForm ? (
              <button
                onClick={() => setShowResendForm(true)}
                className="btn-primary inline-flex items-center"
              >
                <Mail className="w-4 h-4 mr-2" />
                Get New Verification Link
              </button>
            ) : (
              <form onSubmit={handleResendVerification} className="max-w-md mx-auto">
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Enter your email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isResending}
                  className="w-full btn-primary flex items-center justify-center"
                >
                  {isResending ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4 mr-2" />
                      Send Verification Email
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        );

      case 'error':
      default:
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="h-10 w-10 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Verification Failed</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800 text-sm">
                If you continue to have issues, please contact our support team.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowResendForm(true)}
                className="btn-secondary inline-flex items-center"
              >
                <Mail className="w-4 h-4 mr-2" />
                Resend Verification
              </button>
              <Link
                to="/register"
                className="btn-primary inline-flex items-center"
              >
                Back to Register
              </Link>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link
          to="/"
          className="flex items-center justify-center text-blue-600 hover:text-blue-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          {renderContent()}
        </div>
      </div>

      {/* Help Section */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md mt-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Need Help?</h3>
          <p className="text-sm text-blue-800 mb-2">
            If you're having trouble with email verification:
          </p>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Check your spam/junk folder</li>
            <li>• Make sure you're using the latest verification link</li>
            <li>• Try requesting a new verification email</li>
            <li>• Contact support if issues persist</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;