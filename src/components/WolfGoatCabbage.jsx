import React, { useState } from 'react';
import BankSide from './BankSide';
import GameStatus from './GameStatus';
import GameControls from './GameControls';
import { checkLossCondition, checkWinCondition } from './gameLogic';
import './WolfGoatCabbage.css';

function WolfGoatCabbage() {
  const initialItems = {
    wolf: 'left',
    goat: 'left',
    cabbage: 'left',
    boat: 'left',
  };

  const [items, setItems] = useState(initialItems);
  const [itemInBoat, setItemInBoat] = useState(null);
  const [moves, setMoves] = useState(0);
  const maxMoves = 8;
  const [gameStatus, setGameStatus] = useState('playing');

  const handleItemClick = (itemKey) => {
    if (gameStatus !== 'playing') return;
    if (items[itemKey] !== items.boat && itemInBoat !== itemKey) {
      alert('Item must be on the same side as the boat.');
      return;
    }
    if (itemInBoat === itemKey) {
      setItemInBoat(null);
    } else if (!itemInBoat) {
      setItemInBoat(itemKey);
    } else {
      alert('Boat can only carry one item.');
    }
  };

  const handleCrossRiver = () => {
    if (gameStatus !== 'playing') return;
    const oldBoatSide = items.boat;
    const newBoatSide = oldBoatSide === 'left' ? 'right' : 'left';
    const newItems = { ...items, boat: newBoatSide };
    if (itemInBoat) {
      newItems[itemInBoat] = newBoatSide;
    }
    const nextMoves = moves + 1;
    if (checkLossCondition(newItems, oldBoatSide)) {
      setGameStatus('lost');
    } else if (checkWinCondition(newItems)) {
      setGameStatus('won');
    } else if (nextMoves >= maxMoves) {
      setGameStatus('out_of_moves');
    }
    setItems(newItems);
    setMoves(nextMoves);
    setItemInBoat(null);
  };

  const handleReset = () => {
    setItems(initialItems);
    setItemInBoat(null);
    setMoves(0);
    setGameStatus('playing');
  };

  return (
    <div className="wgc-root">
      <h2 className="wgc-title">
        🐺🐑🥬 River Crossing Logic Game
      </h2>
      <h3 className="wgc-subtitle">
        Get the wolf, goat, and cabbage safely across the river using your boat!
      </h3>
      <h4 className="wgc-rules-title">🚫 Rules:</h4>
      <ol className="wgc-rules-list">
        <li>You can only take one item at a time across the river.</li>
        <li>If the wolf is left alone with the goat, the wolf will eat the goat.</li>
        <li>If the goat is left alone with the cabbage, the goat will eat the cabbage.</li>
        <li>You can only take items that are on the same side as the boat.</li>
        <li>
          You can cross the river with an empty boat, but it still counts as a move — so choose wisely!
        </li>
      </ol>
      <br />

      <div className="banks-container">
        <div className="bank-side">
          <h3 className="bank-title">
            🌊 Left Bank {items.boat === 'left' && ' (You are here)'}
          </h3>
          <BankSide
            side="left"
            items={items}
            itemInBoat={itemInBoat}
            handleItemClick={handleItemClick}
            gameStatus={gameStatus}
          />
        </div>

        <div className="bank-side right">
          <h3 className="bank-title">
            🌊 Right Bank {items.boat === 'right' && ' (You are here)'}
          </h3>
          <BankSide
            side="right"
            items={items}
            itemInBoat={itemInBoat}
            handleItemClick={handleItemClick}
            gameStatus={gameStatus}
          />
        </div>
      </div>

      <GameControls
        onCrossRiver={handleCrossRiver}
        onReset={handleReset}
        disabled={gameStatus !== 'playing' || moves >= maxMoves}
      />

      <div className="game-status">
        <GameStatus gameStatus={gameStatus} moves={moves} maxMoves={maxMoves} />
      </div>
    </div>
  );
}

export default WolfGoatCabbage;