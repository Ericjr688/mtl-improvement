import pool from "../db.js";

export const getNovels = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM novels');

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Novels not found' });
    }

    return res.status(200).json(result.rows)
  } catch (err) {
    console.error('Error fetching all novels', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getNovel = async (req, res) => {
  try {
    const novelId = req.params.id
    const result = await pool.query('SELECT * FROM novels WHERE novel_id = $1', [novelId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Novel not found' });
    }

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching single novel', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const addNovel = async (req, res) => {
  try {
    
  } catch (err) {
    console.error('Error deleting novel', err.message);
    
  }
};

export const deleteNovel = async (req, res) => {
  try {
    
  } catch (err) {
    console.error('Error deleting novel', err.message);
    
  }
};
export const updateNovel = async (req, res) => {
  try {
    
  } catch (err) {
    console.error('Error deleting novel', err.message);
    
  }
};