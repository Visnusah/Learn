const { sequelize, User, Course, Enrollment } = require('./models');

const runMigrations = async () => {
  console.log('🔄 Running database migrations...');
  
  try {
    // Get database dialect
    const dialect = sequelize.getDialect();
    console.log(`📊 Database: ${dialect.toUpperCase()}`);

    // Check current database state
    const queryInterface = sequelize.getQueryInterface();
    const existingTables = await queryInterface.showAllTables();
    
    console.log(`📋 Existing tables: ${existingTables.length > 0 ? existingTables.join(', ') : 'None'}`);

    // Define migration steps
    const migrations = [
      {
        name: 'CreateUsersTable',
        up: async () => {
          if (!existingTables.includes('users')) {
            await User.sync({ force: false });
            console.log('✅ Users table created');
          } else {
            console.log('⚠️  Users table already exists, checking for updates...');
            await User.sync({ alter: true });
            console.log('✅ Users table updated');
          }
        }
      },
      {
        name: 'CreateCoursesTable',
        up: async () => {
          if (!existingTables.includes('courses')) {
            await Course.sync({ force: false });
            console.log('✅ Courses table created');
          } else {
            console.log('⚠️  Courses table already exists, checking for updates...');
            await Course.sync({ alter: true });
            console.log('✅ Courses table updated');
          }
        }
      },
      {
        name: 'CreateEnrollmentsTable',
        up: async () => {
          if (!existingTables.includes('enrollments')) {
            await Enrollment.sync({ force: false });
            console.log('✅ Enrollments table created');
          } else {
            console.log('⚠️  Enrollments table already exists, checking for updates...');
            await Enrollment.sync({ alter: true });
            console.log('✅ Enrollments table updated');
          }
        }
      }
    ];

    // Run migrations in order
    for (const migration of migrations) {
      try {
        console.log(`🔄 Running migration: ${migration.name}`);
        await migration.up();
      } catch (error) {
        console.error(`❌ Migration ${migration.name} failed:`, error.message);
        
        // Check if it's a duplicate/already exists error (safe to ignore)
        if (error.message.includes('already exists') || 
            error.message.includes('duplicate') ||
            error.message.includes('relation') && error.message.includes('exists')) {
          console.log(`⚠️  ${migration.name} - Table already exists, continuing...`);
        } else {
          throw error;
        }
      }
    }

    // Verify final state
    const finalTables = await queryInterface.showAllTables();
    console.log(`📋 Final tables: ${finalTables.join(', ')}`);

    // Check table structures
    for (const tableName of finalTables) {
      try {
        const columns = await queryInterface.describeTable(tableName);
        const columnNames = Object.keys(columns);
        console.log(`📊 ${tableName}: ${columnNames.length} columns (${columnNames.slice(0, 5).join(', ')}${columnNames.length > 5 ? '...' : ''})`);
      } catch (error) {
        console.log(`⚠️  Could not describe table ${tableName}`);
      }
    }

    console.log('\n🎉 Database migrations completed successfully!');
    console.log('📊 Database is ready for use');

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    
    if (error.message.includes('duplicate key')) {
      console.log('💡 Tip: Some tables may already exist. This is usually safe to ignore.');
    } else if (error.message.includes('permission denied')) {
      console.log('💡 Tip: Check database user permissions');
    }
    
    throw error;
  }
};

// Run migrations if called directly
if (require.main === module) {
  runMigrations()
    .then(() => {
      console.log('Migration completed successfully');
      process.exit(0);
    })
    .catch(error => {
      console.error('Migration failed:', error);
      process.exit(1);
    });
}

module.exports = { runMigrations };
