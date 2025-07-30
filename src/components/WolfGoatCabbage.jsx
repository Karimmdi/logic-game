import React, { useState } from 'react';

function WolfGoatCabbage() {
  const [items, setItems] = useState({
    wolf: 'left',
    goat: 'left',
    cabbage: 'left',
    boat: 'left',
  });

  const [itemInBoat, setItemInBoat] = useState(null);
  const [moves, setMoves] = useState(0);
  const maxMoves = 15;
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing' | 'won' | 'lost'

  const checkLossCondition = (state) => {
    const boatSide = state.boat;

    const wolfWithGoat = state.wolf === state.goat;
    const goatWithCabbage = state.goat === state.cabbage;

    const wolfGoatUnattended = wolfWithGoat && state.goat !== boatSide;
    const goatCabbageUnattended = goatWithCabbage && state.goat !== boatSide;

    return wolfGoatUnattended || goatCabbageUnattended;
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
      setItemInBoat(null); // Unload item
    } else if (!itemInBoat) {
      setItemInBoat(itemKey); // Load item
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

  // Check if any dangerous pair is left alone on the old side (where the farmer just left)
  const unattended = (side) => {
    const wolf = newItems.wolf === side;
    const goat = newItems.goat === side;
    const cabbage = newItems.cabbage === side;

    return (wolf && goat && !cabbage) || (goat && cabbage && !wolf);
  };

  if (unattended(oldBoatSide)) {
    setGameStatus('lost');
  } else if (checkWinCondition(newItems)) {
    setGameStatus('won');
  } else if (nextMoves >= maxMoves) {
    setGameStatus('lost');
  }

  setItems(newItems);
  setMoves(nextMoves);
  setItemInBoat(null);
};




  const renderSide = (side) => (
    <>
      {items.wolf === side && itemInBoat !== 'wolf' && (
        <p>🐺 Wolf <button onClick={() => handleItemClick('wolf')}>Board</button></p>
      )}
      {itemInBoat === 'wolf' && items.boat === side && (
        <p>🐺 Wolf (on boat) <button onClick={() => handleItemClick('wolf')}>Unload</button></p>
      )}

      {items.goat === side && itemInBoat !== 'goat' && (
        <p>🐑 Goat <button onClick={() => handleItemClick('goat')}>Board</button></p>
      )}
      {itemInBoat === 'goat' && items.boat === side && (
        <p>🐑 Goat (on boat) <button onClick={() => handleItemClick('goat')}>Unload</button></p>
      )}

      {items.cabbage === side && itemInBoat !== 'cabbage' && (
        <p>🥬 Cabbage <button onClick={() => handleItemClick('cabbage')}>Board</button></p>
      )}
      {itemInBoat === 'cabbage' && items.boat === side && (
        <p>🥬 Cabbage (on boat) <button onClick={() => handleItemClick('cabbage')}>Unload</button></p>
      )}

      {items.boat === side && <p>🛶 Boat</p>}
    </>
  );

  const renderStatus = () => {
    if (gameStatus === 'won') {
      return (
        <p style={{ color: 'green', fontWeight: 'bold' }}>
          🎉 Congratulations! You won!
        </p>
      );
    }

    if (gameStatus === 'lost') {
      return (
        <p style={{ color: 'red', fontWeight: 'bold' }}>
          😔 Game over! Either the goat was eaten by the wolf or the cabbage was eaten by the goat.
        </p>
      );
    }

    if (moves >= maxMoves) {
      return (
        <p style={{ color: 'orange', fontWeight: 'bold' }}>
          ⏱️ You ran out of moves! Max allowed: {maxMoves}
        </p>
      );
    }

    return (
      <p>🔁 Moves used: {moves} / {maxMoves}</p>
    );
  };

  return (
    <div>
      <h2>Wolf, Goat and Cabbage Puzzle</h2>

      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        border: '1px solid black',
        padding: '10px'
      }}>
        <div style={{ width: '40%', textAlign: 'left' }}>
          <h3>🌊 Left Bank {items.boat === 'left' && ' (You are here)'}</h3>
          {renderSide('left')}
        </div>

        <div style={{ width: '40%', textAlign: 'right' }}>
          <h3>🌊 Right Bank {items.boat === 'right' && ' (You are here)'}</h3>
          {renderSide('right')}
        </div>
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button onClick={handleCrossRiver} disabled={gameStatus !== 'playing' || moves >= maxMoves}>
          Cross River
        </button>
      </div>

      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        {renderStatus()}
      </div>
    </div>
  );
}

export default WolfGoatCabbage;
