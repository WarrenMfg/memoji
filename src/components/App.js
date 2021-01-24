import React, { useState, useEffect } from 'react';
import Board from './Board';
import Scoreboard from './Scoreboard';

import './styles/App.css';

/**
 * App component - stateful container
 */
function App() {
  // track shuffled emojis
  const [shuffledEmojis, setShuffledEmojis] = useState([]);
  // track active cards
  const [activeCards, setActiveCards] = useState([]);
  // track attempts
  const [attempts, setAttempts] = useState(0);
  // track number of matched cards
  const [matches, setMatches] = useState(0);

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
  }, []);

  // shuffle button click handler
  const handleShuffleClick = e => {
    setShuffledEmojis([]);
    setAttempts(0);
    setMatches(0);
    setActiveCards([]);
    setTimeout(() => setShuffledEmojis(shuffleEmojis(shuffledEmojis)), 0);
    e.target.blur();
  };

  return (
    <main className='container d-flex flex-column align-items-center'>
      <h1 className='focus-in-expand text-center m-0'>
        <span>Mem</span>oji
      </h1>
      <div className='boards-container'>
        <Board
          shuffledEmojis={shuffledEmojis}
          activeCards={activeCards}
          setActiveCards={setActiveCards}
          attempts={attempts}
          setAttempts={setAttempts}
          matches={matches}
          setMatches={setMatches}
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
