import React from 'react'
import { Link } from "react-router-dom"
import "./novel.scss"
//import { hyphenateAndLowercase } from '../helpers';



function Novel() {
  const novel = {
    id: 1,
    title: "The Legendary Mechanic",
    author: "Chocolion", 
    img: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1557871302l/45807334.jpg",
    chapters: 1200,
    score: 4.9,
    topContributor: "dao ancestor",
    genres: ["Action", "Comedy", "Sci-fi"], 
    tags: ["Firearms", "Crafting", "Cosmic Wars", "Clever Protagonist"],
    desc: "What do you do when you wake up and find yourself inside the very game that you love?\n\nWhat do you do when you realize that you have not only become an NPC – you have even been thrown back in time to before the game even launched!\n\nWhat will happen when our protagonist’s two realities coincide?\n\nHan Xiao was a professional power leveler before his transmigration. Using his past life’s knowledge, Han Xiao sweeps through the universe as he prepares for the arrival of the players. This is definitely not your typical transmigration novel.",
    sources: [
      {
        name: "Novel Updates",
        url: "https://www.novelupdates.com/series/the-legendary-mechanic/"
      },
      {
        name: "MTLNovel",
        url:"https://www.lightnovelworld.co/novel/the-legendary-mechanic-novel-05122221"
      }
    ]
  }

  return (
    <div className="novel-page page-wrapper">
      <div className="novel-info section">
        <div className="novel-cover">
          <img className= "novel-card-img" src={novel.img} alt={novel.title} />
        </div>
        <div className="novel-content">
          <div className="novel-title">
            <h3>{novel.title}</h3>
          </div>
          <div className="details">
            <div className="author">Author {novel.author}</div>
            <div className="score">Score: {novel.score}</div>
            <div className="top-contributor">Top Contributor: {novel.topContributor}</div>
            <div className="chapter-count">Chapters: {novel.chapters}</div>
          </div>
          <div className="genres">
            {novel.genres.map((genre, index) => (
              <span className="genre" key={index}>{genre}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="tags section">
      <h3 className="section-header">Tags</h3>
        {novel.tags.map((tag, index) => (
          <span className="tag" key={index}>{tag}</span>
        ))}
      </div>
      <div className="description section">
        <h3 className="section-header">Summary</h3>
        <p className="desc">{novel.desc} </p>
      </div>
      <div className="novel-sources section">
        <h3 className="section-header">Sources</h3>
        {novel.sources.map(source => (
          <a className="link" href={source.url} target="_blank" rel="noopener noreferrer">
            <div className="source"> Read at {source.name}</div>
          </a>
        ))}
      </div> 
      <div className="chapters section">

      </div>
      <div className="recommendations section"></div>
      <div className="catchup section"></div>
      <div className="user-comments section"></div>
    </div>  
  ) 
}

export default Novel