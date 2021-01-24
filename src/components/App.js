import React, { useState, useRef, useEffect } from 'react';
import Board from './Board';
import Scoreboard from './Scoreboard';

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

  // on mount, shuffle emojis
  useEffect(() => {
    setShuffledEmojis(
      shuffleEmojis(
        [
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
        }, [])
      )
    );

    setTimeout(() => setIsAnimating(false), 2500);
  }, []);

  useEffect(() => {
    if (!isAnimating) {
      console.log('useEffect is not animating');
    }
  }, [isAnimating]);

  // shuffle button click handler
  const handleShuffleClick = e => {
    setShuffledEmojis([]);
    setAttempts(0);
    setMatches(0);
    setActiveCards([]);
    setTimeout(() => setShuffledEmojis(shuffleEmojis(shuffledEmojis)), 0);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 2500);
    setUserClickedSolve(false);
    e.target.blur();
  };

  const handleMemojiClick = () => {
    // if animating or already solving, do nothing
    if (isAnimating || userClickedSolve) return;

    // toggle user clicked solve
    // (prevents cards from being clicked)
    setUserClickedSolve(true);

    // solve
    solve([...boardRef.current.children]);
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

// shuffles emoji cards
const shuffleEmojis = emojis => {
  for (let i = emojis.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    // swap nested arrays
    [emojis[i], emojis[j]] = [emojis[j], emojis[i]];
  }
  return emojis;
};

// solve memory game
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
