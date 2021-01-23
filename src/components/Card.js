import React from 'react';
import PropTypes from 'prop-types';

import './styles/Card.css';

/**
 * Card component - basic game piece
 */
function Card({ emoji, dataEmoji, activeCards }) {
  // determine if this component is active
  const isActive = activeCards.includes(dataEmoji);

  return (
    <div
      className={`${isActive} card-container d-flex justify-content-center align-items-center p-1 col-3 col-md-2`}
    >
      <div
        data-emoji={dataEmoji}
        className='card w-100 h-100 d-flex justify-content-center align-items-center'
      >
        {isActive && emoji}
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
