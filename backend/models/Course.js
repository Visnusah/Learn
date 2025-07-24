const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [5, 200]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  shortDescription: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  level: {
    type: DataTypes.ENUM('Beginner', 'Intermediate', 'Advanced'),
    defaultValue: 'Beginner'
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: true
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  status: {
    type: DataTypes.ENUM('draft', 'published', 'archived'),
    defaultValue: 'draft'
  },
  requirements: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  whatYouLearn: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  tags: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  rating: {
    type: DataTypes.DECIMAL(3, 2),
    defaultValue: 0.00
  },
  totalRatings: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  totalStudents: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: true
});

module.exports = Course;