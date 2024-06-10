import { Link } from "react-router-dom"
import "./homepage.scss"

function HomePage () {
  const popularNovels = [
    {
      id: 1,
      title: "The Legendary Mechanic",
      img: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1557871302l/45807334.jpg",
      chapters: 1200,
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
      title: "The Legendary Mechanic",
      img: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1557871302l/45807334.jpg",
      chapters: 1200,
      score: 4.9,
    },
    {
      id: 4,
      title: "Eye of Evolution",
      img: "https://www.mtlnovel.net/2020/03/The-Eye-of-Evolution.jpg.webp",
      chapters: 800,
      score: 4.5,
    },
    {
      id: 5,
      title: "The Legendary Mechanic",
      img: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1557871302l/45807334.jpg",
      chapters: 1200,
      score: 4.9,
    },
    {
      id: 6,
      title: "Eye of Evolution",
      img: "https://www.mtlnovel.net/2020/03/The-Eye-of-Evolution.jpg.webp",
      chapters: 800,
      score: 4.5,
    }
  ]

  // include function to hyphenate and lowercase novel name so that we use that to go to novel page rather than id (placeholder). remember to change in router as well
  // removed author and desc and latest chapter and tags and status
  return ( 
    <div className="home">
      <div className="banner"> Banner</div>
      <div className="popular section">
        <h2 className="section-header">
          Popular Novels
        </h2>
        <div className="novel-card-large-container">
          {popularNovels.map(popularNovel => (
            <div className="novel-card-large" key={popularNovel.id}>
              <Link className= "link" to={`/series/${popularNovel.id}`}>
                <div className="novel-cover">
                  <img className= "novel-card-img" src={popularNovel.img} alt="post.title" />
                  <span className="badge">{popularNovel.score}</span>
                </div>
                <div className="novel-title">
                  <h3>{popularNovel.title}</h3>
                </div>
              </Link>
              <div className="chapters-count">{popularNovel.chapters}</div>
            </div>
          ))
          }
        </div>
      </div>
      <div className="latest-releases section">
        <h2 className="section-header">
          Latest Releases
        </h2>
      </div>
      <div className="recommendations section">
        <h2 className="section-header">
          Recommendations
        </h2>
      </div>
      <div className="top-contributors section">
        <h2 className="section-header">
          Top Contributors
        </h2>
      </div>
    </div>
   );
}

export default HomePage;