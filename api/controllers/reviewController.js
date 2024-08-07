import pool from "../db.js"


// get all reviews for novel based on novel id
export const getReviewsForNovel = async (req, res) => {
  try {
    const novelId = req.params.novelId;
    const userId = req.query.userId;

    const q = `
      SELECT r.*, u.username
      FROM reviews r
      LEFT JOIN users u ON r.user_id = u.user_id
      WHERE r.novel_id = $1
    `;
    const result = await pool.query(q, [novelId]);

    let userHasReviewed = false;
    if (userId) {
      const userReviewCheck = result.rows.find(review => review.user_id === parseInt(userId));
      userHasReviewed = !!userReviewCheck;
    }

    return res.status(200).json({ reviews: result.rows, userHasReviewed });
  } catch (err) {
    console.error('Error fetching reviews for novel', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


// get all reviews for user based on user id
export const getReviewsForUser = async(req, res) => {
  
}

// add review based on novel and user id
export const addReview = async (req, res) => {
  const client = await pool.connect();

  try {
    const { novel_id, user_id, review_text, score, contains_spoiler } = req.body;

    await client.query('BEGIN');

    const existingReview = await client.query(
      'SELECT * FROM reviews WHERE novel_id = $1 AND user_id = $2',
      [novel_id, user_id]
    );

    if (existingReview.rows.length > 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'You have already reviewed this novel.' });
    }

    const insertReviewQuery = `
      INSERT INTO reviews (novel_id, user_id, review_text, score, contains_spoiler)
      VALUES ($1, $2, $3, $4, $5) RETURNING *
    `;
    const result = await client.query(
      insertReviewQuery,
      [novel_id, user_id, review_text, score, contains_spoiler]
    );

    const updateNovelQuery = `
      UPDATE novels
      SET total_score = total_score + $1,
          review_count = review_count + 1
      WHERE novel_id = $2
    `;
    await client.query(updateNovelQuery, [score, novel_id]);

    await client.query('COMMIT');

    res.status(201).json(result.rows[0]);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error adding review:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// delete review based on novel and user id
export const deleteReview = async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const userId = req.params.userId;
    const novelId = req.params.novelId;

    const result = await client.query(
      "DELETE FROM reviews WHERE novel_id = $1 AND user_id = $2 RETURNING *",
      [novelId, userId]
    );

    if (result.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json("Review not found");
    }

    const updateNovelQuery = `
      UPDATE novels
      SET total_score = total_score - $1,
          review_count = review_count - 1
      WHERE novel_id = $2
    `;

    await client.query(updateNovelQuery, [result.rows[0].score, novelId]);

    await client.query('COMMIT');
    return res.status(200).json("Review has been deleted");
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error deleting review', err.message);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    client.release();
  }
};


// edit review based on novel and user id