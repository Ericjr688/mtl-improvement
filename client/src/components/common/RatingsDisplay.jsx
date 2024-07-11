import React from 'react';
import './ratings-display.scss';

const RatingsDisplay = ({ score }) => {
  // Function to calculate the number of full and half stars
  const calculateStars = (score) => {
    const fullStars = Math.floor(score); 
    const halfStar = score % 1 >= 0.5 ? true : false; 
    return { fullStars, halfStar };
  };

  // Render stars based on calculated full and half stars
  const renderStars = (fullStars, halfStar) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<span key={i} className="star full"></span>);
      } else if (halfStar) {
        stars.push(<span key={i} className="star half"></span>);
        halfStar = false; 
      } else {
        stars.push(<span key={i} className="star empty"></span>);
      }
    }
    return stars;
  };

  const { fullStars, halfStar } = calculateStars(score);

  return (
    <div className="ratings-container">
      <div className="star-wrap">
        {renderStars(fullStars, halfStar)}
      </div>
      <span className="score">{score}</span>
    </div>
  );
};

export default RatingsDisplay;
