import {List, Map} from 'immutable';


export function gameState(){
        return {
            TEAM_1: 1,
            TEAM_2: 2,
            DRAW: 0,
            IN_PROGRESS: -1
        }
}

export function mockState() {
    return Map({
        board: List.of(List.of(0,0,0),List.of(0,0,0),List.of(0,0,0)),
        playerTurn: 1,
        winner: -1,
        champion: Map({id: 1}),
        crowd: Map({2:Map({id: 2})}),
        pendingPlayers: Map({3:{id: 3}})
    });
}