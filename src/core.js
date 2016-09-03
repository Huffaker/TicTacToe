import {List, Map} from 'immutable';
import {gameState} from './state_enums';

export const INITIAL_STATE = Map();
const INITIAL_BOARD = List.of(List.of(0,0,0),List.of(0,0,0),List.of(0,0,0));
const INITIAL_PLAYER = 1;

// Returns:
//  1 = player 1 victory
//  2 = player 2 victory
//  0 = draw
//  -1 = no winner, game still active
function checkWinner(boardState) {
    // Row and Column cases
    for(let i = 0; i < 3; i++){
        if(boardState.getIn([i,0]) === boardState.getIn([i,1])
            && boardState.getIn([i,0]) === boardState.getIn([i,2])
            && boardState.getIn([i,0]) != 0) {
            return boardState.getIn([i,0]);
        }
        if(boardState.getIn([0,i]) === boardState.getIn([1,i])
           && boardState.getIn([0,i]) === boardState.getIn([2,i])
           && boardState.getIn([0,i]) != 0) {
            return boardState.getIn([0,i]);
        }
    }
    // Diagonal cases
    if(boardState.getIn([0,0]) === boardState.getIn([1,1])
        && boardState.getIn([0,0]) === boardState.getIn([2,2])
        && boardState.getIn([0,0]) != 0) {
        return boardState.getIn([0,0]);
    }
    if(boardState.getIn([0,2]) === boardState.getIn([1,1])
        && boardState.getIn([0,2]) === boardState.getIn([2,0])
        && boardState.getIn([0,2]) != 0) {
        return boardState.getIn([0,2]);
    }
    
    // Check for draw
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j< 3; j++) {
            if(boardState.getIn([i,j]) ===0)
                return -1;
        }
    }
    return 0;
}

// Player 1 always goes first
function getPlayerTurn(boardState) {
    let playerOneCount = 0;
    let playerTwoCount = 0;
    // Check for draw
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j< 3; j++) {
            if(boardState.getIn([i,j]) === 1)
                playerOneCount ++;
            else if(boardState.getIn([i,j]) === 2)
                playerTwoCount ++;
        }
    }
    return playerOneCount > playerTwoCount? 2:1;
}

// Update the crowdPlayer vote and determine if consensus has been reached
function getCrowdVote(state, entry, playerId) {
    // Check if entry is valid move
    if(state.getIn(['board', entry.row, entry.column]) > 0)
        return state;

    let voteState = state.setIn(['crowd', playerId.toString(), 'vote'], Map(entry));
    let crowdSize = voteState.get('crowd').count();
    let votes = voteState.get('crowd').filter(x=> x.get('vote') && x.get('vote') != null).count();

    // Check for consensus
    // Requires greater then 80%
    if(votes/crowdSize < .8 )
        return voteState;
    
    // Find popular vote
    let entries = voteState.get('crowd').map(x=> x.getIn(['vote', 'row']) + '-' + x.getIn(['vote', 'column']));
    let groups = Map();
    entries.forEach(a=> {
        groups = groups.setIn([a,'count'], groups.getIn([a, 'count'], 0) + 1);
        groups = groups.setIn([a, 'id'],a)
    });
    let consensus = null;
    let tally = 0;
    let sortGroup = groups.forEach(a => {
        if(a.get('count') > tally){
            tally = a.get('count');
            consensus = a.get('id');
        }
    });

    // Now that we have a consensus, reset crowd votes
    voteState.get('crowd').forEach(a=> {
        voteState = voteState.setIn(['crowd', a.get('id').toString(), 'vote'], null);
    });

    return voteState
        .set('consensus', {
            row: consensus.split('-')[0],
            column: consensus.split('-')[1]
        });
}

export function selectSquare(state, entry, playerId) {
    // Check if game is still active
    if(state.get('winner') > -1 )
        return state;

    // Get the current players team
    if(!playerId)
        return state;
    let team = gameState().TEAM_2;
    if(state.getIn(['champion', 'id']) === playerId)
        team = gameState().TEAM_1;
    // Check if they are a registered player
    else if(!state.get('crowd', Map()).get(playerId.toString()))
        return state;

    // Check that this is the correct team
    if(state.get('playerTurn',INITIAL_PLAYER) != team)
        return state;

    // Initialize the board if it doesn't exist
    const board = state.get('board', INITIAL_BOARD);

    // If it is the crowd, check for a consensus
    if(team == gameState().TEAM_2) {
        state = getCrowdVote(state, entry, playerId);
        if (state.get('consensus') != null) {
            entry = state.get('consensus');
        }
        else
         return state;
    }

    // Update the square selected if it is available
    const talled_board = board.getIn([entry.row, entry.column]) === 0
            ? board.setIn([entry.row, entry.column], team):board;

    return state.merge({
        board: talled_board,
        playerTurn: getPlayerTurn(talled_board),
        winner: checkWinner(talled_board)
    });
}

export function resetGame(state) {
    // Check if game is still active
    if(state.get('winner') == -1)
        return state;

    return state.set('winner', -1)
            .set('board', INITIAL_BOARD)
            .set('playerTurn', INITIAL_PLAYER);
}

export function addSocket(state, playerId) {
    if(!playerId)
        return state;
    
    return state.setIn(['pendingPlayers', playerId.toString()], Map({id: playerId}));
}

export function updatePlayerName(state, playerId, playerName) {
    if(!playerId || !playerName)
        return state;
    if(playerName.length < 4)
        return state;
    
    if(state.get('pendingPlayers', Map()).get(playerId.toString())) {
        var nextState = state.set('pendingPlayers', state.get('pendingPlayers').remove(playerId.toString()));

        return addNewPlayer(nextState, playerId, playerName);
    }
    return state;
}

export function addNewPlayer(state, playerId, playerName) {
    if(!playerId || !playerName)
        return state;
    if(playerName.length < 4)
        return state;

    // If a Champion doesn't exist yet, set this player as Champion
    if(!state.get('champion')) {
        return state.set('champion', Map({id: playerId, name: playerName}));
    }
    else {
        return state.set('crowd', state.get('crowd', Map()).set(playerId,Map({id: playerId, name: playerName})));
    }
}

export function removePlayer(state, playerId) {
    if(!playerId)
        return state;

    // Replace the champion from the first crowd player
    if(state.getIn(['champion', 'id']) == playerId.toString()) {
        if(state.get('crowd', Map()).size === 0) {
            return state.set('champion', null);
        }

        let replacement = state.get('crowd', Map()).last();
        let newChampState = state.set('crowd', state.get('crowd', Map()).butLast());
        return newChampState.set('champion', Map(replacement));
    }
    else if(state.get('crowd', Map()).get(playerId.toString())) {
        return state.deleteIn(['crowd', playerId.toString()]);
    }
    else if(state.get('pendingPlayers', Map()).get(playerId.toString())) {
        return state.deleteIn(['pendingPlayers', playerId.toString()]);
    }
    return state;
}