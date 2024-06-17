import pool from "../db.js";

export const getAllNovels = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM novels');
    console.log(result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching all novels', err.message);
  }
};

export const getNovelById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM novels WHERE novel_id = $1', [novelId]);
    console.log(result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching single novel', err.message);
  }
};