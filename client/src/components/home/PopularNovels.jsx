import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NovelLink from '../common/NovelLink'

function PopularNovels() {

  const popularNovels = [
    {
      id: 1,
      title: "The Legendary Mechanic", 
      img: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1557871302l/45807334.jpg",
      chapters: 1200, // should chapters be displayed? we may not have all the chapters, so it what kind of chapter info do we dislay. might as well not display then. i think i will display improved chapters because that will always be in my database
      score: 4.9,
    },
    {
      id: 2,
      title: "Eye of Evolution",
      img: "https://www.mtlnovel.net/2020/03/The-Eye-of-Evolution.jpg.webp",
      chapters: 800,
      score: 4.5,
    },
    {
      id: 3,
      title: "Noble Emblem",
      img: "https://cdn.novelupdates.com/images/2016/12/180-1.jpg",
      chapters: 1200,
      score: 4.8,
    },
    {
      id: 4,
      title: "Transdimensional Marketing",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH_lT1szOlA21FFYx2HFfedD1t_rB4Busokg&s",
      chapters: 400,
      score: 4.5,
    },
    {
      id: 5,
      title: "Sylver Seeker",
      img: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1620489522i/57549500.jpg",
      chapters: 300,
      score: 4.2,
    },
    {
      id: 6,
      title: "Absolute Great Teacher",
      img: "https://cdn.novelupdates.com/images/2020/10/absolutegreatteacher3.jpg",
      chapters: 800,
      score: 4.5,
    }
  ]

  return (
    <div className="popular section">
      <h2 className="section-header"> Popular Novels </h2>
      <div className="novel-card-large-container">
        {popularNovels.map(popularNovel => (
          <div className="novel-card-large" key={popularNovel.id}>
            <NovelLink novelId={popularNovel.id}>
              <div className="novel-cover">
                <img className= "novel-card-img" src={popularNovel.img} alt={popularNovel.title} />
                <span className="badge">{popularNovel.score}</span>
              </div>
              <div className="novel-title">
                <h3>{popularNovel.title}</h3>
              </div>
            </NovelLink>   
            <div className="chapters-count">{popularNovel.chapters}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PopularNovels