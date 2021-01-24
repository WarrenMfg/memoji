import React, { useRef, useEffect } from 'react';
import canvasConfetti from 'canvas-confetti';
import PropTypes from 'prop-types';

import Card from './Card';

import './styles/Board.css';

/**
 * Board component - container
 */
function Board({
  shuffledEmojis,
  activeCards,
  setActiveCards,
  attempts,
  setAttempts,
  matches,
  setMatches
}) {
  // track board (container)
  const boardRef = useRef(null);
  // track canvas
  const canvasRef = useRef(null);

  // swirl cards on updated shuffledEmojis
  useEffect(() => {
    // get card containers
    const cards = [...boardRef.current.children];
    // show cards
    cards.forEach((card, i) => {
      setTimeout(() => card.classList.add('swirl'), i * 100);
    });
  }, [shuffledEmojis]);

  // track activeCards
  useEffect(() => {
    // when empty
    if (!activeCards.length) return;
    // if only one card
    if (activeCards.length < 2) {
      // increment attempts
      // setAttempts(attempts + 1);
      return;
    }

    // if cards match
    if (activeCards[0].slice(0, -2) === activeCards[1].slice(0, -2)) {
      // increment matches
      setMatches(matches + 1);
    }
    // increment attempts regardless of matching cards
    setAttempts(attempts + 1);
    // set timer to clear activeCards array
    setTimeout(() => setActiveCards([]), 1500);
  }, [activeCards]);

  useEffect(() => {
    if (matches === 12) {
      canvasRef.current.width = boardRef.current.clientWidth;
      canvasRef.current.height = boardRef.current.clientHeight;
      // add confetti global options
      const confetti = canvasConfetti.create(canvasRef.current, {
        resize: true
      });
      // make confetti with instance options
      setTimeout(() => {
        confetti({
          particleCount: 100,
          origin: { x: 0.5, y: 1 }
        });
      }, 1500);
    }
  }, [matches]);

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
      ref={boardRef}
    >
      {shuffledEmojis.map(emojiArr => (
        <Card
          emoji={emojiArr[0]}
          key={emojiArr[1]}
          dataEmoji={emojiArr[1]}
          activeCards={activeCards}
        />
      ))}
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
  shuffledEmojis: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  ).isRequired,
  activeCards: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  setActiveCards: PropTypes.func.isRequired,
  attempts: PropTypes.number.isRequired,
  setAttempts: PropTypes.func.isRequired,
  matches: PropTypes.number.isRequired,
  setMatches: PropTypes.func.isRequired
};

export default Board;

// TODO - implement this
async function solve(containers) {
  for (let i = 0; i < containers.length; i++) {
    let first;
    if (containers[i].firstElementChild.classList.contains('card')) {
      first = containers[i].firstElementChild;
    } else continue;

    first.click();

    for (let j = 0; j < containers.length; j++) {
      if (j === i) continue;
      let second;
      if (containers[j].firstElementChild.classList.contains('card')) {
        second = containers[j].firstElementChild;
      } else continue;

      if (
        first.dataset.emoji.slice(0, -2) === second.dataset.emoji.slice(0, -2)
      ) {
        await new Promise(resolve => {
          setTimeout(() => resolve(), 1000);
        });
        second.click();
        await new Promise(resolve => {
          setTimeout(() => resolve(), 2000);
        });
        break;
      }
    }
  }
}
