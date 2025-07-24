# LearnX - College Project

A simplified online learning platform built with React.js frontend and Node.js/Express backend with PostgreSQL database.

## 🚀 Features

- **User Authentication**: Registration, login, email verification
- **Role-based Access**: Student, Teacher, Admin roles
- **Course Management**: Create, view, and manage courses
- **Email System**: Automated email verification and notifications
- **Responsive UI**: Modern, clean interface with Tailwind CSS

## 🛠 Tech Stack

### Frontend
- React.js 18
- React Router DOM
- Tailwind CSS
- Lucide React (icons)

### Backend
- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT Authentication
- Nodemailer
- bcryptjs

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- Gmail account (for email service)

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd learnx-project
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Database Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE learnx_db;
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Update `.env` file with your database credentials:
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=learnx_db
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Email Configuration (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Server Configuration
PORT=5000
NODE_ENV=development
```

### 4. Gmail App Password Setup

1. Enable 2-Factor Authentication on your Gmail account
2. Go to Google Account settings > Security > App passwords
3. Generate an app password for "Mail"
4. Use this app password in your `.env` file

### 5. Frontend Setup

```bash
cd ../
npm install
```

## 🚀 Running the Application

### Start Backend Server
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:5000`

### Start Frontend Development Server
```bash
npm run dev
```
Frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
learnx-project/
├── backend/
│   ├── config/
│   │   └── database.js          # Database configuration
│   ├── controllers/
│   │   └── authController.js    # Authentication logic
│   ├── middleware/
│   │   └── auth.js             # JWT middleware
│   ├── models/
│   │   ├── User.js             # User model
│   │   ├── Course.js           # Course model
│   │   ├── Enrollment.js       # Enrollment model
│   │   └── index.js            # Model associations
│   ├── routes/
│   │   └── auth.js             # Auth routes
│   ├── utils/
│   │   └── emailService.js     # Email templates & service
│   ├── .env.example            # Environment variables template
│   ├── package.json
│   └── server.js               # Main server file
├── src/
│   ├── components/             # Reusable components
│   ├── contexts/              # React contexts
│   ├── pages/                 # Page components
│   │   ├── EmailVerificationPage.jsx
│   │   ├── ResendVerificationPage.jsx
│   │   └── ...
│   └── ...
└── README.md
```

## 🔐 Authentication Flow

1. **Registration**: User registers → Email verification sent
2. **Email Verification**: User clicks link → Account activated
3. **Login**: User logs in → JWT token issued
4. **Protected Routes**: Token validated on each request

## 📧 Email Templates

The system includes professional email templates for:
- Email verification
- Password reset
- Welcome message

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-email` - Email verification
- `POST /api/auth/resend-verification` - Resend verification email
- `GET /api/auth/me` - Get current user (protected)

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Rate limiting
- Input validation
- CORS protection
- Helmet security headers

## 🎨 UI Components

- Modern, responsive design
- Email verification flow
- Loading states
- Error handling
- Success messages
- Form validation

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🚀 Deployment

### Backend Deployment
1. Set up PostgreSQL database on your hosting service
2. Update environment variables
3. Deploy to services like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy to services like Netlify, Vercel, or GitHub Pages

## 🤝 Contributing

This is a college project template. Feel free to:
1. Fork the repository
2. Add new features
3. Improve the UI/UX
4. Fix bugs
5. Add more course functionality

## 📝 License

This project is for educational purposes. Feel free to use it for your college projects.

## 🆘 Support

If you encounter any issues:
1. Check the console for error messages
2. Verify your environment variables
3. Ensure PostgreSQL is running
4. Check your Gmail app password setup

## 🎓 Learning Objectives

This project demonstrates:
- Full-stack web development
- Database design and relationships
- User authentication and authorization
- Email integration
- Modern React patterns
- RESTful API design
- Security best practices

---

**Happy Learning! 🚀**