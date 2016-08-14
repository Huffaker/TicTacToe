import {selectSquare, resetGame, addNewPlayer, removePlayer, addSocket, updatePlayerName, INITIAL_STATE} from './core';

export default function reducer(state = INITIAL_STATE, action) {
  if(action.type == 'SELECT')
    return selectSquare(state, action.entry, action.socketId);
  else if(action.type == 'RESET')
      return resetGame(state);
  else if(action.type == 'ADD_PLAYER')
      return updatePlayerName(state, action.socketId, action.playerName);
  else if(action.meta && !action.meta.remote) {
    switch(action.type ) {
      case 'ADD_SOCKET':
        return addSocket(state, action.socketId);
      case 'REMOVE_PLAYER':
        console.log('removing player');
        return removePlayer(state, action.socketId);
    }
  }
  return state;
}