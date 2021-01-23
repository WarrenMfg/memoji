import React, { useState, useEffect } from 'react';

import Card from './Card';

import './styles/Board.css';

/**
 * Board component - stateful container
 */
function Board() {
  // track active cards
  const [activeCards, setActiveCards] = useState([]);
  // track number of matched cards
  const [matches, setMatches] = useState(0);
  // track attempts
  const [attempts, setAttempts] = useState(0);

  console.log(activeCards, matches, attempts);

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
      // TODO - remove cards from DOM
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
    >
      {emojis.reduce((acc, emoji) => {
        const one = (
          <Card
            emoji={emoji}
            key={`${emoji}-1`}
            dataEmoji={`${emoji}-1`}
            activeCards={activeCards}
          />
        );
        const two = (
          <Card
            emoji={emoji}
            key={`${emoji}-2`}
            dataEmoji={`${emoji}-2`}
            activeCards={activeCards}
          />
        );
        acc.push(one, two);
        return acc;
      }, [])}
    </div>
  );
}

// a list of emojis to use
const emojis = [
  '😀',
  '😂',
  '😘',
  '😜',
  '🧐',
  '🤓',
  '😎',
  '🥳',
  '🥴',
  '🤑',
  '😳',
  '🙄'
];

export default Board;
