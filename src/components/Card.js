import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './styles/Card.css';

/**
 * Card component - basic game piece
 */
function Card({ emoji, dataEmoji, activeCards }) {
  // track if this card is active
  const [isActive, setIsActive] = useState(false);
  // get ref to this card to toggle classes
  const cardRef = useRef(null);
  // determine if this card is active
  useEffect(() => {
    // if this card is in activeCards array
    if (activeCards.includes(dataEmoji)) {
      cardRef.current.classList.add('show');
      cardRef.current.classList.remove('hide');
      // set timer to show card halfway through card flip animation
      setTimeout(() => setIsActive(true), 200);
    } else if (isActive) {
      // update animation classes
      cardRef.current.classList.add('hide');
      cardRef.current.classList.remove('show');
      // set timer to hide card halfway through card flip animation
      setTimeout(() => setIsActive(false), 200);
    }
  }, [activeCards]);

  return (
    <div className='card-container d-flex justify-content-center align-items-center p-1 col-3 col-md-2'>
      <div
        data-emoji={dataEmoji}
        ref={cardRef}
        className='card w-100 h-100 d-flex justify-content-center align-items-center'
      >
        <span className='emoji'>{isActive && emoji}</span>
      </div>
    </div>
  );
}

Card.propTypes = {
  emoji: PropTypes.string.isRequired,
  dataEmoji: PropTypes.string.isRequired,
  activeCards: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

export default Card;
