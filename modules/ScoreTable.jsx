import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],
    render: function() {
        let playerTable = this.props.scoreTable.sort((a,b)=> {return b.get('wins') - a.get('wins')}).map((player, index)=> {
            console.log(index);
            return <div key={index}>{player.get('playerName')}: {player.get('wins')}</div>;
        });
        return <div><div key="-1">Score Table</div>{playerTable}</div>
    }
});