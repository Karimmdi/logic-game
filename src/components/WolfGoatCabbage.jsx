import React, { useState } from 'react';

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

  const checkLossCondition = (state, leftSide) => {
    const wolf = state.wolf === leftSide;
    const goat = state.goat === leftSide;
    const cabbage = state.cabbage === leftSide;
    if (goat && wolf && !cabbage) return true;
    if (goat && cabbage && !wolf) return true;
    return false;
  };

  const checkWinCondition = (state) => {
    return (
      state.wolf === 'right' &&
      state.goat === 'right' &&
      state.cabbage === 'right'
    );
  };

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

  const renderSide = (side) => (
    <>
      {items.wolf === side && itemInBoat !== 'wolf' && (
        <p>
          🐺 Wolf{' '}
          <button
            className="fun-btn"
            onClick={() => handleItemClick('wolf')}
            disabled={items.boat !== side || gameStatus !== 'playing'}
          >
            Board
          </button>
        </p>
      )}
      {itemInBoat === 'wolf' && items.boat === side && (
        <p>
          🐺 Wolf (on boat){' '}
          <button
            className="fun-btn"
            onClick={() => handleItemClick('wolf')}
            disabled={gameStatus !== 'playing'}
          >
            Unload
          </button>
        </p>
      )}

      {items.goat === side && itemInBoat !== 'goat' && (
        <p>
          🐑 Goat{' '}
          <button
            className="fun-btn"
            onClick={() => handleItemClick('goat')}
            disabled={items.boat !== side || gameStatus !== 'playing'}
          >
            Board
          </button>
        </p>
      )}
      {itemInBoat === 'goat' && items.boat === side && (
        <p>
          🐑 Goat (on boat){' '}
          <button
            className="fun-btn"
            onClick={() => handleItemClick('goat')}
            disabled={gameStatus !== 'playing'}
          >
            Unload
          </button>
        </p>
      )}

      {items.cabbage === side && itemInBoat !== 'cabbage' && (
        <p>
          🥬 Cabbage{' '}
          <button
            className="fun-btn"
            onClick={() => handleItemClick('cabbage')}
            disabled={items.boat !== side || gameStatus !== 'playing'}
          >
            Board
          </button>
        </p>
      )}
      {itemInBoat === 'cabbage' && items.boat === side && (
        <p>
          🥬 Cabbage (on boat){' '}
          <button
            className="fun-btn"
            onClick={() => handleItemClick('cabbage')}
            disabled={gameStatus !== 'playing'}
          >
            Unload
          </button>
        </p>
      )}

      {items.boat === side && (
        <p style={{ fontSize: '2rem', color: '#1976d2', fontWeight: 'bold' }}>
          🛶 Boat
        </p>
      )}
    </>
  );

  const renderStatus = () => {
    if (gameStatus === 'won') {
      return (
        <p style={{ color: '#43a047', fontWeight: 'bold', fontSize: '1.3rem' }}>
          🎉 Congratulations! You won!
        </p>
      );
    }
    if (gameStatus === 'lost') {
      return (
        <p style={{ color: '#e53935', fontWeight: 'bold', fontSize: '1.2rem' }}>
          😔 Game over! Either the goat was eaten by the wolf or the cabbage was eaten by the goat.
        </p>
      );
    }
    if (gameStatus === 'out_of_moves') {
      return (
        <p style={{ color: '#ff9800', fontWeight: 'bold', fontSize: '1.2rem' }}>
          ⏱️ You ran out of moves! Max allowed: {maxMoves}
        </p>
      );
    }
    return (
      <p style={{ fontSize: '1.1rem' }}>
        🔁 Moves used: {moves} / {maxMoves}
      </p>
    );
  };

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '30px',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e0f7fa 0%, #fffde7 100%)',
        fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
      }}
    >
      <h2 style={{ color: '#1976d2', fontWeight: 'bold', fontSize: '2.2rem' }}>
        🐺🐑🥬 River Crossing Logic Game
      </h2>
      <h3 style={{ color: '#388e3c', fontWeight: 'bold' }}>
        Get the wolf, goat, and cabbage safely across the river using your boat!
      </h3>
      <h4 style={{ color: '#fbc02d' }}>🚫 Rules:</h4>
      <ol
        style={{
          textAlign: 'left',
          display: 'inline-block',
          background: '#fffde7',
          borderRadius: '10px',
          padding: '15px 30px',
          border: '2px solid #fbc02d',
          fontSize: '1.1rem',
        }}
      >
        <li>You can only take one item at a time across the river.</li>
        <li>If the wolf is left alone with the goat, the wolf will eat the goat.</li>
        <li>If the goat is left alone with the cabbage, the goat will eat the cabbage.</li>
        <li>You can only take items that are on the same side as the boat.</li>
        <li>
          You can cross the river with an empty boat, but it still counts as a move — so choose wisely!
        </li>
      </ol>
      <br />

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '30px',
          flexWrap: 'wrap',
          width: '90%',
          margin: '0 auto',
          border: '3px solid #1976d2',
          borderRadius: '15px',
          background: '#e3f2fd',
          padding: '20px',
          boxShadow: '0 4px 16px #b3e5fc',
        }}
      >
        <div style={{ width: '40%', textAlign: 'left' }}>
          <h3 style={{ color: '#1976d2' }}>
            🌊 Left Bank {items.boat === 'left' && ' (You are here)'}
          </h3>
          {renderSide('left')}
        </div>

        <div style={{ width: '40%', textAlign: 'right' }}>
          <h3 style={{ color: '#1976d2' }}>
            🌊 Right Bank {items.boat === 'right' && ' (You are here)'}
          </h3>
          {renderSide('right')}
        </div>
      </div>

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <button
          className="fun-btn"
          onClick={handleCrossRiver}
          disabled={gameStatus !== 'playing' || moves >= maxMoves}
        >
          🚣‍♂️ Cross River
        </button>
        <button
          className="fun-btn"
          onClick={handleReset}
          style={{ marginLeft: '20px', background: '#43a047' }}
        >
          🔄 Reset Game
        </button>
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>{renderStatus()}</div>

      {/* Fun CSS for buttons */}
      <style>{`
        .fun-btn {
          font-size: 1.2rem;
          padding: 14px 32px;
          margin: 6px;
          border-radius: 12px;
          border: none;
          background: #1976d2;
          color: #fff;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 0 2px 8px #90caf9;
          transition: background 0.2s, transform 0.2s;
        }
        .fun-btn:hover:enabled {
          background: #1565c0;
          transform: scale(1.08);
        }
        .fun-btn:disabled {
          background: #bdbdbd;
          color: #eee;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}

export default WolfGoatCabbage;