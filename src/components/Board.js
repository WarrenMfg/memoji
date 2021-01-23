import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Card from './Card';

import './styles/Board.css';

/**
 * Board component - stateful container
 */
function Board({ shuffledEmojis }) {
  const boardRef = useRef(null);
  // track active cards
  const [activeCards, setActiveCards] = useState([]);
  // track number of matched cards
  const [matches, setMatches] = useState(0);
  // track attempts
  const [attempts, setAttempts] = useState(0);

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
      setAttempts(attempts + 1);
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

  // render emojis twice so they have a match
  return (
    <div
      className='board h-100 d-flex flex-wrap justify-content-center align-items-center'
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
    </div>
  );
}

Board.propTypes = {
  shuffledEmojis: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  ).isRequired
};

export default Board;
