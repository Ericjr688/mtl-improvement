import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/authContext'
import axios from 'axios';
import Loading from '../../components/common/Loading'
import NovelCardLarge from '../../components/common/NovelCardLarge';


function Library() {
  const { currentUser } = useContext(AuthContext)

  const [libraryNovels, setLibraryNovels] = useState({})
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNovelData = async() => {

      try {
        const novelRes = await axios.get(`/library/${currentUser.user_id}`)
        setLibraryNovels(novelRes.data)   
      } catch (err) {
        console.error("Error fetching novel data:", err);
      } finally {
        setLoading(false); 
      }
    }

    if (currentUser) {
      getNovelData()
    } else {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return <Loading/>
  }

  return (
    <div className="novel-card-large-container">
      {libraryNovels && libraryNovels.map(libraryNovel => (
        <NovelCardLarge novel={libraryNovel} type="library" key={libraryNovel.id} />
      ))}
    </div>
  )
}

export default Library