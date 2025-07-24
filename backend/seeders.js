const { User, Course, Enrollment, sequelize } = require('./models');

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Force sync to recreate tables (use carefully!)
    // await sequelize.sync({ force: true });
    
    // Or use alter to update existing tables
    await sequelize.sync({ alter: true });
    console.log('✅ Database schema updated');

    // Create admin user
    const adminUser = await User.findOrCreate({
      where: { email: 'admin@learnx.com' },
      defaults: {
        name: 'Admin User',
        email: 'admin@learnx.com',
        password: 'admin123',
        role: 'admin',
        isEmailVerified: true,
        bio: 'System Administrator'
      }
    });

    console.log('👤 Admin user created/found');

    // Create sample teacher
    const teacher = await User.findOrCreate({
      where: { email: 'teacher@learnx.com' },
      defaults: {
        name: 'John Instructor',
        email: 'teacher@learnx.com',
        password: 'teacher123',
        role: 'teacher',
        isEmailVerified: true,
        bio: 'Experienced instructor with 10+ years in web development'
      }
    });

    console.log('👨‍🏫 Teacher user created/found');

    // Create sample student
    const student = await User.findOrCreate({
      where: { email: 'student@learnx.com' },
      defaults: {
        name: 'Sarah Student',
        email: 'student@learnx.com',
        password: 'student123',
        role: 'student',
        isEmailVerified: true,
        bio: 'Eager to learn new technologies'
      }
    });

    console.log('👩‍🎓 Student user created/found');

    // Create sample courses
    const course1 = await Course.findOrCreate({
      where: { title: 'Complete React Development Course' },
      defaults: {
        title: 'Complete React Development Course',
        description: 'Learn React from scratch with hands-on projects and real-world examples.',
        shortDescription: 'Master React.js with practical projects',
        category: 'Web Development',
        level: 'Intermediate',
        duration: '40 hours',
        price: 99.99,
        status: 'published',
        instructorId: teacher[0].id,
        requirements: ['Basic JavaScript knowledge', 'HTML & CSS familiarity'],
        whatYouLearn: ['React fundamentals', 'Component architecture', 'State management', 'API integration'],
        tags: ['React', 'JavaScript', 'Frontend', 'Web Development']
      }
    });

    const course2 = await Course.findOrCreate({
      where: { title: 'Node.js Backend Development' },
      defaults: {
        title: 'Node.js Backend Development',
        description: 'Build scalable backend applications with Node.js, Express, and databases.',
        shortDescription: 'Master backend development with Node.js',
        category: 'Backend Development',
        level: 'Intermediate',
        duration: '35 hours',
        price: 89.99,
        status: 'published',
        instructorId: teacher[0].id,
        requirements: ['JavaScript basics', 'Understanding of web concepts'],
        whatYouLearn: ['Node.js fundamentals', 'Express.js framework', 'Database integration', 'API development'],
        tags: ['Node.js', 'Express', 'Backend', 'API']
      }
    });

    const course3 = await Course.findOrCreate({
      where: { title: 'Introduction to Programming' },
      defaults: {
        title: 'Introduction to Programming',
        description: 'Start your programming journey with fundamental concepts and practical examples.',
        shortDescription: 'Learn programming basics step by step',
        category: 'Programming Fundamentals',
        level: 'Beginner',
        duration: '20 hours',
        price: 49.99,
        status: 'published',
        instructorId: teacher[0].id,
        requirements: ['No prior experience needed'],
        whatYouLearn: ['Programming concepts', 'Problem solving', 'Basic algorithms', 'Code structure'],
        tags: ['Programming', 'Beginner', 'Fundamentals']
      }
    });

    console.log('📚 Sample courses created/found');

    // Create sample enrollment
    await Enrollment.findOrCreate({
      where: { 
        userId: student[0].id,
        courseId: course1[0].id
      },
      defaults: {
        userId: student[0].id,
        courseId: course1[0].id,
        progress: 25.5,
        completedLessons: ['lesson1', 'lesson2'],
        status: 'active'
      }
    });

    console.log('📝 Sample enrollment created/found');

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📊 Sample Data Created:');
    console.log('👤 Users:');
    console.log('   - Admin: admin@learnx.com (password: admin123)');
    console.log('   - Teacher: teacher@learnx.com (password: teacher123)');
    console.log('   - Student: student@learnx.com (password: student123)');
    console.log('📚 Courses: 3 sample courses');
    console.log('📝 Enrollments: 1 sample enrollment');
    
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
  } finally {
    await sequelize.close();
  }
};

// Run seeding if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };
