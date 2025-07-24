# LearnX Backend Setup Guide

## Database Configuration

This backend is configured to use **PostgreSQL** with **Sequelize ORM**. You have two options:

### Option 1: PostgreSQL (Recommended for Production)

#### 1. Install PostgreSQL

**macOS (using Homebrew):**
```bash
brew install postgresql
brew services start postgresql
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**Windows:**
Download and install from [PostgreSQL official website](https://www.postgresql.org/download/)

#### 2. Create Database User (if needed)
```bash
# Access PostgreSQL as superuser
sudo -u postgres psql

# Create user and database
CREATE USER postgres WITH PASSWORD 'password';
CREATE DATABASE learnx_db OWNER postgres;
GRANT ALL PRIVILEGES ON DATABASE learnx_db TO postgres;
\q
```

#### 3. Setup Database
```bash
# Method 1: Using Node.js script
npm run setup-db

# Method 2: Using shell script (macOS/Linux only)
./setup-database.sh

# Method 3: Manual setup
createdb -U postgres learnx_db
```

#### 4. Seed Database with Sample Data
```bash
npm run db:seed
```

### Option 2: SQLite (Quick Development Setup)

If you prefer to use SQLite for quick development, update your `.env` file:

```env
# Comment out PostgreSQL settings
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=learnx_db
# DB_USER=postgres
# DB_PASSWORD=password

# Use SQLite instead
DB_DIALECT=sqlite
DB_PATH=./database.sqlite
```

Then update `config/database.js` to use SQLite configuration.

## Environment Variables

Copy `.env.example` to `.env` and update the values:

```env
# Database Configuration (PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=learnx_db
DB_USER=postgres
DB_PASSWORD=password
DB_DIALECT=postgres

# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com
```

## Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run setup-db` - Create database
- `npm run db:seed` - Seed database with sample data
- `npm run db:setup` - Setup and seed database in one command

## Sample Users (after seeding)

- **Admin**: admin@learnx.com (password: admin123)
- **Teacher**: teacher@learnx.com (password: teacher123)
- **Student**: student@learnx.com (password: student123)

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-email` - Email verification
- `GET /api/auth/me` - Get current user (protected)

## Database Models

### User
- id (UUID)
- name, email, password
- role (student, teacher, admin)
- email verification fields
- profile information

### Course
- id (UUID)
- title, description, category
- level (Beginner, Intermediate, Advanced)
- price, rating, status
- instructor relationship

### Enrollment
- id (UUID)
- user-course relationship
- progress tracking
- completion status

## Error Handling

The application includes:
- Global error handler
- Validation middleware
- Rate limiting
- Security headers with Helmet
- CORS configuration

## Development Tips

1. Use `npm run dev` for development with auto-restart
2. Check logs for database connection status
3. Use `npm run db:seed` to reset with sample data
4. Monitor the console for detailed error messages

## Production Deployment

1. Set `NODE_ENV=production`
2. Use strong JWT secret
3. Configure proper database credentials
4. Set up SSL/TLS
5. Configure reverse proxy (nginx)
6. Set up monitoring and logging
