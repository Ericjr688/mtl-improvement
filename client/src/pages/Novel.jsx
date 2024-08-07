import React, { useContext, useEffect, useState } from 'react'

import "./novel.scss"
import axios from 'axios'
import { useParams } from 'react-router-dom';
import NovelInfo from '../components/novel/NovelInfo';
import Chapters from '../components/novel/Chapters';
import { AuthContext } from '../context/authContext';
import Loading from '../components/common/Loading';



function Novel() {
  const [novel, setNovel] = useState({});
  //const [chapters, setChapters] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser ? currentUser.user_id : null;


  // should work even when no user is logged in
  useEffect(() => {
    const getNovelData = async() => {
      try {
        const novelRes = await axios.get(`/series/${id}`,{
          params: { userId }
        })
        //const chaptersRes = await axios.get(`/series/${id}/chapters`)

        setNovel(novelRes.data)
        
        
        //setChapters(chaptersRes.data)
      } catch (err) {
        console.error("Error fetching novel data:", err);
      } finally {
        setLoading(false); 
      }
    }

    if (id) {
      getNovelData();
    } else {
      setLoading(false); 
    }
  }, [id])

  // console.log(novel)

  // const novel = {
  //   id: 1,
  //   title: "The Legendary Mechanic",
  //   author: "Chocolion", 
  //   img: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1557871302l/45807334.jpg",
  //   chapters: 1200,
  //   score: 4.9,
  //   topContributor: "dao ancestor",
  //   genres: ["Action", "Comedy", "Sci-fi"], 
  //   tags: ["Firearms", "Crafting", "Cosmic Wars", "Clever Protagonist"],
  //   desc: "What do you do when you wake up and find yourself inside the very game that you love?\n\nWhat do you do when you realize that you have not only become an NPC – you have even been thrown back in time to before the game even launched!\n\nWhat will happen when our protagonist’s two realities coincide?\n\nHan Xiao was a professional power leveler before his transmigration. Using his past life’s knowledge, Han Xiao sweeps through the universe as he prepares for the arrival of the players. This is definitely not your typical transmigration novel.",
  //   sources: [
  //     {
  //       name: "Novel Updates",
  //       url: "https://www.novelupdates.com/series/the-legendary-mechanic/"
  //     },
  //     {
  //       name: "MTLNovel",
  //       url:"https://www.lightnovelworld.co/novel/the-legendary-mechanic-novel-05122221"
  //     }
  //   ]
  // } 

  if (loading) {
    return <Loading/>
  }

  if (!loading && !novel.title) {
    return <div>Error: Novel not found</div>;
  }

  return (
    <div className="novel-page page-wrapper">
      <NovelInfo novel={novel} />
      <Chapters novelId={novel.novel_id} />
      <div className="recommendations section"></div>
      <div className="catchup section"></div>
      <div className="user-comments section"></div>
    </div>  
  ) 
}

export default Novel