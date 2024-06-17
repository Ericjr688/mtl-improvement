import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  port: 8800,
  password: 'Daocoder2((2',
  database: 'mtl_improvement'
});


async function queryDatabase() {
  try {
    const res = await pool.query('SELECT * FROM public.users');
    console.log(res.rows);
  } catch (err) {
    console.error('Error executing query', err.message);
  } finally {
    await pool.end();
  }
}

//queryDatabase();



export default pool;