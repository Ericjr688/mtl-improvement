import React from 'react'
import ChapterLink from '../common/ChapterLink'
// import { formatDate } from '../../helpers'

function ChaptersList({chapters}) {
  // console.log(chapters.length)
  if(!chapters.length) {
    return <div>No chapters found</div>
  }
  return (
    <ul className='chapters-list'>
      {chapters.length !==0 && chapters.map(chapter => (
        <li key={chapter.chapter_id} >
          <ChapterLink chapterId={chapter.chapter_id}>
            {/* <span>  </span> */}
            <span className='ellipsis'> Chapter {chapter.chapter_number} - {chapter.title}</span>
          </ChapterLink>
          {/* <span>{formatDate(chapter.created_at)}</span> */}  
        </li>  
      ))}
    </ul>
  )
}

export default ChaptersList