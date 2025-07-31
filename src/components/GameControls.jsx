import React from 'react';

const GameControls = ({ onCrossRiver, onReset, disabled }) => (
  <div style={{ marginTop: '2vw', textAlign: 'center' }}>
    <button className="fun-btn" onClick={onCrossRiver} disabled={disabled}>
      🚣‍♂️ Cross River
    </button>
    <button className="fun-btn" onClick={onReset} style={{ marginLeft: '1vw', background: '#43a047' }}>
      🔄 Reset Game
    </button>
  </div>
);

export default GameControls;
