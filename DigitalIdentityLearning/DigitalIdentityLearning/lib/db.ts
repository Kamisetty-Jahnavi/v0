import { Pool } from 'pg'

let pool: Pool

function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    })
  }
  return pool
}

export default {
  query: async (text: string, params: any[]) => {
    const pool = getPool()
    const client = await pool.connect()
    try {
      return await client.query(text, params)
    } finally {
      client.release()
    }
  },
}

