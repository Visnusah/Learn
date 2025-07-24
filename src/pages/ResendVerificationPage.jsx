import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, RefreshCw, CheckCircle, ArrowLeft } from 'lucide-react';

const ResendVerificationPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

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
        setIsSuccess(true);
        setMessage('Verification email sent successfully! Please check your inbox.');
      } else {
        setIsSuccess(false);
        setMessage(data.message || 'Failed to send verification email');
      }
    } catch (error) {
      console.error('Resend verification error:', error);
      setIsSuccess(false);
      setMessage('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link
          to="/login"
          className="flex items-center justify-center text-blue-600 hover:text-blue-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Login
        </Link>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Resend Verification Email
          </h2>
          <p className="text-gray-600">
            Enter your email address and we'll send you a new verification link
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              {message && (
                <div className={`p-4 rounded-md ${
                  isSuccess 
                    ? 'bg-green-50 border border-green-200 text-green-800' 
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}>
                  <p className="text-sm">{message}</p>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? (
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
              </div>
            </form>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Verification Email Sent!
              </h3>
              <p className="text-gray-600 mb-6">{message}</p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-800 text-sm">
                  📧 Check your email inbox (and spam folder) for the verification link.
                  The link will expire in 24 hours.
                </p>
              </div>

              <div className="flex flex-col space-y-3">
                <Link
                  to="/login"
                  className="btn-primary"
                >
                  Back to Login
                </Link>
                <button
                  onClick={() => {
                    setIsSuccess(false);
                    setMessage('');
                    setEmail('');
                  }}
                  className="btn-secondary"
                >
                  Send Another Email
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Help Section */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md mt-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-yellow-900 mb-2">Email Not Arriving?</h3>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• Check your spam/junk folder</li>
            <li>• Make sure the email address is correct</li>
            <li>• Wait a few minutes for delivery</li>
            <li>• Add noreply@learnx.com to your contacts</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResendVerificationPage;