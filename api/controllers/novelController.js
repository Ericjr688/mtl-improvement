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
    `;
    const result = await pool.query(q);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Novels not found' });
    }

    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching all novels', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getNovel = async (req, res) => {
  try {
    const novelId = req.params.id;
    const userId = req.query.userId;

    const q = `
      SELECT 
        n.*,
        COALESCE(
          json_agg(
            DISTINCT jsonb_build_object('genre_id', g.genre_id, 'genre_name', g.genre_name)
          ) FILTER (WHERE g.genre_id IS NOT NULL), 
          '[]'
        ) AS genres,
        COALESCE(
          json_agg(
            DISTINCT jsonb_build_object('tag_id', t.tag_id, 'tag_name', t.tag_name)
          ) FILTER (WHERE t.tag_id IS NOT NULL), 
          '[]'
        ) AS tags,
        EXISTS (
          SELECT 1
          FROM library l
          WHERE l.novel_id = n.novel_id AND l.user_id = $2
        ) AS in_library
      FROM 
        novels n
      LEFT JOIN 
        novels_genres ng ON n.novel_id = ng.novel_id
      LEFT JOIN 
        genres g ON ng.genre_id = g.genre_id
      LEFT JOIN
        novels_tags nt ON n.novel_id = nt.novel_id
      LEFT JOIN
        tags t ON nt.tag_id = t.tag_id
      WHERE 
        n.novel_id = $1
      GROUP BY 
        n.novel_id;
    `;
    const result = await pool.query(q, [novelId, userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Novel not found' });
    }

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching single novel', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


// export const addNovel = async (req, res) => {
//   // only done by admin so verification needed
//   try {
//     const checkNovelQuery = "SELECT * FROM novels WHERE original_title = $1 OR (title = $2 AND author = $3)"
//     const checkNovelResult = await pool.query(checkNovelQuery, [req.body.original_title, req.body.title, req.body.author])

//     if (checkNovelResult.rows.length > 0) {
//       return res.status(409).json({ error:"Novel already exists"})
//     }
//     const insertNovelQuery = `
//       INSERT INTO novels (title, original_title, author, description, cover_image, score, sources)
//       VALUES ($1, $2, $3, $4, $5, $6, $7)
//       RETURNING *;
//     `;

//     const values = [
//       req.body.title,
//       req.body.original_title,
//       req.body.author,
//       req.body.description,
//       req.body.cover_image,
//       req.body.score,
//       req.body.sources
//     ];

//     const insertNovelResult = await pool.query(insertNovelQuery, values)
//     const novelId = insertNovelResult.rows[0].novelId

//     const genres = req.body.genres
    
//     for(const genreName of genres) {
//       let genreId

//       // Check if the genre exists
//       const checkGenreQuery = 'SELECT * FROM genres WHERE genre_name = $1'
//       const checkGenreResult = await pool.query(checkGenreQuery, [genreName])

//       if (checkGenreResult.rows.length > 0) {
//         genreId = checkGenreResult.rows[0].genre_id
//       } else {
//         // Create new genre if it doesn't exist. Should I do this?

//         const insertGenreQuery = 'INSERT INTO genres (genre_name) VALUES ($1) RETURNING genre_id';
//         const insertGenreResult = await pool.query(insertGenreQuery, [genreName]);
//         genreId = insertGenreResult.rows[0].genre_id;
//         continue;
//       }

//       // Insert into novels_genres
//       const insertNovelGenreQuery = 'INSERT INTO novels_genres (novel_id, genre_id) VALUES ($1, $2)';
//       await pool.query(insertNovelGenreQuery, [novelId, genreId]);
//     }
//     return res.status(201).json({ novel_id: novelId, message: 'Novel and genres added successfully' });
//   } catch (err) {
//     console.error('Error adding novel', err.message);
//     res.status(500).json({ error: "Internal Sever Error"});
    
//   }
// };


export const addNovel = async (req, res) => {
  try {
    const checkNovelQuery = "SELECT * FROM novels WHERE original_title = $1 OR (title = $2 AND author = $3)";
    const checkNovelResult = await pool.query(checkNovelQuery, [req.body.original_title, req.body.title, req.body.author]);

    if (checkNovelResult.rows.length > 0) {
      return res.status(409).json({ error: "Novel already exists" });
    }

    await pool.query('BEGIN');

    const insertNovelQuery = `
      INSERT INTO novels (title, original_title, author, description, cover_image, score, sources)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING novel_id;
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
    const insertNovelResult = await pool.query(insertNovelQuery, values);
    const novelId = insertNovelResult.rows[0].novel_id;

    // Insert genres
    const genres = req.body.genres;
    if (genres && genres.length > 0) {
      // inserts all genres and tags regardless of whether they are present or not. Should I should eliminate this feature
      const genreValues = genres.map(genreName => `('${genreName}')`).join(',');
      const insertGenresQuery = `
        INSERT INTO genres (genre_name) VALUES ${genreValues}
        ON CONFLICT (genre_name) DO NOTHING;
      `;
      await pool.query(insertGenresQuery);

      const getGenreIdsQuery = `
        SELECT genre_id
        FROM genres
        WHERE genre_name = ANY($1::text[])
      `;
      const getGenreIdsResult = await pool.query(getGenreIdsQuery, [genres]);

      const novelGenreValues = getGenreIdsResult.rows.map(row => `(${novelId}, ${row.genre_id})`).join(',');
      const insertNovelGenresQuery = `
        INSERT INTO novels_genres (novel_id, genre_id) VALUES ${novelGenreValues}
        ON CONFLICT DO NOTHING;
      `;
      await pool.query(insertNovelGenresQuery);
    }

    // Insert tags
    const tags = req.body.tags;
    if (tags && tags.length > 0) {
      const tagValues = tags.map(tagName => `('${tagName}')`).join(',');
      const insertTagsQuery = `
        INSERT INTO tags (tag_name) VALUES ${tagValues}
        ON CONFLICT (tag_name) DO NOTHING;
      `
      await pool.query(insertTagsQuery);

      const getTagsIdsQuery = `
        SELECT tag_id 
        FROM tags
        WHERE tag_name = ANY($1::text[])
      `;

      const getTagsIdsResult = await pool.query(getTagsIdsQuery, [tags]);
    
      const novelTagsValues = getTagsIdsResult.rows.map(row => `(${novelId}, ${row.tag_id})`).join(',');
      const insertNovelTagsQuery = `
        INSERT INTO novels_tags (novel_id, tag_id)  VALUES ${novelTagsValues}
        ON CONFLICT DO NOTHING;
      `;
      await pool.query(insertNovelTagsQuery);
    }

    await pool.query('COMMIT');
    
    return res.status(201).json({ novel_id: novelId, message: 'Novel and genres added successfully' });

  } catch (err) {
    await pool.query('ROLLBACK');
    console.error('Error adding novel', err.message);
    res.status(500).json({ error: "Internal Server Error" });
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