import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import Winner from './Winner';
import Board from './Board';
import PlayerTeam from './PlayerTeam';
import Login from './Login';
import Profile from './Profile';
import ScoreTable from './ScoreTable';
import * as actionCreators from '../src/action_creators';

const Home = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    if(!this.props.board)
      return <h2>Loading...</h2>;
    if(this.props.team == 'pending')
      return <Login {...this.props} />;
    return <div>
        <PlayerTeam team ={this.props.team} profile={this.props.profile}/>
        <Board {...this.props} />
        <Winner ref="winner" winner={this.props.winner} playerTurn={this.props.playerTurn} />
        <Profile ref="profile" profile={this.props.profile} team ={this.props.team}/>
        <ScoreTable scoreTable={this.props.scoreTable} />
    </div>;
  }
});

const mapStateToProps = (state) => {
  return {
    board: state.get('board'),
    playerTurn: state.get('playerTurn'),
    winner: state.get('winner'),
    team: state.get('team'),
    profile: state.get('profile'),
    scoreTable: state.get('scoreTable')
  };
}
const mapDispatchToProps = (dispatch) => {
    return {
        select: (entry) => {
            dispatch(actionCreators.selectSquare(entry));
            },
        reset: () => {
            dispatch(actionCreators.resetGame());
        },
        login: (entry) => {
            dispatch(actionCreators.login(entry));
        }
    };
};

export const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

