import React from 'react'

function RecentChapters({chapters}) {
  if(!chapters.length) {
    return <div>No chapters found</div>
  }
  return (
    <div>
      {chapters.length !==0 && chapters.map(chapter => (
        <div key={chapter.chapter_id}> {chapter.chapter_id}</div> 
      ))}
    </div>
  )
}

export default RecentChapters