export function setState(state) {
  return {
    meta: {remote: false},
    type: 'SET_STATE',
    state
  };
}

export function selectSquare(entry) {
  return {
    meta: {remote: true},
    type: 'SELECT',
    entry: entry
  };
}

export function resetGame() {
  return {
    meta: {remote: true},
    type: 'RESET'
  };
}

export function login(entry) {
  return {
    meta: {remote: true},
    type: 'ADD_PLAYER',
    playerName: entry.playerName
  };
}