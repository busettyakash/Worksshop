process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import pg from 'pg'


const { Pool } = pg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
})

pool.on('error', (err) => {
  console.error('[DB] Unexpected pool error:', err.message)
})

export const query = (text, params) => pool.query(text, params)
export default pool
