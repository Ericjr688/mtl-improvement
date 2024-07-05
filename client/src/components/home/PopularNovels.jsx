import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NovelLink from '../common/NovelLink'
import NovelCardLarge from '../common/NovelCardLarge'

function PopularNovels() {

  const popularNovels = [
    {
      novel_id: 1,
      title: "The Legendary Mechanic", 
      cover_image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1557871302l/45807334.jpg",
      chapters: 1200, // should chapters be displayed? we may not have all the chapters, so it what kind of chapter info do we dislay. might as well not display then. i think i will display improved chapters because that will always be in my database
      score: 4.9,
    },
    {
      novel_id: 2,
      title: "Eye of Evolution",
      cover_image: "https://www.mtlnovel.net/2020/03/The-Eye-of-Evolution.jpg.webp",
      chapters: 800,
      score: 4.5,
    },
    {
      novel_id: 3,
      title: "Noble Emblem",
      cover_image: "https://cdn.novelupdates.com/images/2016/12/180-1.jpg",
      chapters: 1200,
      score: 4.8,
    },
    {
      novel_id: 4,
      title: "Transdimensional Marketing",
      cover_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH_lT1szOlA21FFYx2HFfedD1t_rB4Busokg&s",
      chapters: 400,
      score: 4.5,
    },
    {
      novel_id: 5,
      title: "Sylver Seeker",
      cover_image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1620489522i/57549500.jpg",
      chapters: 300,
      score: 4.2,
    },
    {
      novel_id: 6,
      title: "Absolute Great Teacher",
      cover_image: "https://cdn.novelupdates.com/images/2020/10/absolutegreatteacher3.jpg",
      chapters: 800,
      score: 4.5,
    }
  ]

  return (
    <div className="popular section">
      <h2 className="section-header"> Popular Novels </h2>
      <div className="novel-card-large-container">
        {popularNovels.map(popularNovel => (
          <NovelCardLarge novel={popularNovel} type="home" key={popularNovel.novel_id} />
        ))}

      </div>
    </div>
  )
}

export default PopularNovels