import { timeAgo } from '../../helpers';
import RatingsDisplay from './RatingsDisplay'; 
import './reviews-list.scss'

const ReviewCard = ({ reviews, reviewType }) => {
  return (
    <div className="review-list">
      {reviews && reviews.map((review) => (
        <div key={review.review_id} className="review-card">
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
          <div className="review-text">{review.review_text}</div>
        </div>
      ))}
    </div>
  );
};

export default ReviewCard;
