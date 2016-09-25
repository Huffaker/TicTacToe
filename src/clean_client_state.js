import {List, Map} from 'immutable';

/*
    Removes other player specific information from the state
    prior to returning it to the client. We are also keeping
    the playerId private to the server.
*/
export default function cleanClientState(state, playerId) {    
    // Retrieve the pllayer score table
    let scoreTable = List([
        Map({
            playerName: state.getIn(['champion', 'name']),
            wins: state.getIn(['champion', 'totalwins'],0)
        })
    ]);
    state.get('crowd', List()).forEach((crowd) => {
        scoreTable = scoreTable.push(Map({
            playerName: crowd.get('name'),
            wins: crowd.get('totalwins',0)
        }));
    });
    console.log(scoreTable)
    // Return a clean state
    if(state.getIn(['champion', 'id']) == playerId.toString())
        return state.remove('crowd')
                .remove('champion')
                .remove('pendingPlayers')
                .set('scoreTable', scoreTable)
                .set('team','champion')
                .set('profile', state.get('champion'));
    else if(state.get('pendingPlayers', Map()).get(playerId.toString()))
        return state.remove('crowd').remove('champion').remove('pendingPlayers').set('team','pending');
    return state
        .remove('champion')
        .remove('crowd')
        .remove('pendingPlayers')
        .set('team','crowd')
        .set('scoreTable', scoreTable)
        .set('profile', state.getIn(['crowd', playerId.toString()]));
};