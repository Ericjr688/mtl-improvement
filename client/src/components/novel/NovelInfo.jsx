import axios from 'axios'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/authContext'
import RatingsDisplay from '../common/RatingsDisplay';
import { Link, useNavigate } from 'react-router-dom';

function NovelInfo({novel}) {
  const { currentUser } = useContext(AuthContext)
  const [inLibrary, setInLibrary] = useState(novel.in_library);
  const [response, setResponse] = useState(null)
  const navigate = useNavigate();

  const userCheck = () => {
    if (!currentUser) {
      navigate("/login")
      return false
    }
    return true
  }

  const handleAddToLibrary = async() => {
    if (!userCheck()) return;
    try {
      await axios.post('/library', {
        userId: currentUser.user_id,
        novelId: novel.novel_id
      })
      setInLibrary(true);
      setResponse("Success!")
    } catch (err) {
      setResponse(err.response.data)
    }
  }
  
  const handleRemoveFromLibrary = async() => {
    if (!userCheck()) return;
    try {
      await axios.delete(`/library/${currentUser.user_id}/${novel.novel_id}`)
      setInLibrary(false);
      setResponse("Removed!")
    } catch (err) {
      setResponse(err.response.data)
    }
  }

  // console.log(novel)
  return (
    <>
      <div className="novel-info section">
        <div className="novel-cover">
          <img className= "novel-card-img" src={novel.cover_image} alt={novel.title} />
        </div>
        <div className="novel-content">
          <div className="novel-title">
            <h3>{novel.title}</h3>
          </div>
          <div className="details">
            <div className="author">Author: {novel.author}</div>
            <RatingsDisplay score={novel.total_score > 0 ? (novel.total_score / novel.review_count).toFixed(1) : 5}></RatingsDisplay>
            {/* <div className="top-contributor">Top Contributor: {novel.topContributor}</div> */}
            {/* <div className="chapter-count">Chapters: {novel.chapters}</div> */}
          </div>
          <div className="genres">
            {novel.genres.map(genre => (
              <span className="genre" key={genre.genre_id}>{genre.genre_name} </span>
            ))}
          </div>
          {inLibrary ? (
            <div className="btn library-btn" onClick={handleRemoveFromLibrary}>In Library</div>
          ) : (
            <div className="btn library-btn" onClick={handleAddToLibrary}>Add To Library</div>
          )}
          {/* {response && <div>{response}</div>} */}
        </div>
      </div>
      <Link to={`/series/${novel.novel_id}/reviews`} className="link large-btn">
        <div className="body">
          <h4>User Reviews</h4>
          <p>Reviews from {novel.review_count > 0 ? novel.review_count : 1} users</p>
        </div>
      </Link>
      <div className="tags section">
        <h3 className="section-header">Tags</h3>
        {novel.tags.map(tag => (
          <span className="tag" key={tag.tag_id}>{tag.tag_name}, </span>
        ))}
      </div>
      <div className="description section">
        <h3 className="section-header">Summary</h3>
        <p className="desc">{novel.description} </p>
      </div>
      <div className="novel-sources section">
        <h3 className="section-header">Sources</h3>
        {novel.sources.map((source, index) => (
          source.url && (
            <a key={index} className="link" href={source.url} target="_blank" rel="noopener noreferrer">
              <div className="source"> Read at {source.name}</div>
            </a>
          )
        ))}
      </div> 
    </>
  )
}

export default NovelInfo