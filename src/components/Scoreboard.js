import React, { useLayoutEffect, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './styles/Scoreboard.css';

/**
 * Scoreboard - stateful functional component
 */
function Scoreboard({ attempts, matches, shuffle }) {
  // track attempts span for animation
  const attemptsRef = useRef(null);
  // hold on to previous attempts value
  const prevAttempts = useRef(0);
  // track matches span for animation
  const matchesRef = useRef(null);
  // hold on to previous matches value
  const prevMatches = useRef(0);

  /**
   * Check if diff between attempts and matches; if so, remove class
   */
  useLayoutEffect(() => {
    if (attempts !== prevAttempts.current) {
      // update prevAttempts
      prevAttempts.current = attempts;
      // remove class
      attemptsRef.current.classList.remove('jello');
    }
    if (matches !== prevMatches.current) {
      // update prevMatches
      prevMatches.current = matches;
      // remove class
      matchesRef.current.classList.remove('jello');
    }
  });

  /**
   * Check if animation class was removed in useLayoutEffect
   * If so, add it
   */
  useEffect(() => {
    if (!attemptsRef.current.classList.contains('jello')) {
      setTimeout(() => attemptsRef.current.classList.add('jello'), 500);
    }
    if (!matchesRef.current.classList.contains('jello')) {
      setTimeout(() => matchesRef.current.classList.add('jello'), 500);
    }
  });

  /**
   * Shuffle button click handler
   *
   * @param e Synthetic event object
   */
  const handleShuffleClick = e => {
    // remove animation class so it can be added in useEffect
    attemptsRef.current.classList.remove('jello');
    matchesRef.current.classList.remove('jello');
    // invoke handleShuffleClick
    shuffle(e);
  };

  return (
    <div className='scoreboard px-1'>
      <div className='tally-container d-flex justify-content-center align-items-center'>
        <div className='attempts d-flex justify-content-center align-items-center'>
          ❌&nbsp;&nbsp;<span ref={attemptsRef}>{attempts}</span>
        </div>

        <div className='matches d-flex justify-content-center align-items-center'>
          ✅&nbsp;&nbsp;<span ref={matchesRef}>{matches}</span>
        </div>
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
