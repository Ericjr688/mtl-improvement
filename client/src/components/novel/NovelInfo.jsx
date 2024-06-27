import React from 'react'

function NovelInfo({novel}) {
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
            <div className="author">Author {novel.author}</div>
            <div className="score">Score: {novel.score}</div>
            {/* <div className="top-contributor">Top Contributor: {novel.topContributor}</div> */}
            {/* <div className="chapter-count">Chapters: {novel.chapters}</div> */}
          </div>
          <div className="genres">
            {novel.genres.map(genre => (
              <span className="genre" key={genre.genre_id}>{genre.genre_name}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="tags section">
        <h3 className="section-header">Tags</h3>
        {novel.tags.map(tag => (
          <span className="tag" key={tag.tag_id}>{tag.tag_name}</span>
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