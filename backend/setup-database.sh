#!/bin/bash

# PostgreSQL Database Setup Script for LearnX

echo "🔧 Setting up PostgreSQL database for LearnX..."

# Default database configuration
DB_NAME="learnx_db"
DB_USER="postgres"
DB_PASSWORD="password"
DB_HOST="localhost"
DB_PORT="5432"

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed."
    echo "📦 Please install PostgreSQL first:"
    echo "   - macOS: brew install postgresql"
    echo "   - Ubuntu: sudo apt-get install postgresql postgresql-contrib"
    echo "   - Windows: Download from https://www.postgresql.org/download/"
    exit 1
fi

# Check if PostgreSQL service is running
if ! pg_isready -h $DB_HOST -p $DB_PORT &> /dev/null; then
    echo "❌ PostgreSQL service is not running."
    echo "🚀 Please start PostgreSQL service:"
    echo "   - macOS: brew services start postgresql"
    echo "   - Ubuntu: sudo systemctl start postgresql"
    echo "   - Windows: Start PostgreSQL service from Services"
    exit 1
fi

echo "✅ PostgreSQL is installed and running."

# Create database
echo "📊 Creating database '$DB_NAME'..."
createdb -h $DB_HOST -p $DB_PORT -U $DB_USER $DB_NAME 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ Database '$DB_NAME' created successfully."
else
    echo "⚠️  Database '$DB_NAME' may already exist or user lacks permissions."
fi

# Test connection
echo "🔗 Testing database connection..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c "SELECT version();" &> /dev/null

if [ $? -eq 0 ]; then
    echo "✅ Database connection successful!"
    echo ""
    echo "🎉 Database setup complete!"
    echo "📋 Database Details:"
    echo "   Host: $DB_HOST"
    echo "   Port: $DB_PORT"
    echo "   Database: $DB_NAME"
    echo "   User: $DB_USER"
    echo ""
    echo "📝 Next steps:"
    echo "   1. Update your .env file with these database credentials"
    echo "   2. Run 'npm run dev' to start the backend server"
    echo "   3. The server will automatically create the required tables"
else
    echo "❌ Database connection failed!"
    echo "🔧 Please check your PostgreSQL configuration and credentials."
    exit 1
fi
