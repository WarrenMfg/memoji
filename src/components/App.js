import React, { useState } from 'react';
import Board from './Board';
import './styles/App.css';

function App() {
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

  return (
    <main className='p-1'>
      <h1 className='text-center m-3'>Memoji</h1>
      <Board emojis={emojis} />
    </main>
  );
}

export default App;
