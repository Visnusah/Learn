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

// Sync database
const syncDatabase = async () => {
  try {
    // Use force: false in production, alter: true for development
    const options = process.env.NODE_ENV === 'production' 
      ? { alter: false } 
      : { alter: true, force: false };
    
    await sequelize.sync(options);
    console.log('✅ Database synchronized successfully.');
    console.log(`📊 Models: User, Course, Enrollment`);
  } catch (error) {
    console.error('❌ Error synchronizing database:', error.message);
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