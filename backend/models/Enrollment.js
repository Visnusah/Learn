const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Enrollment = sequelize.define('Enrollment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  progress: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0.00,
    validate: {
      min: 0,
      max: 100
    }
  },
  completedLessons: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  startedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  completedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  lastAccessedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  certificateIssued: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  certificateIssuedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('active', 'completed', 'dropped'),
    defaultValue: 'active'
  }
}, {
  timestamps: true
});

module.exports = Enrollment;