import React from 'react'
import { Link } from 'react-router-dom'
import { hyphenateAndLowercase } from '../../helpers'

function LatestImprovements() {
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


  return (
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
                  <td className="name"><Link className= "link" to={`/series/${hyphenateAndLowercase(latestImprovement.title)}`}>{latestImprovement.title}</Link></td>
                  <td className="chapter">Chapter {latestImprovement.chapter}</td> {/* create page for chapter and insert into router. how will the url of chapters be displayed*/}
                  <td className="user">{latestImprovement.contributor}</td>
                  <td className="date">{latestImprovement.date}</td>
                </tr>
              ))}
            </tbody>
          </table>   
        </div>
      </div>
  )
}

export default LatestImprovements