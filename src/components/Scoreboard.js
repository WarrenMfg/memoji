import React, { useLayoutEffect, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './styles/Scoreboard.css';

function Scoreboard({ attempts, matches, shuffle }) {
  // track attempts span for animation
  const attemptsRef = useRef(null);
  // hold on to previous attempts value
  const prevAttempts = useRef(0);
  // track matches span for animation
  const matchesRef = useRef(null);
  // hold on to previous matches value
  const prevMatches = useRef(0);

  // check if diff; if so, remove class
  useLayoutEffect(() => {
    if (attempts !== prevAttempts.current) {
      prevAttempts.current = attempts;
      attemptsRef.current.classList.remove('jello');
    }
    if (matches !== prevMatches.current) {
      prevMatches.current = matches;
      matchesRef.current.classList.remove('jello');
    }
  });

  // check if class was removed; if so, add it
  useEffect(() => {
    if (!attemptsRef.current.classList.contains('jello')) {
      setTimeout(() => attemptsRef.current.classList.add('jello'), 500);
    }
    if (!matchesRef.current.classList.contains('jello')) {
      setTimeout(() => matchesRef.current.classList.add('jello'), 500);
    }
  });

  // remove animation class so it can be added in useEffect
  const handleShuffleClick = e => {
    attemptsRef.current.classList.remove('jello');
    matchesRef.current.classList.remove('jello');
    shuffle(e);
  };

  return (
    <div className='scoreboard px-1'>
      <div className='attempts d-flex justify-content-center align-items-center'>
        ❌&nbsp;&nbsp;<span ref={attemptsRef}>{attempts}</span>
      </div>

      <div className='matches d-flex justify-content-center align-items-center'>
        ✅&nbsp;&nbsp;<span ref={matchesRef}>{matches}</span>
      </div>

      <button
        type='button'
        className='btn btn-primary'
        onClick={e => handleShuffleClick(e)}
      >
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
