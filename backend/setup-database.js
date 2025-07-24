const { Client } = require('pg');
require('dotenv').config();

const setupDatabase = async () => {
  const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
  };

  const dbName = process.env.DB_NAME || 'learnx_db';

  console.log('🔧 Setting up PostgreSQL database...');
  
  // Connect to PostgreSQL (without specifying database)
  const client = new Client(dbConfig);
  
  try {
    await client.connect();
    console.log('✅ Connected to PostgreSQL server');

    // Check if database exists
    const dbExists = await client.query(
      'SELECT 1 FROM pg_database WHERE datname = $1',
      [dbName]
    );

    if (dbExists.rows.length === 0) {
      // Create database
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`✅ Database '${dbName}' created successfully`);
    } else {
      console.log(`⚠️  Database '${dbName}' already exists`);
    }

    await client.end();

    // Test connection to the new database
    const testClient = new Client({
      ...dbConfig,
      database: dbName
    });

    await testClient.connect();
    const result = await testClient.query('SELECT version()');
    console.log('✅ Database connection test successful');
    console.log(`📊 PostgreSQL Version: ${result.rows[0].version.split(' ')[1]}`);
    await testClient.end();

    console.log('\n🎉 Database setup complete!');
    console.log('📋 Database Details:');
    console.log(`   Host: ${dbConfig.host}`);
    console.log(`   Port: ${dbConfig.port}`);
    console.log(`   Database: ${dbName}`);
    console.log(`   User: ${dbConfig.user}`);
    console.log('\n📝 Next steps:');
    console.log('   1. Run "npm run dev" to start the backend server');
    console.log('   2. The server will automatically create the required tables');

  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n🔧 PostgreSQL Connection Issues:');
      console.log('   1. Make sure PostgreSQL is installed and running');
      console.log('   2. Check if the service is started:');
      console.log('      - macOS: brew services start postgresql');
      console.log('      - Ubuntu: sudo systemctl start postgresql');
      console.log('      - Windows: Start PostgreSQL service from Services');
      console.log('   3. Verify your database credentials in .env file');
    } else if (error.code === '28P01') {
      console.log('\n🔐 Authentication Issues:');
      console.log('   1. Check your username and password in .env file');
      console.log('   2. Make sure the PostgreSQL user exists and has proper permissions');
    }
    
    process.exit(1);
  }
};

// Run the setup
setupDatabase();
