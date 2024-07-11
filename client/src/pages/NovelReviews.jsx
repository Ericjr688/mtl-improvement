import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../components/common/Loading'
import ReviewsList from '../components/common/ReviewsList'

function NovelReviews() {
  const [reviews, setReviews] = useState([])
  const { novelId } = useParams()
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const getReviews = async() => {
      try {
        const reviewsRes = await axios.get(`/series/${novelId}/reviews`)
        setReviews(reviewsRes.data)
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
  }, [novelId])

  if (loading) {
    return <Loading/>
  }

  if (!loading && reviews.length === 0) {
    return <div>This novel does not have any reviews yet</div>;
  }

  return (
    <div className='reviews-page page-wrapper'>
      <ReviewsList reviews={reviews} reviewType={'novel'}/>
    </div>
  )
}

export default NovelReviews