import React from 'react';
import PropTypes from 'prop-types';

function Card({ emoji }) {
  return <div>{emoji}</div>;
}

Card.propTypes = {
  emoji: PropTypes.string.isRequired
};

export default Card;
