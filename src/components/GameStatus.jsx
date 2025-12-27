import React from 'react';
import { MdEmojiEvents, MdSentimentVeryDissatisfied, MdTimer, MdLoop } from 'react-icons/md';

const GameStatus = ({ gameStatus, moves, maxMoves }) => {
  if (gameStatus === 'won') {
    return (
      <p style={{ color: '#43a047', fontWeight: 'bold', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <MdEmojiEvents size={24} /> Congratulations! You won!
      </p>
    );
  }
  if (gameStatus === 'lost') {
    return (
      <p style={{ color: '#e53935', fontWeight: 'bold', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <MdSentimentVeryDissatisfied size={24} /> Game over! Either the goat was eaten by the wolf or the cabbage was eaten by the goat.
      </p>
    );
  }
  if (gameStatus === 'out_of_moves') {
    return (
      <p style={{ color: '#ff9800', fontWeight: 'bold', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <MdTimer size={24} /> You ran out of moves! Max allowed: {maxMoves}
      </p>
    );
  }
  return (
    <p style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
      <MdLoop size={20} /> Moves used: {moves} / {maxMoves}
    </p>
  );
};

export default GameStatus;
