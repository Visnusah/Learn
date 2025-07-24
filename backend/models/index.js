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
    await sequelize.sync({ alter: true });
    console.log('✅ Database synchronized successfully.');
  } catch (error) {
    console.error('❌ Error synchronizing database:', error);
  }
};

module.exports = {
  sequelize,
  User,
  Course,
  Enrollment,
  syncDatabase
};