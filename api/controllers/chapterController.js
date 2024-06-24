import pool from "../db.js";

export const getChaptersForNovel = async (req, res) => {
  try {
    const  q =  `
      SELECT c.*, u.username, n.title AS novel_title
      FROM chapters c
      JOIN users u ON c.user_id = u.user_id
      JOIN novels n ON c.novel_id = n.novel_id
      WHERE c.novel_id = $1
      ORDER BY c.chapter_number ASC 
    `
    const novelId = req.params.novelId
    const result = await pool.query(q, [novelId])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No chapters found for this novel' });
    }
    return res.status(200).json(result.rows)
  } catch (err) {
    console.error('Error fetching chapters for novel', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export const getChapter = async (req, res) => {
  try {
    const q = `
      SELECT c.*, u.username, n.title AS novel_title
      FROM chapters c
      JOIN users u ON c.user_id = u.user_id
      JOIN novels n ON c.novel_id = n.novel_id
      WHERE c.chapter_id = $1
    `
    const chapterId = req.params.chapterId
    const result = await pool.query(q, [chapterId])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Chapter not found' });
    }

    return res.status(200).json(result.rows[0])
  } catch (err) {
    console.error('Error fetching chapter', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export const getRecentChapters = async (req, res) => {
  try {
    const q = `
      SELECT c.*, u.username, n.title AS novel_title
      FROM chapters c
      JOIN users u ON c.user_id = u.user_id
      JOIN novels n ON c.novel_id = n.novel_id
      ORDER BY c.created_at DESC 
      LIMIT 10
    `
    const result = await pool.query(q);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No recent chapters found' });
    }

    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching recent chapters', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getRecentChaptersForNovel = async (req, res) => {
  try {
    const q = `
      SELECT c.*, u.username, n.title AS novel_title
      FROM chapters c
      JOIN users u ON c.user_id = u.user_id
      JOIN novels n ON c.novel_id = n.novel_id
      WHERE c.novel_id = $1
      ORDER BY c.created_at DESC 
      LIMIT 5
    `
    const novelId = req.params.novelId
    const result = await pool.query(q, [novelId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No recent chapters found' });
    }

    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching recent chapters for novel', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};