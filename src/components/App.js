import React from 'react';
import Board from './Board';
import './styles/App.css';

/**
 * App component - stateful container
 */
function App() {
  // TODO - add score/number of match attempts?

  return (
    <main className='container h-100'>
      <h1 className='text-center p-3 m-0'>
        <span>Mem</span>oji
      </h1>
      <Board />
    </main>
  );
}

export default App;
