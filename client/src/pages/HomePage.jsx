import { Link } from "react-router-dom"
import "./homepage.scss"
import { hyphenateAndLowercase } from '../helpers';

function HomePage () {
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

  const latestImprovements = [
    {
      id: 1,
      title: "The Legendary Mechanic",
      chapter: 819,
      contributor: "dao ancestor",
      date: "2024/06/11", 
    },
    {
      id: 2,
      title: "Noble Emblem",
      chapter: 598,
      contributor: "dao ancestor",
      date: "2024/06/10", 
    },
    {
      id: 3,
      title: "Sylver Seeker",
      chapter: 267,
      contributor: "minced watermelon",
      date: "2024/06/10", 
    }
  ]

  // include function to hyphenate and lowercase novel name so that we use that to go to novel page rather than id (placeholder). remember to change in router as well
  // removed author and desc and latest chapter and tags and status in popular novels
  return ( 
    <div className="home page-wrapper">
      <div className="banner"> Banner</div>
      <div className="popular section">
        <h2 className="section-header">
          Popular Novels
        </h2>
        <div className="novel-card-large-container">
          {popularNovels.map(popularNovel => (
            <div className="novel-card-large" key={popularNovel.id}>
              <Link className= "link" to={`/series/${hyphenateAndLowercase(popularNovel.title)}`}>
                <div className="novel-cover">
                  <img className= "novel-card-img" src={popularNovel.img} alt={popularNovel.title} />
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

      <div className="latest-improvements section">
        <h2 className="section-header">
          Latest Improvements
        </h2>
        <div className="update-table">
          <table cellPadding={0} cellSpacing={0}>
            <thead>
              <tr>
                <th className="name">Novel Name</th>
                <th className="chapter">Chapter</th>
                <th className="user">Contributor</th>
                <th className="date">Date</th>
              </tr>
            </thead>
            <tbody>
              {latestImprovements.map(latestImprovement => (
                <tr key={latestImprovement.id}>
                  <Link className= "link" to={`/series/${hyphenateAndLowercase(latestImprovement.title)}`}><td className="name">{latestImprovement.title}</td></Link>
                  <td className="chapter">Chapter {latestImprovement.chapter}</td> {/* create page for chapter and insert into router. how will the url of chapters be displayed*/}
                  <td className="user">{latestImprovement.contributor}</td>
                  <td className="date">{latestImprovement.date}</td>
                </tr>
              ))}
            </tbody>
          </table>


          
        </div>
      </div>
      {/* <div className="recommendations section">
        <h2 className="section-header">
          Recommendations (same style as the popular novels section)
        </h2>
      </div> */}
      <div className="top-contributors section">
        <h2 className="section-header">
          Top Contributors (ranking type section?)
        </h2>
      </div>
    </div>
   );
}

export default HomePage;