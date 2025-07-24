const { Sequelize } = require('sequelize');
require('dotenv').config();

// Database configuration with proper PostgreSQL setup
let sequelize;

const dbConfig = {
  dialect: process.env.DB_DIALECT || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'learnx_db',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: true,
    underscored: true,
    paranoid: true, // Enables soft deletes
    freezeTableName: true, // Prevents Sequelize from pluralizing table names
  },
  dialectOptions: process.env.DB_DIALECT === 'postgres' ? {
    // PostgreSQL specific options
    ssl: process.env.NODE_ENV === 'production' ? {
      require: true,
      rejectUnauthorized: false
    } : false
  } : {}
};

// Fallback to SQLite if PostgreSQL is not available
if (process.env.DB_DIALECT === 'sqlite' || !process.env.DB_NAME) {
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
      paranoid: true,
      freezeTableName: true
    }
  });
} else {
  sequelize = new Sequelize(dbConfig);
}

// Test database connection with retry logic
const testConnection = async (retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      await sequelize.authenticate();
      const dialect = sequelize.getDialect();
      console.log(`✅ ${dialect.toUpperCase()} database connection established successfully.`);
      
      if (dialect === 'postgres') {
        console.log(`📊 Connected to PostgreSQL database: ${process.env.DB_NAME}`);
        console.log(`🔗 Host: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
      } else {
        console.log(`📊 Using SQLite database: ${process.env.DB_PATH || './database.sqlite'}`);
      }
      return true;
    } catch (error) {
      console.error(`❌ Database connection attempt ${i + 1}/${retries} failed:`, error.message);
      
      if (i === retries - 1) {
        if (error.code === 'ECONNREFUSED' && sequelize.getDialect() === 'postgres') {
          console.log('\n🔧 PostgreSQL Connection Failed!');
          console.log('💡 Solutions:');
          console.log('   1. Install PostgreSQL: brew install postgresql');
          console.log('   2. Start PostgreSQL: brew services start postgresql');
          console.log('   3. Create database: createdb learnx_db');
          console.log('   4. Or switch to SQLite: DB_DIALECT=sqlite in .env');
          console.log('\n📋 Falling back to SQLite...');
          
          // Fallback to SQLite
          process.env.DB_DIALECT = 'sqlite';
          return testConnection(1);
        }
        throw error;
      }
      
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
};

module.exports = { sequelize, testConnection };