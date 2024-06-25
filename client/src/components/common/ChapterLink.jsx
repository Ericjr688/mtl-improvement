import React from 'react'
import { Link } from 'react-router-dom';

function ChapterLink({chapterId, children}) {
  return (
    <Link to={`/chapters/${chapterId}`} className="link">
      {children}
    </Link>
  );
}

export default ChapterLink