export function selectSquare(entry) {
  return {
    type: 'SELECT',
    entry: entry
  };
}

export function resetGame() {
  return {
    type: 'RESET'
  };
}