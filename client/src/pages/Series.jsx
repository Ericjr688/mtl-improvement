import React from 'react'
import "./series.scss"
import { useState, useEffect } from 'react';
import NovelLink from '../components/common/NovelLink';
import axios from 'axios'


function Series() {
  const [novels, setNovels] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNovels = async ()=> {
      try {
        const res = await axios.get("/series");
        setNovels(res.data);
      } catch(err) {
        console.error("Error fetching novels:", err);
      } finally {
        setLoading(false); 
      }
    }
    getNovels()
  }, [])

  // const novels = [
  //   {
  //     id: 1,
  //     title: "The Legendary Mechanic", 
  //     img: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1557871302l/45807334.jpg",
  //     chapters: 1200,
  //     score: 4.9,
  //     topContributor: "dao ancestor",
  //     genres: ["Action", "Comedy"], //genre vs tags? start with genre then move to tags
  //     desc: "What do you do when you wake up and find yourself inside the very game that you love?\n\nWhat do you do when you realize that you have not only become an NPC – you have even been thrown back in time to before the game even launched!\n\nWhat will happen when our protagonist’s two realities coincide?\n\nHan Xiao was a professional power leveler before his transmigration. Using his past life’s knowledge, Han Xiao sweeps through the universe as he prepares for the arrival of the players. This is definitely not your typical transmigration novel."
  //   },
  //   {
  //     id: 2,
  //     title: "Eye of Evolution",
  //     img: "https://www.mtlnovel.net/2020/03/The-Eye-of-Evolution.jpg.webp",
  //     chapters: 800,
  //     score: 4.5,
  //     topContributor: "dao ancestor",
  //     genres: ["Fantasy", "Golden Finger"],
  //     desc: "Going out with a saber, equipment all depended on drops! The web novelist Bai Xiaowen was brought to the era of psionic energy a hundred years later by a magical eyeball. Spirit droplets infiltrated, mutated beasts wreaked havoc, and spirit realm monsters invaded. The digitized Earth was just like a huge game! I came, I saw, I conquered!"
  //   },
  //   {
  //     id: 3,
  //     title: "Noble Emblem",
  //     img: "https://cdn.novelupdates.com/images/2016/12/180-1.jpg",
  //     chapters: 1200,
  //     score: 4.8,
  //     topContributor: "dao ancestor",
  //     genres: ["Adventure", "Fantasy", "Game System"],
  //     desc: "A young Brave walked out of his village, gathered companions to his side, defeated the Great Demon King, became famous, then came back with beauties in hand! This was a legend that appears in the world of Seyrol every 200 years! Our protagonist, however, isn't a Brave. Even so, for over a thousand years his figure has loomed throughout its history. Unwittingly, the name of the Red-robed Priest began to resound throughout the world. Red-robed Priest's legend included extraordinary sword techniques and magic, erudite knowledge, and an almost prophetic ability to lead young Braves toward the proper path. People of the world think of him as a descendent of the ancient Yellow Race which led to his omnipotence. In essence, however, this was just the characteristics of the profession known as 'Noble'."
  //   },
  //   {
  //     id: 4,
  //     title: "Transdimensional Marketing",
  //     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH_lT1szOlA21FFYx2HFfedD1t_rB4Busokg&s",
  //     chapters: 400,
  //     score: 4.5,
  //     topContributor: "minced watermelon",
  //     genres: ["Comedy", "Sci-Fi"],
  //     desc: "I am merely a reviewer, albeit the products I review are slightly different. For example, I review quantum computers, artificial intelligence, anti-gravity mech armor, planetary engines, sublight colonial ships, stellar detonators, etc…\nChen Yu: “The technological product I bring to everyone for today’s episode is—a dual-vector foil! W-Wait! Everyone, please calm down! Let me explain…”"
  //   }
  // ]

  if (loading) {
    return <div>Loading...</div>; // Display a loading indicator while fetching data
  }

  return (
    <div className="series-page page-wrapper">
      <div className="filter section">Filter section</div>
      <div className="novel-card-verbose-container section">
        {novels.map(novel => (
          <div className="novel-card-verbose" key={novel.novel_id}>
            <div className="novel-cover">
              <NovelLink novelId={novel.novel_id}>
                <img className= "novel-card-img" src={novel.cover_image} alt={novel.title} />
              </NovelLink>                
            </div>
            <div className="novel-content">
              <div className="novel-title">
                <NovelLink novelId={novel.novel_id}>
                  <h3>{novel.title}</h3>
                </NovelLink>   
              </div>
              <div className="details">
                <div className="score">Score: {novel.score}</div>
                {/* <div className="top-contributor">Top Contributor: {novel.topContributor}</div> */}
                {/* <div className="chapter-count">Chapters: {novel.chapters}</div> */}
              </div>
              {/* <div className="genres">
                {novel.genres.map((genre, index) => (
                  <span className="genre" key={index}>{genre}</span> //Link to query (series page with filter set to tag)
                ))}
              </div> */}
              <p className="desc">{novel.description} </p> {/*more/ less/ ellipses implemented*/}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Series