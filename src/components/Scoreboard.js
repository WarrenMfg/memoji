import React from 'react';
import PropTypes from 'prop-types';

function Scoreboard({ attempts, matches, shuffle }) {
  return (
    <div className='pt-3 pb-3 d-flex justify-content-between align-items-center '>
      <div className='attempts'>{attempts}</div>

      <div className='matches'>{matches}</div>

      <div className='btn' onClick={shuffle}>
        Shuffle
      </div>
    </div>
  );
}

Scoreboard.propTypes = {
  attempts: PropTypes.number.isRequired,
  matches: PropTypes.number.isRequired,
  shuffle: PropTypes.func.isRequired
};

export default Scoreboard;
