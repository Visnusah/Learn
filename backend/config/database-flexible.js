const { Sequelize } = require('sequelize');
require('dotenv').config();

// Database configuration with fallback to SQLite
let sequelize;

if (process.env.DB_DIALECT === 'sqlite' || !process.env.DB_NAME) {
  // SQLite configuration (fallback)
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_PATH || './database.sqlite',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true,
      underscored: true,
      paranoid: true
    }
  });
} else {
  // PostgreSQL configuration
  sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true,
      underscored: true,
      paranoid: true
    }
  });
}

// Test database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    const dialect = sequelize.getDialect();
    console.log(`✅ ${dialect.toUpperCase()} database connection established successfully.`);
    
    if (dialect === 'postgres') {
      console.log(`📊 Connected to database: ${process.env.DB_NAME}`);
    } else {
      console.log(`📊 Using SQLite database: ${process.env.DB_PATH || './database.sqlite'}`);
    }
  } catch (error) {
    console.error(`❌ Unable to connect to the database:`, error.message);
    
    if (error.code === 'ECONNREFUSED' && sequelize.getDialect() === 'postgres') {
      console.log('\n🔧 PostgreSQL Connection Failed!');
      console.log('💡 Quick fix: Switch to SQLite for development');
      console.log('   Add this to your .env file: DB_DIALECT=sqlite');
      console.log('   Or install PostgreSQL: brew install postgresql');
    }
    
    throw error;
  }
};

module.exports = { sequelize, testConnection };
