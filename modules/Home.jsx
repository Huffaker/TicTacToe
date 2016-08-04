import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import Winner from './Winner';
import Board from './Board';
import * as actionCreators from '../src/action_creators';

const Home = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return <div>
        <Board {...this.props} />
        <Winner ref="winner" winner={this.props.winner} playerTurn={this.props.playerTurn} />
    </div>;
  }
});

const mapStateToProps = (state) => {
  return {
    board: state.get('board'),
    playerTurn: state.get('playerTurn'),
    winner: state.get('winner')
  };
}
const mapDispatchToProps = (dispatch) => {
    return {
        select: (entry) => {
            dispatch(actionCreators.selectSquare(entry));
            },
        reset: () => {
            dispatch(actionCreators.resetGame());
        }
    };
};

export const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

