import {List, Map} from 'immutable';

export function mockState() {
    return Map({
        board: List.of(List.of(0,0,0),List.of(0,0,0),List.of(0,0,0)),
        playerTurn: 1,
        winner: -1,
        champion: Map({id: 1}),
        crowd: Map({ 2: Map({id: 2}), 
            3: Map({id: 3, vote: Map({row: 1, column: 1}) }), 
            4: Map({id: 4, vote: Map({row: 1, column: 1}) })
        }),
        concensus: null,
        pendingPlayers: Map({3:Map({id: 3})})
    });
}