import IndividualReview from './IndividualReview';
import './reviews-list.scss'

const ReviewsList = ({ reviews, reviewType, handleDelete }) => {
  return (
    <div className="review-list">
      {reviews.map((review) => (
        <IndividualReview
          key={review.review_id}
          review={review}
          reviewType={reviewType}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default ReviewsList