import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loading from '../components/common/Loading'

function Chapter() {
  const [chapter, setChapter] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const getChapterData = async () => {
      try {
        const chapterRes = await axios.get(`/chapters/${id}`)

        setChapter(chapterRes.data)
      } catch (err) {
        console.error("Error fetching chapter data:", err);
      } finally {
        setLoading(false)
      }
    }

    if(id) {
      getChapterData()
    } else {
      setLoading(false)
    }
  }, [])

  if (loading) {
    <Loading/>
  }

  return (
    <div>{chapter.content}</div>
  )
}

export default Chapter