import React from 'react';
import PropTypes from 'prop-types';

import Card from './Card';

function Board({ emojis }) {
  return (
    <div>
      {emojis.map((emoji, i) => (
        <Card key={`${i}-${emoji}`} emoji={emoji} />
      ))}
    </div>
  );
}

Board.propTypes = {
  emojis: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

export default Board;
