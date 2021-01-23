import React, { useState, useEffect } from 'react';
import Board from './Board';
import './styles/App.css';

/**
 * App component - stateful container
 */
function App() {
  const [shuffledEmojis, setShuffledEmojis] = useState([]);

  // TODO - add score/number of match attempts?

  useEffect(() => {
    setShuffledEmojis(
      shuffleCards(
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

  return (
    <main className='container h-100'>
      <h1 className='text-center p-3 m-0'>
        <span>Mem</span>oji
      </h1>
      <Board shuffledEmojis={shuffledEmojis} />
    </main>
  );
}

export default App;

// shuffles cards
const shuffleCards = emojis => {
  for (let i = emojis.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    // swap nested arrays
    [emojis[i], emojis[j]] = [emojis[j], emojis[i]];
  }
  return emojis;
};
