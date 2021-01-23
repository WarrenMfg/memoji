import React from 'react';
import Card from './Card';

function Board({ emojis }) {
  return (
    <div>
      {emojis.map((emoji, i) => (
        <Card key={`${i}-${emoji}`} emoji={emoji} />
      ))}
    </div>
  );
}

export default Board;
