import bcrypt from 'bcrypt';
import pool from '../db.js';

export const register = async (req, res) => {
  try {
    // Check if the user already exists
    const checkUserQuery = "SELECT * FROM users WHERE email = $1 OR username = $2";
    const checkUserResult = await pool.query(checkUserQuery, [req.body.email, req.body.username]);

    if (checkUserResult.rows.length) {
      return res.status(409).json("User already exists!");
    }

    // Hash the password and create a new user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const insertUserQuery = "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *";
    const values = [req.body.username, req.body.email, hash];

    const insertUserResult = await pool.query(insertUserQuery, values);

    // Return the newly created user
    return res.status(201).json(insertUserResult.rows[0]);
  } catch (err) {
    console.error("Error registering user:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const login = async (req, res) => {
  
}

export const logout = async (req, res) => {
  
}