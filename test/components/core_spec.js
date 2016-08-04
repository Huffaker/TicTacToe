import {List, Map} from 'immutable';
import {expect} from 'chai';

import {selectSquare, resetGame} from '../../src/core';

describe('application logic', () => {

  describe('resetGame', () => {
      it('returns a fresh state when the game is over', () => {
        const state = Map({
            winner: 1,
            playerTurn: 1
        });
        const nextState = resetGame(state);
        expect(nextState.get('board')).to.equal(
            List.of(List.of(0,0,0),List.of(0,0,0),List.of(0,0,0)));
      });

    it('returns the same state when the game is not over', () => {
        const state = Map({
            winner: -1,
            playerTurn: 1
        });
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
      const state = Map();
      const nextState = selectSquare(state, {team: 1});

      expect(nextState.get('board')).to.equal(
          List.of(List.of(0,0,0),List.of(0,0,0),List.of(0,0,0))
      );
      
    });

    it('allows player to claim square if available', () => {
        const state = Map();
        const nextState = selectSquare(state, {row: 0, column: 0, team: 1});

        expect(nextState.get('board')).to.equal(
            List.of(List.of(1,0,0),List.of(0,0,0),List.of(0,0,0))
        );
    });

    it('prevents player from playing if it is not their turn', () => {
        const state = Map({
            playerTurn: 1
        });
        const nextState = selectSquare(state, {row: 0, column: 0, team: 2});

        expect(nextState).to.equal(state);
    });

    it('prevents player from claiming square if not available', () => {
        const state = Map({
            board: List.of(List.of(1,0,0),List.of(0,0,0),List.of(0,0,0))
        });
        const nextState = selectSquare(state, {row: 0, column: 0, team: 2});

        expect(nextState.get('board')).to.equal(
            List.of(List.of(1,0,0),List.of(0,0,0),List.of(0,0,0))
        );
    });

    it('returns the same state if a winner has already been determined', ()=>{
        const state = Map({
            winner: 1
        });
        const nextState = selectSquare(state, {row: 0, column: 0, team: 2});
        
        expect(nextState).to.equal(state);
    });

    it('finds winner if a row is taken', () => {
        const state = Map({
            board: List.of(List.of(0,1,1),List.of(0,0,0),List.of(0,0,0))
        });
        const nextState = selectSquare(state, {row: 0, column: 0, team: 1});
        
        expect(nextState.get('winner')).to.equal(1);
    });

    it('finds winner if a column is taken', () => {
        const state = Map({
            board: List.of(List.of(0,0,0),List.of(1,0,0),List.of(1,0,0))
        });
        const nextState = selectSquare(state, {row: 0, column: 0, team: 1});
        
        expect(nextState.get('winner')).to.equal(1);
    });

    it('finds winner if a diagonal is taken', () => {
        const state = Map({
            board: List.of(List.of(0,0,0),List.of(0,1,0),List.of(0,0,1))
        });
        const nextState = selectSquare(state, {row: 0, column: 0, team: 1});
        
        expect(nextState.get('winner')).to.equal(1);
    });

    it('finds winner if the opposing diagonal is taken', () => {
        const state = Map({
            board: List.of(List.of(0,0,0),List.of(0,1,0),List.of(1,0,0))
        });
        const nextState = selectSquare(state, {row: 0, column: 2, team: 1});
        
        expect(nextState.get('winner')).to.equal(1);
    });

    it('determines if game is a draw', () => {
        const state = Map({
            board: List.of(List.of(0,2,1),List.of(1,1,2),List.of(2,2,1)),
            playerTurn: 2
        });
        const nextState = selectSquare(state, {row: 0, column: 0, team: 2});
        
        expect(nextState.get('winner')).to.equal(0);
    });

    it('returns player one turn after player one and player two have made a move', () => {
        const state = Map({
            board: List.of(List.of(0,0,0),List.of(0,1,0),List.of(0,0,0)),
            playerTurn: 2
        });
        const nextState = selectSquare(state, {row: 0, column: 0, team: 2});
        
        expect(nextState.get('playerTurn')).to.equal(1);
    });

    it('returns player two turn after player one has made a move', () => {
        const state = Map({
            board: List.of(List.of(0,0,0),List.of(0,0,0),List.of(0,0,0))
        });
        const nextState = selectSquare(state, {row: 0, column: 0, team: 1});
        
        expect(nextState.get('playerTurn')).to.equal(2);
    });

    it('still returns player two turn after player two attempts to take an already taken spot', () => {
        const state = Map({
            board: List.of(List.of(0,0,0),List.of(0,1,0),List.of(0,0,0)),
            playerTurn: 2
        });
        const nextState = selectSquare(state, {row: 1, column: 1, team: 2});
        
        expect(nextState.get('playerTurn')).to.equal(2);
    });

  });
});