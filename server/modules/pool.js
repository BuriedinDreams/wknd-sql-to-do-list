const pg = require('pg');

// Create a connection to our database
const pool = new pg.Pool({
  // This option is required
  database: 'weekend-to-do-app',

  // these are not required,
  // but you may see them around
  host: 'localhost',
  port: 5432,
});

pool.on('connect', () => {
  console.log('connected to postgres');
});

pool.on('error', (error) => {
  console.log('ERROR: Connecting to postgres', error);
});

module.exports = pool;
