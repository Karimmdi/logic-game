import React from 'react';

const BankSide = ({ side, items, itemInBoat, handleItemClick }) => (
  <div style={{ minHeight: '120px' }}>
    {['wolf', 'goat', 'cabbage'].map((item) =>
      items[item] === side && itemInBoat !== item ? (
        <div key={item} className="bank-item-row">
          <span>
            {item === 'wolf' ? '🐺 ' : item === 'goat' ? '🐑 ' : '🥬 '} {item.charAt(0).toUpperCase() + item.slice(1)}
          </span>
          <button className="fun-btn" onClick={() => handleItemClick(item)}>
            Board
          </button>
        </div>
      ) : null
    )}
    {[' wolf', ' goat', ' cabbage'].map((item) =>
      itemInBoat === item && items.boat === side ? (
        <div key={item + '-boat'} className="bank-item-row">
          <span>
            {item === 'wolf' ? '🐺' : item === 'goat' ? '🐑' : '🥬'} {item.charAt(0).toUpperCase() + item.slice(1)} (on boat)
          </span>
          <button className="fun-btn" onClick={() => handleItemClick(item)}>
            Unload
          </button>
        </div>
      ) : null
    )}
    {items.boat === side && (
      <div style={{ fontSize: '1.5rem', color: '#1976d2', fontWeight: 'bold' }}>🛶 Boat</div>
    )}
  </div>
);

export default BankSide;
