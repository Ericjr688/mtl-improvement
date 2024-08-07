import { useContext, useState } from 'react';
import { timeAgo } from '../../helpers';
import RatingsDisplay from './RatingsDisplay'; 
import './reviews-list.scss'
import { AuthContext } from '../../context/authContext';

const IndividualReview = ({ review, reviewType, handleDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSpoiler, setShowSpoiler] = useState(!review.contains_spoiler);
  const { currentUser } = useContext(AuthContext)
  

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const revealSpoiler = () => {
    setShowSpoiler(true);
  };

  const reviewTextExceedsLimit = review.review_text.length > 150;

  return (
    <div className="review-card">
      {reviewType === 'novel' ? (
        <div className="user-info">
          <div className="user-details">
            <img src="" alt="User Avatar" className="user-avatar" />
            <span className="username">{review.username}</span>
          </div>
          <div className="rating-wrapper">
            <RatingsDisplay score={review.score} />
            <span className="review-date">{timeAgo(review.created_at)}</span>
          </div>
        </div>
      ) : (
        <div className="novel-info">
          <span className="novel-name">Placeholder Novel Name</span>
          <RatingsDisplay score={review.score} />
          <span className="review-date">{timeAgo(review.created_at)}</span>
        </div>
      )}
      <div className="review-text-wrapper">
        {review.contains_spoiler && !showSpoiler ? (
          <div className="spoiler-overlay">
            <button className="reveal-spoiler-btn" onClick={revealSpoiler}>
              Reveal Spoiler
            </button>
          </div>
        ) : (
          <div className={`review-text ${reviewTextExceedsLimit && !isExpanded ? 'collapsed' : ''}`}>
            {review.review_text}
          </div>
        )}
      </div>
      {reviewTextExceedsLimit && showSpoiler && (
        <button className="toggle-btn" onClick={toggleExpand}>
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      )}
      {(currentUser.user_id === review.user_id || currentUser.isAdmin) && (
        <button className="delete-btn" onClick={() => handleDelete(review.user_id, review.novel_id)}>
          Delete Review
        </button>
      )}
    </div>
  );
};

export default IndividualReview;
