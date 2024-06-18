import pool from "../db.js";

export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching all users', err.message);
  }
};

export const getUserById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching single user', err.message);
  }
};

export const addNewUser = async (req, res) => {
  try {
    
  } catch (err) {
    console.error('Error adding user', err.message);
  }
};

// update user

// delete user