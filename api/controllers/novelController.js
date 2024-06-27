import pool from "../db.js";
import jwt from "jsonwebtoken";

export const getNovels = async (req, res) => {
  try {
    const q = `
      SELECT 
        n.*,
        COALESCE(
          json_agg(
            DISTINCT jsonb_build_object('genre_id', g.genre_id, 'genre_name', g.genre_name)
          ) FILTER (WHERE g.genre_id IS NOT NULL), 
          '[]'
        ) AS genres
      FROM 
        novels n
      LEFT JOIN 
        novels_genres ng ON n.novel_id = ng.novel_id
      LEFT JOIN 
        genres g ON ng.genre_id = g.genre_id
      GROUP BY 
        n.novel_id;
    `
    const result = await pool.query(q);

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
    const q = `
      SELECT 
        n.*,
        COALESCE(
          json_agg(
            DISTINCT jsonb_build_object('genre_id', g.genre_id, 'genre_name', g.genre_name)
          ) FILTER (WHERE g.genre_id IS NOT NULL), 
          '[]'
        ) AS genres
      FROM 
        novels n
      LEFT JOIN 
        novels_genres ng ON n.novel_id = ng.novel_id
      LEFT JOIN 
        genres g ON ng.genre_id = g.genre_id
      WHERE 
        n.novel_id = $1
      GROUP BY 
        n.novel_id;
    `
    const result = await pool.query(q, [novelId]);

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
    const checkNovelQuery = "SELECT * FROM novels WHERE original_title = $1 OR (title = $2 AND author = $3)"
    const checkNovelResult = await pool.query(checkNovelQuery, [req.body.original_title, req.body.title, req.body.author])

    if (checkNovelResult.rows.length > 0) {
      return res.status(409).json({ error:"Novel already exists"})
    }
    const insertNovelQuery = `
      INSERT INTO novels (title, original_title, author, description, cover_image, score, sources)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    const values = [
      req.body.title,
      req.body.original_title,
      req.body.author,
      req.body.description,
      req.body.cover_image,
      req.body.score,
      req.body.sources
    ];

    const insertNovelResult = await pool.query(insertNovelQuery, values)
    const novelId = insertNovelResult.rows[0].novelId

    const genres = req.body.genres
    
    for(const genreName of genres) {
      let genreId

      // Check if the genre exists
      const checkGenreQuery = 'SELECT * FROM genres WHERE genre_name = $1'
      const checkGenreResult = await pool.query(checkGenreQuery, [genreName])

      if (checkGenreResult.rows.length > 0) {
        genreId = checkGenreResult.rows[0].genre_id
      } else {
        // Create new genre if it doesn't exist. Should I do this?

        const insertGenreQuery = 'INSERT INTO genres (genre_name) VALUES ($1) RETURNING genre_id';
        const insertGenreResult = await pool.query(insertGenreQuery, [genreName]);
        genreId = insertGenreResult.rows[0].genre_id;
        continue;
      }

      // Insert into novels_genres
      const insertNovelGenreQuery = 'INSERT INTO novels_genres (novel_id, genre_id) VALUES ($1, $2)';
      await pool.query(insertNovelGenreQuery, [novelId, genreId]);
    }
    return res.status(201).json({ novel_id: novelId, message: 'Novel and genres added successfully' });
  } catch (err) {
    console.error('Error adding novel', err.message);
    res.status(500).json({ error: "Internal Sever Error"});
    
  }
};

export const deleteNovel = async (req, res) => {
  try {
    // const token = req.cookies.access_token
    // if (!token) return res.status(401).json("User not authenticated")

    // jwt.verify(token, "jwtkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!")
    //   if (userInfo.isAdmin == false) return res.status(403).json("You are not allowed to delete because you are not an admin")
    // })

    // already in middleware.
    
    const novelId = req.params.id
    await pool.query("DELETE FROM novels WHERE novel_id = $1", [novelId])

    return res.status(200).json("Novel has been deleted")
  } catch (err) {
    console.error('Error deleting novel', err.message);
    res.status(500).json({ error: "Internal Sever Error"});
  }
};
export const updateNovel = async (req, res) => {
  try {
    
  } catch (err) {
    console.error('Error updating novel', err.message);
    
  }
};