import pool from "../db.js";

export const getUserLibrary = async (req, res) => {
  try {
    const userId = req.params.id

    const q = `
      SELECT 
          l.entry_id,
          l.user_id,
          l.novel_id,
          l.created_at AS library_created_at,
          n.novel_id,
          n.title,
          n.original_title,
          n.author,
          n.description,
          n.cover_image,
          n.score,
          n.sources,
          n.is_improved,
          n.created_at AS novel_created_at
      FROM 
          library l
      LEFT JOIN 
          novels n ON l.novel_id = n.novel_id
      WHERE 
          l.user_id = $1;
    `;
    const result = await pool.query(q, [userId])

    // do we check if user does not exist?

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User library is empty or user does not exist' });
    }

    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching user library', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export const addNovelToUserLibrary = async (req, res) => {
  try {
    const {userId, novelId} = req.body

    const q = `
      INSERT INTO library (user_id, novel_id)
      VALUES ($1, $2)
      ON CONFLICT (user_id, novel_id) DO NOTHING
    `

    await pool.query(q, [userId, novelId]);
    return res.status(201).json({ message: 'Novel added to user library' });
  } catch (err) {
    console.error('Error adding novel to user library', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export const deleteNovelFromUserLibrary = async (req, res) => {
  try {
    const {userId, novelId} = req.params
    const q = "DELETE FROM library WHERE user_id = $1 AND novel_id = $2"

    await pool.query(q, [userId, novelId]);
    res.status(200).json("Novel removed from library");
  } catch (err) {
    console.error('Error deleting novel from user library', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
}