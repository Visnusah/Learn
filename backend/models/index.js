const { sequelize } = require('../config/database');
const User = require('./User');
const Course = require('./Course');
const Enrollment = require('./Enrollment');

// Define associations
User.hasMany(Course, { 
  foreignKey: 'instructorId', 
  as: 'courses' 
});

Course.belongsTo(User, { 
  foreignKey: 'instructorId', 
  as: 'instructor' 
});

User.belongsToMany(Course, { 
  through: Enrollment, 
  foreignKey: 'userId',
  otherKey: 'courseId',
  as: 'enrolledCourses'
});

Course.belongsToMany(User, { 
  through: Enrollment, 
  foreignKey: 'courseId',
  otherKey: 'userId',
  as: 'students'
});

Enrollment.belongsTo(User, { 
  foreignKey: 'userId',
  as: 'user'
});

Enrollment.belongsTo(Course, { 
  foreignKey: 'courseId',
  as: 'course'
});

// Sync database with proper options to prevent duplicate tables
const syncDatabase = async () => {
  try {
    // Check if we're in development or production
    const isDevelopment = process.env.NODE_ENV === 'development';
    const isForce = process.env.DB_FORCE_SYNC === 'true';
    
    let syncOptions = {
      alter: false,
      force: false
    };

    if (isDevelopment) {
      syncOptions.alter = true; // Updates existing tables to match models
    }

    if (isForce) {
      console.log('⚠️  WARNING: Force sync enabled - this will drop and recreate all tables!');
      syncOptions.force = true;
    }

    // Check if tables already exist to prevent unnecessary operations
    const tableNames = await sequelize.getQueryInterface().showAllTables();
    const tablesExist = tableNames.length > 0;

    if (tablesExist && !syncOptions.alter && !syncOptions.force) {
      console.log('📊 Tables already exist, skipping sync');
      console.log(`📋 Existing tables: ${tableNames.join(', ')}`);
      return;
    }

    console.log('🔄 Synchronizing database schema...');
    console.log(`📋 Sync options:`, syncOptions);

    // Sync individual models in dependency order to handle foreign keys
    await User.sync(syncOptions);
    await Course.sync(syncOptions);
    await Enrollment.sync(syncOptions);

    // Alternative: sync all at once (commented out to avoid conflicts)
    // await sequelize.sync(syncOptions);

    console.log('✅ Database synchronized successfully.');
    console.log(`📊 Models: User, Course, Enrollment`);
    
    // Log table information
    const finalTables = await sequelize.getQueryInterface().showAllTables();
    console.log(`📋 Final tables: ${finalTables.join(', ')}`);
    
  } catch (error) {
    console.error('❌ Error synchronizing database:', error.message);
    
    // Provide helpful error messages
    if (error.message.includes('duplicate key')) {
      console.log('💡 Tip: Tables may already exist. Set DB_FORCE_SYNC=true to recreate them.');
    } else if (error.message.includes('relation') && error.message.includes('does not exist')) {
      console.log('💡 Tip: Database may not exist. Create it first: createdb learnx_db');
    }
    
    throw error;
  }
};

module.exports = {
  sequelize,
  User,
  Course,
  Enrollment,
  syncDatabase,
  testConnection: require('../config/database').testConnection
};