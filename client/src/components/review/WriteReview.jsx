import React, { useContext, useEffect, useState } from 'react'
import "./write-review.scss"
import { AuthContext } from '../../context/authContext';
import StarRating from './StarRating';

// show novel information on review page, make default review expressed as 5 stars with one vote not actually that, collect reviews as you need not all,

function WriteReview({ setShowWriteReview, novelId, onSubmit }) {
  const [reviewText, setReviewText] = useState('');
  const [score, setScore] = useState(0);
  const [containsSpoiler, setContainsSpoiler] = useState(false);
  const { currentUser } = useContext(AuthContext)
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    if (reviewText.length >= 80 && score > 0) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [reviewText, score]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isButtonEnabled) {
      const newReview = {
        novel_id: novelId,
        user_id: currentUser.user_id,
        review_text: reviewText,
        score: score,
        contains_spoiler: containsSpoiler
      };
      onSubmit(newReview);
    }
  };

  return (
    <div className="review-modal">
      <div className="overlay" onClick={() => setShowWriteReview(false)}></div>
      <div className="review-section">
        <div className="review-header">
          <div>Write a Review</div>
          <div className="close" onClick={() => setShowWriteReview(false)}>x</div>
        </div>
        <form onSubmit={handleSubmit} className="review-content">
          <div className="review-message">
            <p><strong>Please do not fill the field with unnecessary spaces or characters. As a result of this behavior, the moderator may delete your message.</strong></p>
            <p>Tips for writing a good review:</p>
            <ul>
              <li>Mention the chapter you are on.</li>
              <li>Focus on story quality, not translation quality.</li>
              <li>Discuss aspects such as plot, characters, worldbuilding, and power systems.</li>
            </ul>
          </div>
          <div className="review-score">
            <div>Review Score</div>
            <StarRating setScore={setScore} />
          </div>
          <div className="review-text">
            <textarea 
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Type your review here. Please write your review as detailed as you can. Your reviews would be very important to the story (at least 80 characters)."
              required
              minLength="80"
            ></textarea>
          </div>
          <div className="review-footer">
            <div className="spoiler">
              <input 
                type="checkbox" 
                id="spoiler" 
                checked={containsSpoiler}
                onChange={(e) => setContainsSpoiler(e.target.checked)}
              />
              <label htmlFor="spoiler">Contains Spoiler</label>
            </div>
            <button type="submit" className="post-review" disabled={!isButtonEnabled}>Post Review</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WriteReview;