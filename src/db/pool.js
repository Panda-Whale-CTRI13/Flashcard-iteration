const path = require('path');
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// TODO: move thi to secrets.js
const PG_URI = `postgres://hhhwvygk:${process.env.DB_PASSWORD}@hansken.db.elephantsql.com/hhhwvygk`;

// This pools multiple db accesses into one request
const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    // console.log('checking the pool')
    // console.log(text, params)
    // console.log the actual sql command being executed
    const sqlCommand = text.replace(/\$(\d+)/g, (match, index) => {
      return typeof params[index - 1] === 'string'
        ? `\'${params[index - 1]}\'`
        : params[index - 1];
    });
    console.log('running sql command: ', sqlCommand);

    // return result of executing sql command
    return pool.query(text, params, callback);
  },
};
