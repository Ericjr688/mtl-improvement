import { Router } from "react-router-dom";

import React, { useEffect, useState } from 'react'
import RecentChapters from "./RecentChapters";
import ChaptersList from "./ChaptersList";
import axios from "axios";

function Chapters({novelId}) {
  const [toggleState, setToggleState] = useState(2);
  const [recentChapters, setRecentChapters] = useState({});
  const [loading, setLoading] = useState(true);
  const [allChapters, setAllChapters] = useState({})

  const toggleTab = (value) => {
    if (toggleState !== value) {
      setToggleState(value)
    }
  }

  useEffect(() => {
    const getChapters = async () => {
      try {
        const recentChaptersRes = await axios.get(`/series/${novelId}/chapters/recent`)
        const allChaptersRes = await axios.get(`/series/${novelId}/chapters`)

        setRecentChapters(recentChaptersRes.data)
        setAllChapters(allChaptersRes.data)
      } catch (err) {
        console.error("Error fetching chapters:", err);
      } finally {
        setLoading(false); 
      }
    }

    getChapters()
  }, [novelId])

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (!loading && !allChapters.length) {
  //   return <div>No chapters found</div>;
  // }

  return (
    <div className="chapters section">      
      <div className="tabs">
        <div className="tab-headers">
          <div className={`tab-header ${toggleState === 1 ? 'active' : ''}`} onClick={() => toggleTab(1)}>Recent Chapters</div>
          <div className={`tab-header ${toggleState === 2 ? 'active' : ''}`} onClick={() => toggleTab(2)}>All Chapters</div>
        </div>
        
        <div id="tab-1" className={`panel ${toggleState === 1 ? 'active' : ''}`}>
          <RecentChapters chapters={recentChapters}/>
        </div>
        <div id="tab-2" className={`panel ${toggleState === 2 ? 'active' : ''}`}>
          <ChaptersList chapters ={allChapters}/>
        </div>
      </div>
    </div>
  )
}

export default Chapters