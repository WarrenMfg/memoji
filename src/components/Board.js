import React, { useRef, useEffect, useState } from 'react';
import canvasConfetti from 'canvas-confetti';
import PropTypes from 'prop-types';
import Queue from '../utils/Queue';

import Card from './Card';

import './styles/Board.css';

/**
 * Board - stateful functional component
 */
function Board({
  boardRef,
  shuffledEmojis,
  activeCards,
  setActiveCards,
  attempts,
  setAttempts,
  matches,
  setMatches,
  userClickedSolve
}) {
  // track canvas
  const canvasRef = useRef(null);
  // track timers
  const [Q] = useState(new Queue());

  /**
   * Clear timers on unmount
   */
  useEffect(() => {
    return () => {
      Q.dequeueAll().forEach(id => clearTimeout(id));
    };
  }, []);

  /**
   * Swirl cards on updated shuffledEmojis
   */
  useEffect(() => {
    // get card containers
    const cards = [...boardRef.current.children];
    // show cards
    cards.forEach((card, i) => {
      Q.enqueue(setTimeout(() => card.classList.add('swirl'), i * 100));
    });
  }, [shuffledEmojis]);

  /**
   * Track activeCards to tally attempts and matches
   */
  useEffect(() => {
    // when empty or only one card, do nothing
    if (activeCards.length < 2) return;

    // if cards match
    if (activeCards[0].slice(0, -2) === activeCards[1].slice(0, -2)) {
      // increment matches
      setMatches(matches + 1);
    }
    // increment attempts regardless of matching cards
    setAttempts(attempts + 1);
    // set timer to clear activeCards array
    Q.enqueue(setTimeout(() => setActiveCards([]), 1500));
  }, [activeCards]);

  /**
   * If user clicked solve, clear all timers
   */
  useEffect(() => {
    if (userClickedSolve) {
      Q.dequeueAll().forEach(id => clearTimeout(id));
    }
  }, [userClickedSolve]);

  /**
   * If winner, show confetti
   */
  useEffect(() => {
    if (matches === 12) {
      canvasRef.current.width = boardRef.current.clientWidth;
      canvasRef.current.height = boardRef.current.clientHeight;
      // add confetti global options
      const confetti = canvasConfetti.create(canvasRef.current);
      // make confetti with instance options
      Q.enqueue(
        setTimeout(() => {
          confetti({
            particleCount: 100,
            origin: { x: 0.5, y: 1 }
          });
        }, 1500)
      );
    }
  }, [matches]);

  /**
   * Delegated event listener for touchstart
   *
   * @param e Synthetic event object
   */
  const handleTouchStart = e => {
    handleCardClick(e);
  };

  /**
   * Delegated event listener for touchend
   *
   * @param e Synthetic event object
   */
  const handleTouchEnd = e => {
    e.preventDefault();
    e.target.blur();
  };

  /**
   * Delegated event listener for click
   *
   * @param e Synthetic event object
   */
  const handleCardClick = e => {
    // get closest card and ensure a card was actually clicked
    const target = e.target.closest('.card');
    // if not, return
    if (!target) return;
    // if already active, return
    if (activeCards.includes(target.dataset.emoji)) return;
    // finally, if can make active
    if (activeCards.length < 2) {
      // make active
      setActiveCards([...activeCards, target.dataset.emoji]);
    }
  };

  return (
    <div
      className='board d-flex flex-wrap justify-content-center align-items-center position-relative'
      onClick={handleCardClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      ref={boardRef}
    >
      {/* cards */}
      {shuffledEmojis.map(emojiArr => (
        <Card
          emoji={emojiArr[0]}
          key={emojiArr[1]}
          dataEmoji={emojiArr[1]}
          activeCards={activeCards}
        />
      ))}

      {/* masking div */}
      {userClickedSolve && (
        <div className='user-clicked-solve position-absolute'></div>
      )}

      {/* confetti */}
      {matches === 12 && (
        <canvas
          id='canvas-confetti'
          className='position-absolute'
          ref={canvasRef}
        ></canvas>
      )}
    </div>
  );
}

Board.propTypes = {
  boardRef: PropTypes.object.isRequired,
  shuffledEmojis: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  ).isRequired,
  activeCards: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  setActiveCards: PropTypes.func.isRequired,
  attempts: PropTypes.number.isRequired,
  setAttempts: PropTypes.func.isRequired,
  matches: PropTypes.number.isRequired,
  setMatches: PropTypes.func.isRequired,
  userClickedSolve: PropTypes.bool.isRequired
};

export default Board;
