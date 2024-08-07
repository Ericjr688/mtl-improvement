import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../components/common/Loading'
import ReviewsList from '../components/common/ReviewsList'
import WriteReview from '../components/review/WriteReview'
import "./novel-reviews.scss"
import { AuthContext } from '../context/authContext'

function NovelReviews() {
  const [reviews, setReviews] = useState([])
  const { novelId } = useParams()
  const [loading, setLoading] = useState(true)
  const [ showWriteReview, setShowWriteReview ] = useState(false)
  const [userHasReviewed, setUserHasReviewed] = useState(false);
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const userCheck = () => {
    if (!currentUser) {
      navigate("/login")
      return false
    }
    return true
  }

  const handleAddReviewClick = () => {
    if (!userCheck()) return;
    setShowWriteReview(true)
  }

  useEffect(() => {
    const getReviews = async() => {
      
      if (currentUser)
        try {
          const reviewsRes = await axios.get(`/series/${novelId}/reviews`, {
            params: { userId: currentUser ? currentUser.user_id : null }
        })
        setReviews(reviewsRes.data.reviews);
        setUserHasReviewed(reviewsRes.data.userHasReviewed);
        } catch (err) {
          console.error("Error fetching novel data:", err);
        } finally {
          setLoading(false)
        }
      }

    if (novelId) {
      getReviews()
    } else {
      setLoading(false)
    }
  }, [novelId, showWriteReview, currentUser])

  const handleAddReview = async (newReview) => {
    try {
      const response = await axios.post('/reviews', newReview);
      setReviews((prevReviews) => [response.data, ...prevReviews]);
      setShowWriteReview(false);
      setUserHasReviewed(true); 
    } catch (err) {
      console.error('Error adding review:', err);
    }
  };

  const handleDelete = async(userId, novelId) => {
    if (!currentUser || (currentUser.user_id !== userId && !currentUser.isAdmin)) {
      alert("You are not authorized to delete this review.");
      return;
    }

    try {
      await axios.delete(`/reviews/${novelId}/${userId}`)
      setReviews((prevReviews) => prevReviews.filter(review => review.user_id !== userId || review.novel_id !== novelId));
      setUserHasReviewed(false);
    } catch (err) {
      console.error('Error adding review:', err);
    }
  }

  if (loading) {
    return <Loading/>
  }


  return (
    <div className='reviews-page page-wrapper'>
      {showWriteReview ? <WriteReview setShowWriteReview={setShowWriteReview} novelId={novelId} onSubmit={handleAddReview}/> : ""}

      {userHasReviewed ? (
        <div className='btn reviewed-msg'>
          Already done
        </div>
      ) : (
        <div className='btn add-review-btn' onClick={handleAddReviewClick}>
          Write a Review
        </div>
      )}
      {(!loading && reviews.length === 0) ? <div>Be the first to write a review</div> : <ReviewsList reviews={reviews} reviewType={'novel'} handleDelete={handleDelete}/>}
    </div>
  )
}

export default NovelReviews