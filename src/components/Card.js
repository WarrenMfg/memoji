import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './styles/Card.css';

/**
 * Card component - basic game piece
 */
function Card({ emoji, dataEmoji, activeCards }) {
  // track if emoji is visible
  const [isEmojiVisible, setIsEmojiVisible] = useState(false);
  // get ref to this card to toggle classes
  const cardRef = useRef(null);

  // determine if this card is active
  useEffect(() => {
    // if no activeCards
    if (!activeCards.length && cardRef.current.classList.contains('show')) {
      // update animation classes to hide
      cardRef.current.classList.add('hide');
      cardRef.current.classList.remove('show');
      // set timer to hide emoji halfway through card flip animation
      setTimeout(() => setIsEmojiVisible(false), 200);
    }

    // determine if activeCards are equal
    const areEqual =
      activeCards[0]?.slice(0, -2) === activeCards[1]?.slice(0, -2);

    // if this card is in activeCards array
    if (activeCards.includes(dataEmoji)) {
      // update animation classes to show
      cardRef.current.classList.add('show');
      cardRef.current.classList.remove('hide');
      // set timer to show emoji halfway through card flip animation
      setTimeout(() => setIsEmojiVisible(true), 200);
    }

    // determine if this card is one of the cards making areEqual true
    const isThisCard = emoji === activeCards[0]?.slice(0, -2);

    // if cards are equal and this component is one of those cards
    if (areEqual && isThisCard) {
      // animate cards and remove from DOM
      setTimeout(() => cardRef.current.classList.add('remove'), 1100);
      setTimeout(() => cardRef.current.remove(), 1500);
    }
  }, [activeCards]);

  return (
    <div className='card-container d-flex justify-content-center align-items-center p-1 col-3 col-md-2'>
      <div
        data-emoji={dataEmoji}
        ref={cardRef}
        className='card w-100 h-100 d-flex justify-content-center align-items-center'
      >
        <span
          className='emoji'
          style={{ visibility: isEmojiVisible ? 'visible' : 'hidden' }}
        >
          {emoji}
        </span>
      </div>
    </div>
  );
}

Card.propTypes = {
  emoji: PropTypes.string.isRequired,
  dataEmoji: PropTypes.string.isRequired,
  activeCards: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

export default React.memo(Card, (prevProps, nextProps) => {
  // if clicked
  if (nextProps.activeCards.includes(nextProps.dataEmoji)) {
    // not equal; do not use memo
    return false;
  }

  // if activeCards reset
  if (prevProps.activeCards.length > nextProps.activeCards.length) {
    // not equal; do not use memo
    return false;
  }

  // are equal; use memo
  return true;
});
