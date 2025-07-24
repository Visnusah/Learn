const { Client } = require('pg');
require('dotenv').config();

const setupPostgreSQL = async () => {
  const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
  };

  const dbName = process.env.DB_NAME || 'learnx_db';

  console.log('🔧 Setting up PostgreSQL database...');
  console.log(`📋 Configuration: ${dbConfig.user}@${dbConfig.host}:${dbConfig.port}`);
  
  // Connect to PostgreSQL (without specifying database)
  const client = new Client(dbConfig);
  
  try {
    await client.connect();
    console.log('✅ Connected to PostgreSQL server');

    // Check if database exists
    const dbCheckQuery = 'SELECT 1 FROM pg_database WHERE datname = $1';
    const dbExists = await client.query(dbCheckQuery, [dbName]);

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
    
    // Get PostgreSQL version and database info
    const versionResult = await testClient.query('SELECT version()');
    const dbSizeResult = await testClient.query(`
      SELECT pg_size_pretty(pg_database_size($1)) as size
    `, [dbName]);
    
    console.log('✅ Database connection test successful');
    console.log(`📊 PostgreSQL Version: ${versionResult.rows[0].version.split(' ')[1]}`);
    console.log(`💾 Database Size: ${dbSizeResult.rows[0].size}`);
    
    // Check if tables exist
    const tablesResult = await testClient.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);
    
    if (tablesResult.rows.length > 0) {
      console.log(`📋 Existing tables: ${tablesResult.rows.map(r => r.table_name).join(', ')}`);
    } else {
      console.log('📋 No tables found (fresh database)');
    }
    
    await testClient.end();

    console.log('\n🎉 PostgreSQL setup complete!');
    console.log('📋 Database Details:');
    console.log(`   Host: ${dbConfig.host}`);
    console.log(`   Port: ${dbConfig.port}`);
    console.log(`   Database: ${dbName}`);
    console.log(`   User: ${dbConfig.user}`);
    console.log('\n📝 Next steps:');
    console.log('   1. Run "npm run dev" to start the backend server');
    console.log('   2. Tables will be created automatically');
    console.log('   3. Use "npm run db:seed" to add sample data');

    return true;

  } catch (error) {
    console.error('❌ PostgreSQL setup failed:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n🔧 PostgreSQL Connection Issues:');
      console.log('   1. Install PostgreSQL:');
      console.log('      macOS: brew install postgresql');
      console.log('      Ubuntu: sudo apt-get install postgresql');
      console.log('   2. Start PostgreSQL service:');
      console.log('      macOS: brew services start postgresql');
      console.log('      Ubuntu: sudo systemctl start postgresql');
      console.log('   3. Verify service is running: pg_isready');
      console.log('\n💡 Alternative: Use SQLite for development');
      console.log('   Add to .env: DB_DIALECT=sqlite');
    } else if (error.code === '28P01') {
      console.log('\n🔐 Authentication Issues:');
      console.log('   1. Check username/password in .env file');
      console.log('   2. Create PostgreSQL user:');
      console.log('      createuser -s postgres');
      console.log('   3. Set password: \\password postgres (in psql)');
    } else if (error.code === '3D000') {
      console.log('\n📊 Database Issues:');
      console.log('   Database creation failed - check permissions');
    }
    
    return false;
  }
};

// Run setup if called directly
if (require.main === module) {
  setupPostgreSQL()
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('Setup failed:', error);
      process.exit(1);
    });
}

module.exports = { setupPostgreSQL };
