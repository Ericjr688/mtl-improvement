import React from 'react';
import { Link } from 'react-router-dom';

const NovelLink = ({ novelId, children }) => {
  return (
    <Link to={`/series/${novelId}`} className="link">
      {children}
    </Link>
  );
};

export default NovelLink;
