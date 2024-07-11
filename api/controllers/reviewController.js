import pool from "../db.js"


// get all reviews for novel based on novel id
export const getReviewsForNovel = async (req, res) => {
  try {
    const novelId = req.params.novelId

    const q = `
      SELECT r.*, u.username
      FROM reviews r
      LEFT JOIN users u ON r.user_id = u.user_id
      WHERE r.novel_id = $1
    `
    const result = await pool.query(q, [novelId])

    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching reviews for novel', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// get all reviews for user based on user id
export const getReviewsForUser = async(req, res) => {
  
}

// add review based on novel and user id


// delete review based on novel and user id

// edit review based on novel and user id