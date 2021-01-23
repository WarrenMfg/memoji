import React from 'react';
import PropTypes from 'prop-types';

import './styles/Scoreboard.css';

function Scoreboard({ attempts, matches, shuffle }) {
  return (
    <div className='scoreboard px-1'>
      <div className='attempts d-flex justify-content-center align-items-center'>
        ❌&nbsp;&nbsp;{attempts}
      </div>

      <div className='matches d-flex justify-content-center align-items-center'>
        ✅&nbsp;&nbsp;{matches}
      </div>

      <button type='button' className='btn btn-primary' onClick={shuffle}>
        Shuffle
      </button>
    </div>
  );
}

Scoreboard.propTypes = {
  attempts: PropTypes.number.isRequired,
  matches: PropTypes.number.isRequired,
  shuffle: PropTypes.func.isRequired
};

export default Scoreboard;
