import React from 'react';
import NovelLink from './NovelLink';
import './novel-card-large.scss'

const NovelCardLarge = ({ novel, type }) => {
  return (
    <div className="novel-card-large" key={novel.novel_id}>
      <NovelLink novelId={novel.novel_id}>
        <div className="novel-cover">
          <img className="novel-card-img" src={novel.cover_image} alt={novel.title} />
          <span className="badge">{novel.total_score > 0 ? (novel.total_score / novel.review_count).toFixed(1) : 5}</span>
        </div>
        <div className="novel-title">
          <h3>{novel.title}</h3>
        </div>
      </NovelLink>
      {/* <div className="chapters-count">{novel.chapters}</div> */}
      
      {/* {type === 'library' && (
        <div>
          <div className="created-at">Library Entry Date: {novel.library_created_at}</div>
          <div className="created-at">Novel Creation Date: {novel.novel_created_at}</div>
        </div>
      )} */}

      {/* {type === 'home' && (
        <div>
          <div className="created-at">Novel Creation Date: {novel.novel_created_at}</div>
        </div>
      )} */}

    </div>
  );
};

export default NovelCardLarge;
