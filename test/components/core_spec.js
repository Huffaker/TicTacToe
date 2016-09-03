import {List, Map} from 'immutable';
import {expect} from 'chai';
import {mockState} from './state_mock';
import {gameState} from '../../src/state_enums';

import {selectSquare, resetGame, addNewPlayer, removePlayer, updatePlayerName} from '../../src/core';

describe('application logic', () => {

  describe('resetGame', () => {
      it('returns a fresh state when the game is over', () => {
        const state = mockState().remove('board').set('winner',gameState().TEAM_1);

        const nextState = resetGame(state);
        expect(nextState.get('board')).to.equal(
            List.of(List.of(0,0,0),List.of(0,0,0),List.of(0,0,0)));
      });

    it('returns the same state when the game is not over', () => {
        const state = mockState();

        const nextState = resetGame(state);
        expect(nextState).to.equal(state);
      });
  });

  describe('selectSquare', () => {

    it('does not change the previous state (immutable)', () => {
        const state = Map();
        const nextState = selectSquare(state,{});
        expect(state).to.equal(Map());
    });

    it('sets the board if none exists', () => {
        const state = mockState().remove('board');

        const nextState = selectSquare(state, {}, 1);

        expect(nextState.get('board')).to.equal(
          List.of(List.of(0,0,0),List.of(0,0,0),List.of(0,0,0))
      );
    });

    it('allows player to claim square if available', () => {
        const state = mockState();
        const nextState = selectSquare(state, {row: 0, column: 0},1);
        expect(nextState.get('board')).to.equal(
            List.of(List.of(1,0,0),List.of(0,0,0),List.of(0,0,0))
        );
    });

    it('prevents player from playing if it is not their turn', () => {
        const state = mockState();
        const nextState = selectSquare(state, {row: 0, column: 0}, 2);

        expect(nextState).to.equal(state);
    });

    it('prevents player from claiming square if not available', () => {
        const state = mockState()
            .set('board',List.of(List.of(1,0,0),List.of(0,0,0),List.of(0,0,0)));
        const nextState = selectSquare(state, {row: 0, column: 0},2);

        expect(nextState.get('board')).to.equal(
            state.get('board')
        );
        expect(nextState.get('playerTurn')).to.equal(
            state.get('playerTurn')
        );
    });

    it('returns the same state if a winner has already been determined', ()=>{
        const state = mockState();
        const nextState = selectSquare(state, {row: 0, column: 0}, 2);
        
        expect(nextState).to.equal(state);
    });

    it('finds winner if a row is taken', () => {
        const state = mockState().set('board', List.of(List.of(0,1,1),List.of(0,0,0),List.of(0,0,0)));
        const nextState = selectSquare(state, {row: 0, column: 0}, 1);
        
        expect(nextState.get('winner')).to.equal(gameState().TEAM_1);
    });

    it('finds winner if a column is taken', () => {
        const state = mockState()
            .set('board', List.of(List.of(0,0,0),List.of(1,0,0),List.of(1,0,0)));

        const nextState = selectSquare(state, {row: 0, column: 0}, 1);
        
        expect(nextState.get('winner')).to.equal(gameState().TEAM_1);
    });

    it('finds winner if a diagonal is taken', () => {
        const state = mockState()
            .set('board', List.of(List.of(0,0,0),List.of(0,1,0),List.of(0,0,1)));
        const nextState = selectSquare(state, {row: 0, column: 0}, 1);
        
        expect(nextState.get('winner')).to.equal(gameState().TEAM_1);
    });

    it('finds winner if the opposing diagonal is taken', () => {
        const state = mockState()
            .set('board', List.of(List.of(0,0,0),List.of(0,1,0),List.of(1,0,0)));

        const nextState = selectSquare(state, {row: 0, column: 2}, 1);
        
        expect(nextState.get('winner')).to.equal(gameState().TEAM_1);
    });

    it('determines if game is a draw', () => {
        const state = mockState()
            .set('board', List.of(List.of(0,2,1),List.of(1,1,2),List.of(2,2,1)))
            .set('playerTurn',2)
            .set('crowd',Map({ 2: Map({id: 2})}));

        const nextState = selectSquare(state, {row: 0, column: 0},2);
        expect(nextState.get('winner')).to.equal(gameState().DRAW);
    });

    it('returns player one turn after player one and player two have made a move', () => {
        const state = mockState()
            .set('board', List.of(List.of(0,0,0),List.of(0,1,0),List.of(0,0,0)));
        const nextState = selectSquare(state, {row: 0, column: 0},2);
        
        expect(nextState.get('playerTurn')).to.equal(1);
    });

    it('returns player two turn after player one has made a move', () => {
        const state = mockState();
        const nextState = selectSquare(state, {row: 0, column: 0}, 1);
        
        expect(nextState.get('playerTurn')).to.equal(2);
    });

    it('still returns player two turn after player two attempts to take an already taken spot', () => {
        const state = mockState()
            .set('board', List.of(List.of(0,0,0),List.of(0,1,0),List.of(0,0,0)))
            .set('playerTurn', 2);
        const nextState = selectSquare(state, {row: 1, column: 1}, 2);
        
        expect(nextState.get('playerTurn')).to.equal(2);
    });

  });

    describe('updatePlayerName', () => {
        it('Removes a player from pending and adds them to the game', () => {
            const state = mockState();

            const newState = updatePlayerName(state, 3, 'test');
            expect(!newState.get('pendingPlayers').get(3));
            expect(newState.get('crowd').get(3));
        });
    });

    describe('addNewPlayer', () => {
      it('adds a new player as champion', () => {
        const state = mockState().remove('champion').remove('crowd');
        const nextState = addNewPlayer(state, 3, 'test');
        expect(nextState.getIn(['champion','id'])).to.equal(3);
      });

      it('adds a new player to the crowd if champion is taken', () => {
        const state = mockState().remove('crowd');
        const nextState = addNewPlayer(state, 3, 'test');
        expect(nextState.get('crowd').first().get('id')).to.equal(3);
      });
    });

    describe('removePlayer', () => {
      it('replaces the player if they were champion', () => {
        const state = mockState()
                    .set('crowd',Map({ 2: Map({id: 2})}));;
        const nextState = removePlayer(state, 1);
        expect(nextState.getIn(['champion','id'])).to.equal(2);
        expect(nextState.get('crowd')).to.equal(Map());
      });
      it('replaces the champion with null if the crowd is empty', () => {
        const state = mockState().set('crowd', Map());
        const nextState = removePlayer(state, 1);
        expect(nextState.get('champion')).to.equal(null);
        expect(nextState.get('crowd')).to.equal(Map());
      });
      it('removes the crowd player if they are in the crowd', () => {
        const state = mockState()
                .set('crowd',Map({ 2: Map({id: 2})}));;
        const nextState = removePlayer(state, 2);
        expect(nextState.get('crowd')).to.equal(Map())
      });
    });
});