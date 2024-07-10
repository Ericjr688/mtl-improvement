import bcrypt from 'bcrypt';
import pool from '../db.js';
import jwt from 'jsonwebtoken'

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
  try {
    // Check if user exists
    const checkUserQuery = "SELECT * FROM users WHERE username = $1";
    const checkUserResult = await pool.query(checkUserQuery, [req.body.username]);

    if (!checkUserResult.rows.length) {
      return res.status(404).json("User does not exist!");
    }

    const data = checkUserResult.rows[0]

    // Check password
    const passwordHash = data.password_hash

    if (!bcrypt.compareSync(req.body.password, passwordHash)) {
      return res.status(400).json("Wrong username or password!");
    }

    const token = jwt.sign({id: data.user_id, isAdmin: data.isAdmin}, "jwtkey");
    const {password_hash, ...others} = data;


    res.cookie("access_token", token, {
      httpOnly:true
    }).status(200).json(others)

  
  } catch (err) {
    console.error("Error logging in:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const logout = async (req, res) => {
  res.clearCookie("access_token", {
    sameSite: "none",
    secure: true
  }).status(200).json("User has been logged out.")
}