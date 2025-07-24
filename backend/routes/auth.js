const express = require('express');
const { body, validationResult } = require('express-validator');
const {
  register,
  login,
  verifyEmail,
  resendVerification,
  getCurrentUser
} = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Validation middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// Register
router.post('/register', [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('role')
    .optional()
    .isIn(['student', 'teacher'])
    .withMessage('Role must be either student or teacher')
], handleValidationErrors, register);

// Login
router.post('/login', [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
], handleValidationErrors, login);

// Verify email
router.post('/verify-email', [
  body('token')
    .notEmpty()
    .withMessage('Verification token is required')
], handleValidationErrors, verifyEmail);

// Resend verification email
router.post('/resend-verification', [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email')
], handleValidationErrors, resendVerification);

// Get current user (protected route)
router.get('/me', authenticateToken, getCurrentUser);

module.exports = router;