import React, { useEffect, useState } from 'react'
import { hyphenateAndLowercase, timeAgo } from '../../helpers'
import axios from 'axios';
import NovelLink from '../common/NovelLink';

function LatestImprovements() {
  const [latestImprovements, setLatestImprovements] = useState({})
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLatestImprovements = async () => {
      try {
        const res = await axios.get('/chapters/recent')
        setLatestImprovements(res.data)
      } catch (err) {
        console.error("Error fetching latest improvements:", err);
      } finally {
        setLoading(false); 
      }
    }

    getLatestImprovements()
  }, [])

  if (loading) {
    return <div>Loading...</div>; // Display a loading indicator while fetching data
  }

  // const latestImprovemen = [
  //   {
  //     id: 1,
  //     title: "The Legendary Mechanic",
  //     chapter: 819,
  //     contributor: "dao ancestor",
  //     date: "2024/06/11", 
  //   },
  //   {
  //     id: 2,
  //     title: "Noble Emblem",
  //     chapter: 598,
  //     contributor: "dao ancestor",
  //     date: "2024/06/10", 
  //   },
  //   {
  //     id: 3,
  //     title: "Sylver Seeker",
  //     chapter: 267,
  //     contributor: "minced watermelon",
  //     date: "2024/06/10", 
  //   }
  // ]


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
                <tr key={latestImprovement.chapter_id}>
                  <td className="name"><NovelLink novelId={latestImprovement.novel_id}>{latestImprovement.novel_title}</NovelLink></td>
                  <td className="chapter">Chapter {latestImprovement.chapter_number}</td>
                  <td className="user">{latestImprovement.username}</td>
                  <td className="date">{timeAgo(latestImprovement.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>   
        </div>
      </div>
  )
}

export default LatestImprovements