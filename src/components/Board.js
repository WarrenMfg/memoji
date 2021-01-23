import React, { useState } from 'react';

import Card from './Card';

import './styles/Board.css';

function Board() {
  const [emojis] = useState([
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
  ]);

  // map emojis twice to render 2 of each
  return (
    <div className='board h-100 d-flex flex-wrap justify-content-center align-items-center'>
      {emojis.map((emoji, i) => (
        <div
          key={`${i}-${emoji}`}
          className='card-container d-flex justify-content-center align-items-center p-1 col-3 col-md-2'
        >
          <Card emoji={emoji} />
        </div>
      ))}
      {emojis.map((emoji, i) => (
        <div
          key={`${i}-${emoji}`}
          className='card-container d-flex justify-content-center align-items-center p-1 col-3 col-md-2'
        >
          <Card emoji={emoji} />
        </div>
      ))}
    </div>
  );
}

export default Board;
