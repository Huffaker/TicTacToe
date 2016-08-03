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
        <Winner  ref="winner" winner={this.props.winner} playerTurn={this.props.playerTurn} />
        <Board {...this.props} />
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

export const HomeContainer = connect(
  mapStateToProps,
  actionCreators
)(Home);

