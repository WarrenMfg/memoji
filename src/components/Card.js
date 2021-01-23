import React from 'react';
import PropTypes from 'prop-types';

import './styles/Card.css';

/**
 * Card component - basic game piece
 */
function Card({ emoji }) {
  return (
    <div className='card w-100 h-100 d-flex justify-content-center align-items-center'>
      {emoji}
    </div>
  );
}

Card.propTypes = {
  emoji: PropTypes.string.isRequired
};

export default Card;
