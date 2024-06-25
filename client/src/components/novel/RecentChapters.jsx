import React from 'react'
import { timeAgo } from '../../helpers'

function RecentChapters({chapters}) {
  if(!chapters.length) {
    return <div>No chapters found</div>
  }
  return (
    <ul className='recent-chapters'>
      {chapters.length !==0 && chapters.map(chapter => (
        <li key={chapter.chapter_id}>
          <div className='left'>
            <span>Chapter {chapter.chapter_number} - </span>
            <span>{chapter.title}</span>            
          </div>
          <div className='right'>
            <span>{chapter.username}</span>
            <span>{timeAgo(chapter.created_at)}</span>
          </div>
          
        </li> 
      ))}
    </ul>
  )
}

export default RecentChapters