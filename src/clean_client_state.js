import {List, Map} from 'immutable';

/*
    Removes other player specific information from the state
    prior to returning it to the client. We are also keeping
    the playerId private to the server.
*/
export default function cleanClientState(state, playerId) {
    if(state.getIn(['champion', 'id']) == playerId.toString())
        return state.remove('crowd')
                .remove('champion')
                .remove('pendingPlayers')
                .set('team','champion')
                .set('profile', state.get('champion'));
    else if(state.get('pendingPlayers', Map()).get(playerId.toString()))
        return state.remove('crowd').remove('champion').remove('pendingPlayers').set('team','pending');

    return state
        .remove('champion')
        .remove('crowd')
        .remove('pendingPlayers')
        .set('team','crowd')
        .set('profile', state.getIn(['crowd', playerId.toString()]));
};