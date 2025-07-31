export const checkLossCondition = (state, leftSide) => {
  const wolf = state.wolf === leftSide;
  const goat = state.goat === leftSide;
  const cabbage = state.cabbage === leftSide;
  if (goat && wolf && !cabbage) return true;
  if (goat && cabbage && !wolf) return true;
  return false;
};

export const checkWinCondition = (state) => {
  return (
    state.wolf === 'right' &&
    state.goat === 'right' &&
    state.cabbage === 'right'
  );
};