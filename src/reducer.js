import {selectSquare, resetGame, INITIAL_STATE} from './core';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SELECT':
    return selectSquare(state, action.entry);
  case 'RESET':
    return resetGame(state);
  }
  return state;
}