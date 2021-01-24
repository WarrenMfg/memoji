import React from 'react';
import PropTypes from 'prop-types';

import './styles/Hovercard.css';

function Hovercard({ isAnimating, userClickedSolve }) {
  return (
    <span
      className={`hover-card-container position-absolute ${
        isAnimating || userClickedSolve ? 'invisible' : 'visible'
      }`}
    >
      <span className='notch position-absolute'></span>
      <span className='hover-card position-absolute'>Click to solve</span>
    </span>
  );
}

Hovercard.propTypes = {
  isAnimating: PropTypes.bool.isRequired,
  userClickedSolve: PropTypes.bool.isRequired
};

export default Hovercard;
