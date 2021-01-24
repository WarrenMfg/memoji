import React, { useState, useRef, useEffect } from 'react';
import Board from './Board';
import Scoreboard from './Scoreboard';
import Queue from '../utils/Queue';

import './styles/App.css';

/**
 * App component - stateful container
 */
function App() {
  // track board (container)
  const boardRef = useRef(null);
  // track shuffled emojis
  const [shuffledEmojis, setShuffledEmojis] = useState([]);
  // track active cards
  const [activeCards, setActiveCards] = useState([]);
  // track attempts
  const [attempts, setAttempts] = useState(0);
  // track number of matched cards
  const [matches, setMatches] = useState(0);
  // track if is animating during shuffle
  const [isAnimating, setIsAnimating] = useState(true);
  // track if user clicked solve
  const [userClickedSolve, setUserClickedSolve] = useState(false);
  // track timers
  const [Q] = useState(new Queue());

  // on mount, shuffle emojis
  useEffect(() => {
    setShuffledEmojis(shuffleEmojis(emojis));

    Q.enqueue(setTimeout(() => setIsAnimating(false), 2500));

    return () => {
      Q.dequeueAll().forEach(id => clearTimeout(id));
    };
  }, []);

  // when shuffledEmojis are emptied, then shuffle
  useEffect(() => {
    if (!shuffledEmojis.length) {
      setShuffledEmojis(shuffleEmojis(emojis));
    }
  }, [shuffledEmojis]);

  // when isAnimating === true
  useEffect(() => {
    if (isAnimating) {
      Q.enqueue(setTimeout(() => setIsAnimating(false), 2500));
    }
  }, [isAnimating]);

  // solve when userClickedSolve === true
  useEffect(() => {
    if (userClickedSolve) {
      solve([...boardRef.current.children], Q);
    }
  }, [userClickedSolve]);

  // shuffle button click handler
  const handleShuffleClick = e => {
    Q.dequeueAll().forEach(id => clearTimeout(id));
    setShuffledEmojis([]);
    setAttempts(0);
    setMatches(0);
    setActiveCards([]);
    setIsAnimating(true);
    setUserClickedSolve(false);
    e.target.blur();
  };

  const handleMemojiClick = () => {
    // if animating or already solving, do nothing
    if (isAnimating || userClickedSolve) return;

    // clear currently clicked cards
    setActiveCards([]);

    // toggle user clicked solve
    // (prevents cards from being clicked)
    setUserClickedSolve(true);
  };

  return (
    <main className='container d-flex flex-column align-items-center'>
      <h1
        className='focus-in-expand text-center m-0'
        onClick={handleMemojiClick}
      >
        <span className={!isAnimating ? 'underline' : ''}>Mem</span>oji
      </h1>
      <div className='boards-container'>
        <Board
          boardRef={boardRef}
          shuffledEmojis={shuffledEmojis}
          activeCards={activeCards}
          setActiveCards={setActiveCards}
          attempts={attempts}
          setAttempts={setAttempts}
          matches={matches}
          setMatches={setMatches}
          userClickedSolve={userClickedSolve}
        />
        <Scoreboard
          attempts={attempts}
          matches={matches}
          shuffle={handleShuffleClick}
        />
      </div>
    </main>
  );
}

export default App;

/**
 * Nested arrays of emojis and React keys
 */
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
].reduce((acc, emoji) => {
  // double each emoji and include React key
  acc.push([emoji, `${emoji}-1`], [emoji, `${emoji}-2`]);
  return acc;
}, []);

/**
 * Shuffles emoji cards
 *
 * @param emojis Nested arrays of emojis and React keys
 */
const shuffleEmojis = emojis => {
  for (let i = emojis.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    // swap nested arrays
    [emojis[i], emojis[j]] = [emojis[j], emojis[i]];
  }
  return emojis;
};

/**
 * Solves memory game
 *
 * @param containers DOM elements containing cards
 * @param Q A queue to enqueue timer ids
 */
async function solve(containers, Q) {
  let first;
  // iterate over containers - 1 to avoid masking div
  for (let i = 0; i < containers.length - 1; i++) {
    // if card, then assign; otherwise, card has already been removed
    if (containers[i].firstElementChild.classList.contains('card')) {
      first = containers[i].firstElementChild;
    } else continue;

    // flip card
    first.click();

    let second;
    // find matching card
    for (let j = 0; j < containers.length; j++) {
      // skip first card
      if (j === i) continue;
      // if card, then assign; otherwise, continue iterating
      if (containers[j].firstElementChild.classList.contains('card')) {
        second = containers[j].firstElementChild;
      } else continue;

      // if match found
      if (
        first.dataset.emoji.slice(0, -2) === second.dataset.emoji.slice(0, -2)
      ) {
        // pause for effect
        await new Promise(resolve => {
          Q.enqueue(setTimeout(() => resolve(), 1000));
        });
        // flip card
        second.click();
        // pause for effect
        await new Promise(resolve => {
          Q.enqueue(setTimeout(() => resolve(), 2000));
        });
        // break to find next matching pair
        break;
      }
    }
  }
}
