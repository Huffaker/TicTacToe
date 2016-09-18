import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  render: function() {
    let playerName = <h2>Player: {this.props.profile.get('name')}</h2>;

    if(this.props.team === 'crowd') {
        let points = this.props.profile.get('points');
        points = points?points:0;
        return <div>
                    {playerName}
                    <h3>Crowd Points: {points}</h3>
                </div>;
    }
    return <div>
            <h2>Player: {this.props.profile.get('name')}</h2>
            <h4>Current Win Streak: {this.props.profile.get('streak',0)}</h4>
            <h4>Total Wins: {this.props.profile.get('totalwins',0)}</h4>
            <h4>Current tie games: {this.props.profile.get('ties',0)}</h4>
            <h4>Careful! 5 tie games and you will be de-throned as champion!</h4>
        </div>;
  }
});